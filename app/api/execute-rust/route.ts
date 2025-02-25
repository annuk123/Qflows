

// export default function handler(req: NextRequest, res: NextResponse) {
//   if (req.method !== 'POST') {
//       return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
//   }

//   try {
//       // This should come from your Rust execution logic
//       const responseData = {
//           "output": "Execution successful",
//          "output": "Execution successful",
//          "steps": [ ... ],  // Static steps
//         "memory": [ ... ], // Static memory allocation
//         "executionGraph": { ... },  // Static graph
//               "links": [
//                   { "source": { "x": 50, "y": 50 }, "target": { "x": 100, "y": 100 } }
//               ]
//           }
//       };

//       return NextResponse.json(responseData, { status: 200 });
//   } catch (error) {
//       return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {



  
// //   try {
// //     const { code } = await req.json();
// //     console.log("Received Rust Code:", code);

// //     // Ensure step logs are injected properly inside `main()`
// //     const lines = code.split("\n");
// //     let instrumentedCode = "";
// //     let insideMain = false;

// //     for (const line of lines) {
// //       if (line.trim().startsWith("fn main()")) {
// //         insideMain = true;
// //         instrumentedCode += line + "\n    println!(\"Step 1: Start Execution\");\n";
// //       } else if (insideMain && line.trim() === "}") {
// //         instrumentedCode += "    println!(\"Step 2: End Execution\");\n" + line + "\n";
// //         insideMain = false;
// //       } else {
// //         instrumentedCode += line + "\n";
// //       }
// //     }

  

// //     // Write to a temporary Rust file
// //     const tempFilePath = path.join("/tmp", "temp_rust_script.rs");
// //     fs.writeFileSync(tempFilePath, instrumentedCode);

// //     const rustScriptPath = "/home/annu-kumari/.cargo/bin/rust-script";

// //     return new Promise((resolve) => {
// //       execFile(rustScriptPath, [tempFilePath], (error, stdout, stderr) => {
// //         console.log("Rust Execution Output:", stdout);
// //         console.log("Rust Execution Error:", stderr);

// //         if (error) {
// //           resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
// //           return;
// //         }

// //         // Parse output into structured steps
// //         const steps = stdout
// //           .split("\n")
// //           .filter((line) => line.trim() !== "")
// //           .map((line, index) => ({
// //             step: index + 1,
// //             message: line.trim(),
// //           }));

// //         resolve(NextResponse.json({ output: stdout, steps }));
// //       });
// //     });
// //   } catch (error) {
// //     console.error("Error:", error);
// //     return NextResponse.json({ error: "Failed to execute Rust code" }, { status: 500 });
// //   }
// // }
// try {
//   const { code } = await req.json();
//   console.log("Received Rust Code:", code);

//   // Ensure step logs are injected properly inside `main()`
//   const lines = code.split("\n");
//   let instrumentedCode = "";
//   let insideMain = false;

//   for (const line of lines) {
//     if (line.trim().startsWith("fn main()")) {
//       insideMain = true;
//       instrumentedCode += line + "\n    println!(\"Step 1: Start Execution\");\n";
//     } else if (insideMain && line.trim() === "}") {
//       instrumentedCode += "    println!(\"Step 2: End Execution\");\n" + line + "\n";
//       insideMain = false;
//     } else {
//       instrumentedCode += line + "\n";
//     }
//   }

//   // Write to a temporary Rust file
//   const tempFilePath = path.join("/tmp", "temp_rust_script.rs");
//   fs.writeFileSync(tempFilePath, instrumentedCode);

//   const rustScriptPath = "/home/annu-kumari/.cargo/bin/rust-script";

//   return new Promise((resolve) => {
//     execFile(rustScriptPath, [tempFilePath], (error, stdout, stderr) => {
//       console.log("Rust Execution Output:", stdout);
//       console.log("Rust Execution Error:", stderr);

//       if (error) {
//         resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
//         return;
//       }

