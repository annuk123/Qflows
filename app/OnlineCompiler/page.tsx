"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Nav from "../components/Nav/navbar";

const OnlineCompiler: React.FC = () => {
  const [code, setCode] = useState("// Start typing your code here...");
  const [output, setOutput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript"); // Default language

  const handleRunCode = async () => {
    try {
      const response = await fetch("/api/[compilers]", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language: selectedLanguage }),
      });




      if (!response.ok) {
        setOutput("Error running code: " + response.statusText);
        return;
      }

      const result = await response.json();
      setOutput(result.output || "No output returned.");
    } catch (error) {
      setOutput(
        "Error running code: " + (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <div className="bg-gray-100 text-black mt-14">
      <Nav
        isDarkMode={false} // or your actual dark mode state
        toggleTheme={() => {}} // or your actual toggle theme function
        speed={1000} // or your actual speed state
        onSpeedChange={() => {}} // or your actual onSpeedChange function
        selectedLanguage={selectedLanguage}
        onLanguageChange={(language) => setSelectedLanguage(language.toLowerCase())}
      />
      <div className="flex space-x-4">
        {/* Editor Section */}
        <div className="w-1/2 mt-9">
          <Editor
            height="400px"
            language={selectedLanguage}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              lineNumbers: "on",
            }}
          />
        </div>

        {/* Output Section */}
        <div className="w-1/2 p-4 border rounded bg-gray-800 text-white mt-9">
          <h3 className="font-bold text-lg">Output:</h3>
          <pre className="whitespace-pre-wrap break-words">{output}</pre>
        </div>
      </div>

      <button
        onClick={handleRunCode}
        className="bg-blue-500 text-white px-4 py-2 mt-8 rounded shadow"
      >
        Run Code
      </button>
    </div>
  );
};

export default OnlineCompiler;
