// utils/astToVisualNodes.ts

export type VisualNode = {
    id: string;
    label: string;
    children?: VisualNode[];
  };
  
  export function generateVisualNodes(ast: any, depth = 0): VisualNode {
    const id = crypto.randomUUID(); // or use uuid if crypto not supported
    const label = ast.type;
  
    const children: VisualNode[] = [];
  
    for (const key in ast) {
      const value = ast[key];
  
      if (typeof value === "object" && value !== null && key !== "loc" && key !== "range") {
        if (Array.isArray(value)) {
          for (const child of value) {
            if (child && child.type) {
              children.push(generateVisualNodes(child, depth + 1));
            }
          }
        } else if (value.type) {
          children.push(generateVisualNodes(value, depth + 1));
        }
      }
    }
  
    return { id, label, children };
  }
  