import { parse } from "@typescript-eslint/typescript-estree";

export function parseAST(code: string) {
  const ast = parse(code, {
    loc: true,
    range: true,
    tokens: true,
    comment: true,
    jsx: true,
  });

  return ast;
}
