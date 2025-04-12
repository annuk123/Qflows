// "use client";

// export default function MemoryViewer({ memory }: { memory: Record<string, any> }) {
//   return (
//     <div className="p-4 border rounded bg-white dark:bg-gray-900 shadow">
//       <h3 className="font-semibold mb-2">Memory State</h3>
//       <ul className="space-y-1 text-sm">
//         {Object.entries(memory).map(([key, val]) => (
//           <li key={key}>
//             <span className="font-mono text-blue-600">{key}</span>:{" "}
//             <span className="text-gray-700 dark:text-gray-300">{JSON.stringify(val)}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MemoryViewer({
  memory,
  queue,
  heap,
}: {
  memory: Record<string, any>;
  queue?: string[];
  heap?: Record<string, any>;
}) {
  return (
    <div className="grid md:grid-cols-3 gap-4 text-sm">
      {/* Variables (Stack/Memory) */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow">
        <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-300">🧠 Memory</h4>
        {Object.entries(memory).map(([key, val]) => (
    <div key={key} className="mb-1">
      <span className="text-purple-500">{key}</span>:{" "}
      <span className="text-green-600 dark:text-green-400" title={JSON.stringify(val)}>
        {typeof val === "object" ? JSON.stringify(val).slice(0, 50) + "..." : val}
      </span>
    </div>
        ))}
      </div>

      {/* Queue (Callback/Event Queue) */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow">
        <h4 className="font-bold mb-2 text-yellow-600 dark:text-yellow-300">📥 Event Queue</h4>
        <ul className="list-disc list-inside space-y-1">
          {queue && queue.length > 0 ? (
            queue.map((item, i) => (
            <li key={i}>{item}</li>
          
           ))
          ) : (
            <li className="text-gray-500 italic">Empty</li>
          )}
        </ul>
      </div>

      {/* Heap (Objects/Functions/References) */}
<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow">
  <h4 className="font-bold mb-2 text-pink-600 dark:text-pink-300">📦 Heap</h4>
        {heap && Object.keys(heap).length > 0 ? (
    Object.entries(heap).map(([key, val]) => (
      <div key={key} className="mb-2">
        <span className="text-orange-500 font-mono">{key}</span>:{" "}
        {typeof val === "object" && val.code ? (
          <SyntaxHighlighter language="javascript" style={oneDark}>
            {val.code}
            {/* {generateCodeFromAST(val.code)} */}
          </SyntaxHighlighter>
        ) : (
          <span className="text-white">{JSON.stringify(val)}</span>
        )}
      </div>
    ))
  ) : (
    <p className="text-gray-500 italic">Empty</p>
  )}
</div>

      
    </div>
  );
}