//       // Parse output into structured steps
//       const steps = stdout
//         .split("\n")
//         .filter((line) => line.trim() !== "")
//         .map((line, index) => ({
//           step: index + 1,
//           message: line.trim(),
//         }));

//       // Simulated heap, stack, and execution graph
//       const responseData = {
//         output: stdout,
//         steps,
//         memory: [
//           { type: "stack", value: "10" },
//           { type: "heap", value: "20" }
//         ],
//         executionGraph: {
//           nodes: [
//             { id: "1", x: 50, y: 50 },
//             { id: "2", x: 100, y: 100 }
//           ],
//           links: [
//             { source: { x: 50, y: 50 }, target: { x: 100, y: 100 } }
//           ]
//         }
//       };

//       resolve(NextResponse.json(responseData));
//     });
//   });
// } catch (error) {
//   console.error("Error:", error);
//   return NextResponse.json({ error: "Failed to execute Rust code" }, { status: 500 });
// }

// }




// export async function POST(req: NextRequest) {
//   if (req.method !== "POST") {
//     return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
//   }

//   try {
//     const { code } = await req.json(); // Get Rust code from request
//     console.log("Received Rust Code:", code);


//     const lines = code.split("\n");
//     let instrumentedCode = "";
//     let insideMain = false;

//     for (const line of lines) {
//       if (line.trim().startsWith("fn main()")) {
//         insideMain = true;
//         instrumentedCode += line + "\n    println!(\"Step 1: Start Execution\");\n";
//       } else if (insideMain && line.trim() === "}") {
//         instrumentedCode += "    println!(\"Step 2: End Execution\");\n" + line + "\n";
//         insideMain = false;
//       } else {
//         instrumentedCode += line + "\n";
//       }
//     }



//    // Write Rust code to a temporary file
//    const tempFilePath = path.join("/tmp", "temp_rust_script.rs");
//    fs.writeFileSync(tempFilePath, instrumentedCode);

//    const rustScriptPath = "/home/annu-kumari/.cargo/bin/rust-script"; // Update path if needed

//    return new Promise((resolve) => {
//      execFile(rustScriptPath, [tempFilePath], (error, stdout, stderr) => {
//        console.log("Rust Execution Output:", stdout);
//        console.log("Rust Execution Error:", stderr);

//        if (error) {
//          resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
//          return;
//        }

//        // Convert Rust output into structured steps
//        const logs = stdout.split("\n").filter((line) => line.trim() !== "");
//        const steps = logs.map((message, index) => ({
//          step: index + 1,
//          message: message.trim(),
//        }));

//        // Dynamically create execution graph from logs
//       let nodes: { id: string; label: string; x: number; y: number }[] = [];
//       let links: { source: string; target: string }[] = [];
//       //let prevNodeId: string = "";
//       let prevNodeId: string | null = "start"; // Initialize with a default value
//        let nodeIdCounter = 1;

//       //  logs.forEach((log) => {
//       //    if (log.startsWith("START:")) {
//       //      const node = { id: `${nodeIdCounter}`, label: log, x: 50 * nodeIdCounter, y: 50 * nodeIdCounter };
//       //      nodes.push(node);

//       //      // Connect to previous node
//       //      if (prevNodeId) {
//       //        if (prevNodeId !== null) {
//       //          if (prevNodeId !== null) {
//       //            //links.push({ source: prevNodeId, target: node.id });
//       //            links.push({ source: prevNodeId ?? "", target: node.id });

//       //          }
//       //        }
//       //      }

//       //      prevNodeId = node.id;
//       //      nodeIdCounter++;
//       //    } else if (log.startsWith("END:")) {
//       //      const node = { id: `${nodeIdCounter}`, label: log, x: 50 * nodeIdCounter, y: 50 * nodeIdCounter };
//       //      nodes.push(node);
//       //      links.push({ source: prevNodeId, target: node.id });
//       //      prevNodeId = "";
//       //      nodeIdCounter++;
//       //    }
//       //  });

