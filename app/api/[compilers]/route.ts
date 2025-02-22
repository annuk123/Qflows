import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, language } = await req.json();

  let output = "";
  try {
    switch (language) {
      case "javascript":
        output = new Function(code)();
        output = output || "Code executed successfully. No output returned.";
        break;
      case "python":
        output = "Python output (mock)";
        break;
      case "c":
        output = "C output (mock)";
        break;
      default:
        output = "Unsupported language.";
    }
  } catch (error) {
    output = `Error: ${(error as Error).message}`;
  }

  console.log("Output:", output); // Log the output before returning
  


  return NextResponse.json({ output });
}
