"use client";

import { useState } from "react";
import ASTViewer from "./ASTTree";

export default function CodeParser() {
  const [code, setCode] = useState("");
  const [ast, setAST] = useState(null);

  const handleParse = async () => {
    const res = await fetch("/api/typescript/ast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setAST(data.ast);
  };

  

  return (
    <div className="p-4">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border rounded"
        rows={6}
        placeholder="Enter TypeScript code"
      />
      <button
        onClick={handleParse}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate AST
      </button>

      <ASTViewer ast={ast} />
    </div>
  );
}
