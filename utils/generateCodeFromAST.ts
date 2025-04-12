import generate from "@babel/generator";
import { parse, TSESTree } from "@typescript-eslint/typescript-estree";

type Step = {
  line: number;
  memory: Record<string, any>;
  code: string;
  eventQueue?: string[];
  heap: Record<string, any>;
};

export function generateCodeFromAST(node: TSESTree.Node | null): string {
  if (!node) return "";
  try {
    const generated = generate(node as any);
    return generated.code;
  } catch (err) {
    console.error("Failed to generate code from AST:", err);
    return "[unavailable]";
  }
}

export function simulateExecution(code: string): Step[] {
  const ast = parse(code, {
    loc: true,
    range: true,
    tokens: true,
    comment: true,
    jsx: true,
  });

  const steps: Step[] = [];
  const memory: Record<string, any> = {};
  const eventQueue: string[] = [];
  const heap: Record<string, any> = [];

  const body = ast.body || [];

  for (let i = 0; i < body.length; i++) {
    const node = body[i];
    const line = node.loc?.start.line ?? i + 1;
    const lineOfCode = generate(node as any).code;

    // Variable declarations
    if (node.type === "VariableDeclaration") {
      for (const decl of node.declarations) {
        const id = decl.id as TSESTree.Identifier;
        const name = id.name;
        const init = decl.init;

        let value;

        if (init?.type === "Literal") {
          value = (init as TSESTree.Literal).value;
        } else if (init?.type === "BinaryExpression") {
          const left = getValue(init.left, memory);
          const right = getValue(init.right, memory);
          try {
            value = eval(`${left} ${init.operator} ${right}`);
          } catch {
            value = NaN;
          }
        }

        memory[name] = value;
      }
    }

    // Handle setTimeout and add to event queue and heap
    if (
      node.type === "ExpressionStatement" &&
      node.expression.type === "CallExpression" &&
      node.expression.callee.type === "Identifier" &&
      node.expression.callee.name === "setTimeout"
    ) {
      const callExpr = node.expression;
      const callbackId = `callback_${Math.random().toString(36).substring(2, 8)}`;

      heap[callbackId] = {
        type: "function",
        code: generateCodeFromAST(callExpr.arguments[0] as TSESTree.Node).trim(),
      };

      eventQueue.push(`setTimeout callback → ${callbackId}`);
    }

    steps.push({
      line,
      memory: { ...memory },
      code: lineOfCode,
      heap: { ...heap },
      eventQueue: [...eventQueue],
    });
  }

  return steps;
}

// Helper to get value of Identifier or Literal
function getValue(node: any, memory: Record<string, any>) {
  if (node.type === "Literal") return node.value;
  if (node.type === "Identifier") return memory[node.name];
  return undefined;
}
