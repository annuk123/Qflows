import { execFile } from "child_process";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    console.log("Received Rust Code:", code);

    // Ensure step logs are injected properly inside `main()`
    const lines = code.split("\n");
    let instrumentedCode = "";
    let insideMain = false;

    for (const line of lines) {
      if (line.trim().startsWith("fn main()")) {
        insideMain = true;
        instrumentedCode += line + "\n    println!(\"Step 1: Start Execution\");\n";
      } else if (insideMain && line.trim() === "}") {
        instrumentedCode += "    println!(\"Step 2: End Execution\");\n" + line + "\n";
        insideMain = false;
      } else {
        instrumentedCode += line + "\n";
      }
    }

    // Write to a temporary Rust file
    const tempFilePath = path.join("/tmp", "temp_rust_script.rs");
    fs.writeFileSync(tempFilePath, instrumentedCode);

    const rustScriptPath = "/home/annu-kumari/.cargo/bin/rust-script";

    return new Promise((resolve) => {
      execFile(rustScriptPath, [tempFilePath], (error, stdout, stderr) => {
        console.log("Rust Execution Output:", stdout);
        console.log("Rust Execution Error:", stderr);

        if (error) {
          resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
          return;
        }

        // Parse output into structured steps
        const steps = stdout
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line, index) => ({
            step: index + 1,
            message: line.trim(),
          }));

        resolve(NextResponse.json({ output: stdout, steps }));
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to execute Rust code" }, { status: 500 });
  }
}


// import { exec } from "child_process";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { code } = await req.json();
//     const rustScriptPath = "/home/annu-kumari/.cargo/bin/rust-script";

//     return new Promise((resolve) => {
//       exec(`${rustScriptPath} -e '${code.replace(/'/g, "'\\''")}'`, (error, stdout, stderr) => {
//         if (error) {
//           resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
//           return;
//         }

//         // Capture each step for visualization
//         const executionSteps = stdout
//           .split("\n")
//           .filter(line => line.trim() !== "")
//           .map((line, index) => ({ step: index + 1, message: line }));

//         resolve(NextResponse.json({ output: stdout, executionSteps }));
//       });
//     });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to execute Rust code" }, { status: 500 });
//   }
// }
