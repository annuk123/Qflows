"use client";

import React from "react";

type ASTNode = any;

function renderNode(node: ASTNode, depth: number = 0): JSX.Element {
  if (node === null || typeof node !== "object") {
    return (
      <div style={{ paddingLeft: depth * 16 }}>
        <span className="text-green-500">{JSON.stringify(node)}</span>
      </div>
    );
  }

  if (Array.isArray(node)) {
    return (
      <div style={{ paddingLeft: depth * 16 }}>
        <span className="text-yellow-500">[</span>
        {node.map((child, i) => (
          <div key={i}>{renderNode(child, depth + 1)}</div>
        ))}
        <span className="text-yellow-500">]</span>
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: depth * 16 }}>
      <details open>
        <summary className="font-semibold text-blue-500">{node.type || "Object"}</summary>
        {Object.entries(node).map(([key, value], i) => (
          <div key={i} className="text-sm">
            <span className="text-purple-500">{key}:</span>
            <div>{renderNode(value, depth + 1)}</div>
          </div>
        ))}
      </details>
    </div>
  );
}

export default function ASTViewer({ ast }: { ast: ASTNode }) {
  if (!ast) {
    return <p className="text-center text-gray-500">No AST to display.</p>;
  }

  return (
    <div className="max-h-[500px] overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 rounded-md shadow-inner text-sm leading-6">
      {renderNode(ast)}
    </div>
  );
}

