"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import CodeEditor from "./components/Editor";
import ASTViewer from "./components/ASTTree";
import ExecutionPanel from "./components/ExcutionPanel";
import Nav from "../../components/Nav/navbar";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CodeParser = dynamic(() => import("./components/CodeParser"), { ssr: false });

export default function Home() {
  const [code, setCode] = useState(`function greet(name: string) {
  return "Hello, " + name;
}
greet("Annu");
`);
  const [ast, setAst] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("TypeScript");

  const handleParse = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/parse-ast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setAst(data.ast);
    } catch (err) {
      console.error("Error parsing AST:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Nav
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        speed={0}
        onSpeedChange={() => {}}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-6 mt-12">
          TypeScript Code Visualizer 🚀
        </h1>

        {/* Code Editor */}
        {/* <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Code Editor</h2>
          <Link
          
            href="../../rulebook"
            className="text-blue-500 hover:underline mb-4">
            📖 Rule Book
          </Link>
          
          <CodeEditor code={code} setCode={setCode} />
        </section> */}
        <section className="relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold">Code Editor</h2>
    <Link href="../../rulebook">
      <Button variant="outline" className="text-sm">
        📖 Rule Book
      </Button>
    </Link>
  </div>

  <CodeEditor code={code} setCode={setCode} />
</section>

        {/* Parse Button */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleParse}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Parsing..." : "Parse AST"}
          </button>
        </div>

        {/* AST & Execution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md overflow-auto max-h-[500px]">
            <h3 className="text-xl font-bold mb-2">AST Viewer</h3>
            <ASTViewer ast={ast} />
          </section>

          <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Execution Panel</h3>
            <ExecutionPanel code={code} />
          </section>
        </motion.div>
      </div>
    </main>
  );
}
