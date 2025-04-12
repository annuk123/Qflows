import { parse } from "@typescript-eslint/typescript-estree";
import { generate } from "astring";

export type ExecutionStep = {
  line: number;
  memory: Record<string, any>;
  code: string;
  queue?: string[];
  heap?: Record<string, any>;
};

export function simulateExecution(code: string): ExecutionStep[] {
  const ast = parse(code, { loc: true });
  const steps: ExecutionStep[] = [];
  const memory: Record<string, any> = {};
  const eventQueue: string[] = [];
  const heap: Record<string, any> = {};

  const programBody = ast.body;

  for (const node of programBody) {
    const line = node.loc?.start.line ?? 0;
    const codeLine = generateCodeFromAST(node);

    // 🧠 Variable declarations
    if (node.type === "VariableDeclaration") {
      for (const decl of node.declarations) {
        const varName = (decl.id as any).name;
        const init = decl.init;

        let value: any = "undefined";

        if (init?.type === "Literal") {
          value = init.value;
        } else if (init?.type === "BinaryExpression") {
          const left = getValue(init.left, memory);
          const right = getValue(init.right, memory);
          try {
            value = eval(`${left} ${init.operator} ${right}`);
          } catch {
            value = "NaN";
          }
        }

        memory[varName] = value;
        steps.push({ line, memory: { ...memory }, code: codeLine, queue: [...eventQueue], heap: { ...heap } });
      }
    }

    // ⚙️ Handle setTimeout → Event Queue + Heap
    if (node.type === "ExpressionStatement" && isCallExpression(node.expression)) {
      const expr = node.expression;
      if (isCallExpression(expr) && 'callee' in expr && expr.callee.type === "Identifier" && expr.callee.name === "setTimeout") {
        const callbackId = `cb_${Math.random().toString(36).substring(2, 8)}`;
        heap[callbackId] = {
          type: "function",
          code: generateCodeFromAST(expr.arguments[0]),
        };
        eventQueue.push(`setTimeout → ${callbackId}`);
        steps.push({ line, memory: { ...memory }, code: codeLine, queue: [...eventQueue], heap: { ...heap } });
        continue;
      }
    }

    // 📝 Expression statement without setTimeout (just to capture step)
    if (node.type === "ExpressionStatement") {
      steps.push({ line, memory: { ...memory }, code: codeLine, queue: [...eventQueue], heap: { ...heap } });
    }
  }

  return steps;
}

// Util: Get value from identifier or literal
function getValue(node: any, memory: Record<string, any>): any {
  if (node.type === "Literal") return node.value;
  if (node.type === "Identifier") return memory[node.name] ?? "undefined";
  return undefined;
}

// Type guard
function isCallExpression(node: any): node is any {
  return node?.type === "CallExpression";
}

// Basic AST-to-code fallback
export function generateCodeFromAST(node: any): string {
  try {
    return generate(node);
  } catch {
    return "[Unrenderable Code]";
  }
}
