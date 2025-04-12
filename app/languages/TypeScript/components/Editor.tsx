"use client";

import React from "react";
import Editor from "@monaco-editor/react";

type Props = {
  code: string;
  setCode: (val: string) => void;
};

export default function CodeEditor({ code, setCode }: Props) {
  return (
    <div className="h-[300px] border rounded-lg overflow-hidden shadow-md">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        value={code}
        onChange={(val) => setCode(val || "")}
        theme="vs-dark"
      />
    </div>
  );
}