//       logs.forEach((log) => {
//         if (log.startsWith("START:")) {
//           const node = { id: `${nodeIdCounter}`, label: log, x: 50 * nodeIdCounter, y: 50 * nodeIdCounter };
//           nodes.push(node);
      
//           // Fix: Ensure 'prevNodeId' is a string
//           if (prevNodeId !== null) {
//             links.push({ source: prevNodeId, target: node.id });
//           }
      
//           prevNodeId = node.id;
//           nodeIdCounter++;
//         } else if (log.startsWith("END:")) {
//           const node = { id: `${nodeIdCounter}`, label: log, x: 50 * nodeIdCounter, y: 50 * nodeIdCounter };
//           nodes.push(node);
      
//           // Fix: Ensure 'prevNodeId' is a string
//           links.push({ source: prevNodeId ?? "", target: node.id });
      
//           prevNodeId = null;
//           nodeIdCounter++;
//         }
//       });
      
//        const executionGraph = { nodes, links };

//        resolve(NextResponse.json({ output: stdout, steps, executionGraph }));
//      });
//    });
//  } catch (error) {
//    console.error("Error:", error);
//    return NextResponse.json({ error: "Failed to execute Rust code" }, { status: 500 });
//  }
// }

import { execFile } from "child_process";
import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";

// export async function POST(req: NextRequest) {
//   if (req.method !== "POST") {
//     return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
//   }

//   try {
//     const { code } = await req.json();
//     console.log("Received Rust Code:", code);

//     const lines = code.split("\n");
//     let instrumentedCode = "";
//     let insideMain = false;

//     for (const line of lines) {
//       if (line.trim().startsWith("fn main()")) {
//         insideMain = true;
//         instrumentedCode += line + "\n    println!(\"Step 1: Start Execution\");\n";
//       } else if (insideMain && line.trim() === "}") {
//         instrumentedCode += "    println!(\"Step 2: End Execution\");\n" + line + "\n";
//         insideMain = false;
//       } else {
//         // Inject memory tracking logs
//         if (line.includes("let ")) {
//           instrumentedCode += line + `\n    println!("ALLOC: Stack -> ${line.trim()}");\n`;
//         } else if (line.includes("Box::new")) {
//           instrumentedCode += line + `\n    println!("ALLOC: Heap -> ${line.trim()}");\n`;
//         } else if (line.includes(".push(")) {
//           instrumentedCode += line + `\n    println!("QUEUE: ${line.trim()}");\n`;
//         } else {
//           instrumentedCode += line + "\n";
//         }
//       }
//     }

//     const tempFilePath = path.join("/tmp", "temp_rust_script.rs");
//     fs.writeFileSync(tempFilePath, instrumentedCode);

//     const rustScriptPath = "/home/annu-kumari/.cargo/bin/rust-script";

//     return new Promise((resolve) => {
//       execFile(rustScriptPath, [tempFilePath], (error, stdout, stderr) => {
//         console.log("Rust Execution Output:", stdout);
//         console.log("Rust Execution Error:", stderr);

//         if (error) {
//           resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
//           return;
//         }

//         const logs = stdout.split("\n").filter((line) => line.trim() !== "");

//         // Step processing
//         const steps = logs.map((message, index) => ({
//           step: index + 1,
//           message: message.trim(),
//         }));

//         // Memory processing
//         let memory: { type: string; value: string }[] = [];
//         let queueOperations: string[] = [];

//         logs.forEach((log) => {
//           if (log.startsWith("ALLOC: Stack ->")) {
//             memory.push({ type: "stack", value: log.replace("ALLOC: Stack ->", "").trim() });
//           } else if (log.startsWith("ALLOC: Heap ->")) {
//             memory.push({ type: "heap", value: log.replace("ALLOC: Heap ->", "").trim() });
//           } else if (log.startsWith("QUEUE:")) {
//             queueOperations.push(log.replace("QUEUE:", "").trim());
//           }
//         });

