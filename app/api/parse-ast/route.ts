import { NextRequest, NextResponse } from "next/server";
import { parseAST } from "@/utils/parseAST";
import { generateVisualNodes, VisualNode } from "@/utils/astToVisualNodes";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const ast = parseAST(code);
    const visualTree = generateVisualNodes(ast);

    return NextResponse.json({ ast, visualTree });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Parsing failed" },
      { status: 500 }
    );
  }
}
