"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  onRunCode: (code: string) => void;
  isDarkMode: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ onRunCode, isDarkMode, speed,
  onSpeedChange, }) => {
  const [code, setCode] = useState<string>(
    `console.log("Start");\nsetTimeout(() => console.log("Timeout"), 1000);\nconsole.log("End");`
  );
  
  // Font size state for zoom in/out
  const [fontSize, setFontSize] = useState(16);  // Default font size

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleRunCode = () => {
    if (onRunCode) {
      onRunCode(code);
    }
  };

  const handleZoomIn = () => {
    setFontSize(prevFontSize => prevFontSize + 2);  // Increase font size by 2px
  };

  const handleZoomOut = () => {
    setFontSize(prevFontSize => Math.max(12, prevFontSize - 2));  // Decrease font size by 2px, but ensure a minimum font size
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} mt-14`}>

      <div className="relative flex justify-end items-center space-x-4 ">
      <div className=" flex items-center gap-2 mt-6">
          <label htmlFor="speed" className="font-bold ">
            Speed: {speed} ms
          </label>
          <input
            type="range"
            id="speed"
            min="100"
            max="2000"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-32"
          />
        </div>
     < svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7 mb-2 mt-8 cursor-pointer "
    onClick={handleZoomIn}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="8" y1="11" x2="14" y2="11" />
    <line x1="11" y1="8" x2="11" y2="14" />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7 mt-8 mb-2 cursor-pointer"
    onClick={handleZoomOut}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>

      <button
        onClick={handleRunCode}
        className="bg-blue-500 text-white px-4 py-2 mt-8 ml-4 rounded shadow"
      >
        Run Code
      </button>
      </div>

      <Editor
        height="400px"
        defaultLanguage="javascript"
        value={code}
        onChange={handleCodeChange}
        theme={isDarkMode ? "vs-dark" : "vs-light"}
        options={{
          fontSize, // Dynamically set font size
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          lineNumbers: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;