//         // Execution graph processing
//         let nodes: { id: string; label: string; x: number; y: number }[] = [];
//         let links: { source: string; target: string }[] = [];
//         let prevNodeId: string | null = "start";
//         let nodeIdCounter = 1;

//         logs.forEach((log) => {
//           if (log.startsWith("Step")) {
//             const node = { id: `${nodeIdCounter}`, label: log, x: 50 * nodeIdCounter, y: 50 * nodeIdCounter };
//             nodes.push(node);

//             if (prevNodeId !== null) {
//               links.push({ source: prevNodeId, target: node.id });
//             }

//             prevNodeId = node.id;
//             nodeIdCounter++;
//           }
//         });

//         const executionGraph = { nodes, links };

//         resolve(
//           NextResponse.json({
//             output: stdout,
//             steps,
//             memory,
//             queue: queueOperations,
//             executionGraph,
//           })
//         );
//       });
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: "Failed to execute Rust code" }, { status: 500 });
//   }
// }


export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { code } = await req.json();
    console.log("Received Rust Code:", code);

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
        // Inject memory tracking logs
        if (line.includes("let ")) {
          instrumentedCode += line + `\n    println!("ALLOC: Stack -> ${line.trim()}");\n`;
        } else if (line.includes("Box::new")) {
          instrumentedCode += line + `\n    println!("ALLOC: Heap -> ${line.trim()}");\n`;
        } else if (line.includes(".push(")) {
          instrumentedCode += line + `\n    println!("QUEUE: ${line.trim()}");\n`;
        } else {
          instrumentedCode += line + "\n";
        }
      }
    }

    const tempFilePath = path.join("/tmp", "temp_rust_script.rs");
    fs.writeFileSync(tempFilePath, instrumentedCode);

    const rustScriptPath = "/home/annu-kumari/.cargo/bin/rust-script";

    return new Promise<NextResponse>((resolve) => {
      execFile(rustScriptPath, [tempFilePath], (error, stdout, stderr) => {
        console.log("Rust Execution Output:", stdout);
        console.log("Rust Execution Error:", stderr);

        if (error) {
          resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
          return;
        }

        const logs = stdout.split("\n").filter((line) => line.trim() !== "");

        // Step processing
        const steps = logs.map((message, index) => ({
          step: index + 1,
          message: message.trim(),
        }));

        // Memory processing
        let memory: { type: string; value: string }[] = [];
        let queueOperations: string[] = [];

        logs.forEach((log) => {
          if (log.startsWith("ALLOC: Stack ->")) {
            memory.push({ type: "stack", value: log.replace("ALLOC: Stack ->", "").trim() });
          } else if (log.startsWith("ALLOC: Heap ->")) {
            memory.push({ type: "heap", value: log.replace("ALLOC: Heap ->", "").trim() });
          } else if (log.startsWith("QUEUE:")) {
            queueOperations.push(log.replace("QUEUE:", "").trim());
          }
        });

        // Execution graph processing
        let nodes: { id: string; label: string; x: number; y: number }[] = [];
        let links: { source: string; target: string }[] = [];
        let prevNodeId: string | null = "start";
        let nodeIdCounter = 1;

        logs.forEach((log) => {
          if (log.startsWith("Step")) {
            const node = { id: `${nodeIdCounter}`, label: log, x: 50 * nodeIdCounter, y: 50 * nodeIdCounter };
            nodes.push(node);

            if (prevNodeId !== null) {
              links.push({ source: prevNodeId, target: node.id });
            }

            prevNodeId = node.id;
            nodeIdCounter++;
          }
        });

        const executionGraph = { nodes, links };

        resolve(
          NextResponse.json({
            output: stdout,
            steps,
            memory,
            queue: queueOperations,
            executionGraph,
          })
        );
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to execute Rust code" }, { status: 500 });
  }
}