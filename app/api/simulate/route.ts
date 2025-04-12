import { NextResponse } from "next/server";
import { simulateExecution as simulateExecutionUtil } from "@/utils/simulateExecution";
import { generateCodeFromAST } from "@/utils/generateCodeFromAST";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, ast } = body;

    const generatedCode = generateCodeFromAST(ast);
    const steps = simulateExecutionUtil(code);

    return NextResponse.json({ code: generatedCode, steps });
  } catch (error) {
    console.error("Simulation error:", error);
    return NextResponse.json(
      { error: "Simulation failed", details: (error as Error).message },
      { status: 500 }
    );
  }
}


