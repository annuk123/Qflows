// app/api/typescript/ast/route.ts
import { NextRequest, NextResponse } from "next/server";
import ts from "typescript";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const sourceFile = ts.createSourceFile(
    "temp.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  return NextResponse.json({ ast: sourceFile });
}
