// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import CodeMirror from "@uiw/react-codemirror";
// import { rust } from "@codemirror/lang-rust";
// import { Handle, Position, useNodesState } from "reactflow";
// import "reactflow/dist/style.css";
// import Nav from "../../components/Nav/navbar";

// export default function RustExecutor() {
//   const [code, setCode] = useState(
//     `fn main() {\n    println!("Hello, Rust!");\n}`
//   );
//   const [output, setOutput] = useState("");
//   const [steps, setSteps] = useState<{ step: number; message: string }[]>([]);
//   const [nodes, setNodes] = useNodesState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const executeCode = async () => {
//     try {
//       const res = await axios.post("/api/execute-rust", { code });
//       console.log("API Response:", res.data);
//       setOutput(res.data.output || res.data.error);

//       // Convert steps into nodes for visualization
//       const newNodes = res.data.steps.map((step: any, index: number) => ({
//         id: `${index}`,
//         data: { label: step.message },
//         position: { x: 50, y: index * 100 },
//       }));

//       setSteps(res.data.steps);
//       setNodes(newNodes);
//     } catch (error) {
//       console.error("Execution error:", error);
//       setOutput("Error executing code");
//     }
//   };

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode((prev) => !prev);
//   };

//   return (
//     <div className="py-12 max-w-3xl min-h-screen w-full top-0 ">
//       <Nav
//         isDarkMode={false}
//         toggleTheme={() => {}}
//         selectedLanguage="Rust"
//         onLanguageChange={setSelectedLanguage}
//         speed={0}
//         onSpeedChange={() => {}}
//       />
//       <h2 className="text-xl font-bold mt-12 mb-2">
//         Rust Code Executor with Visualization
//       </h2>
//       {/* CodeMirror Editor */}
//       <CodeMirror
//         value={code}
//         height="200px"
//         extensions={[rust()]}
//         onChange={(value) => setCode(value)}
//         className="border rounded-md "
//       />

//       {/* Run Button */}
//       <button
//         className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         onClick={executeCode}
//       >
//         Run Rust Code
//       </button>

//       {/* Output */}
//       <pre className="mt-4 p-3 bg-gray-100 border rounded">{output}</pre>

//       {/* Visualization */}
//       <h3 className="text-lg font-bold mt-4">Execution Steps</h3>
//       <div className="border p-4 rounded-md bg-white">
//         {steps.length > 0 ? (
//           <div className="flex flex-col gap-2">
//             {steps.map((step, index) => (
//               <div
//                 key={index}
//                 className="p-2 border rounded bg-blue-100 text-blue-900"
//               >
//                 {step.message}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No execution steps yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { rust } from "@codemirror/lang-rust";
import { motion } from "framer-motion"; // Animation
import Nav from "../../components/Nav/navbar";
import { Handle, Position, useNodesState } from "reactflow";
import * as d3 from "d3";

export default function RustExecutor() {
  const [code, setCode] = useState(
    `fn main() {\n    println!("Hello, Rust!");\n}`
  );
  const [output, setOutput] = useState("");
  const [steps, setSteps] = useState<{ step: number; message: string }[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("Rust");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loader
  const [nodes, setNodes] = useNodesState([]);
  interface Step {
    message: string;
  }
  
  interface MemoryItem {
    type: "stack" | "heap";
    value: string;
  }
  
  interface GraphNode {
    id: string;
    x: number;
    y: number;
  }
  
  interface GraphLink {
    source: { x: number; y: number };
    target: { x: number; y: number };
  }

  const executeCode = async () => {
    try {
        const res = await axios.post("/api/execute-rust", { code });

        console.log("API Response:", res.data); // Debugging API response

        setOutput(res.data.output || res.data.error);
        setSteps(res.data.steps);

        if (res.data.memory) {
            visualizeHeapAndStack(res.data.memory);
        } else {
            console.warn("Memory data is missing in response.");
        }

        if (res.data.executionGraph) {
            animateExecutionGraph(res.data.executionGraph);
        } else {
            console.warn("Execution graph data is missing in response.");
        }
    } catch (error) {
        console.error("Execution error:", error);
        setOutput("Error executing code");
    }
};

useEffect(() => {
  if (steps.length > 0) {
    const newNodes = steps.map((step, index) => ({
      id: `${index}`,
      data: { label: step.message },
      position: { x: 50, y: index * 100 },
    }));
    setNodes(newNodes);
  }
}, [steps]);  // <-- Only update when steps change



  const visualizeHeapAndStack = (memoryData: any) => {
    if (!Array.isArray(memoryData) || memoryData.length === 0) {
        console.warn("Invalid memory data for heap and stack visualization.");
        return;
    }

    const svg = d3.select("#heap-stack").html("").append("svg")
        .attr("width", 400)
        .attr("height", 300);

    const rects = svg.selectAll("rect")
        .data(memoryData)
        .enter()
        .append("rect")
        .attr("x", (_, i) => i * 50)
        .attr("y", d => d.type === "stack" ? 50 : 150)
        .attr("width", 40)
        .attr("height", 40)
        .attr("fill", d => d.type === "stack" ? "blue" : "red");

    rects.append("title").text(d => `Value: ${d.value}`);
};



  const animateExecutionGraph = (graphData: { nodes: GraphNode[]; links: GraphLink[] }) => {
    const svg = d3
      .select("#execution-graph")
      .html("")
      .append("svg")
      .attr("width", 500)
      .attr("height", 300);
  
    svg
      .selectAll("line")
      .data(graphData.links)
      .enter()
      .append("line")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "black");
  
    svg
      .selectAll("circle")
      .data(graphData.nodes)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 10)
      .attr("fill", "green");
  };


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
    const [fontSize, setFontSize] = useState(16); 

  const handleZoomIn = () => {
    setFontSize(prevFontSize => prevFontSize + 2);  // Increase font size by 2px
  };

  const handleZoomOut = () => {
    setFontSize(prevFontSize => Math.max(12, prevFontSize - 2));  // Decrease font size by 2px, but ensure a minimum font size
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-blue-300 text-black"} text-white py-8`}>
      <Nav
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        speed={0}
        onSpeedChange={() => {}}
      />

      <div className="max-w-6xl max-h-5xl mx-auto ">
        <h2 className="text-4xl font-extrabold text-center mt-12 py-5 ">
          Rust Code Executor 🚀
        </h2>

        {/* Code Editor */}


        <div className="flex gap-2 justify-self-end mb-3 relative">

        < svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7 mb-2 mt-8 cursor-pointer text-black "
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
    className="w-7 h-7 mt-8 mb-2 cursor-pointer text-black"
    onClick={handleZoomOut}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>

        {/* Run Button */}
        {/* <div className="flex justify-center mt-4"> */}
          <button
            className="px-4 mt-5 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-all duration-300"
            onClick={executeCode}
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
        </div>

        <motion.div
          className="border rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CodeMirror
            value={code}
            style={{ fontSize: `${fontSize}px` }}
            height="250px"
            extensions={[rust()]}
            onChange={(value) => setCode(value)}
            className="border rounded-md text-black"
          />
        </motion.div>



        {/* Execution Output */}
        <motion.div
          className="bg-gray-800 p-4 rounded-lg mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold">Output:</h3>
          <pre className="bg-gray-900 p-3 rounded-md text-green-400">
            {output || "No output yet."}
          </pre>
        </motion.div>

        {/* Execution Steps Visualization */}

<motion.div
  className="mt-6 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg backdrop-blur-lg border border-gray-700"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
    <span className="text-blue-400">🚀 Execution Steps:</span>
  </h3>

  {steps.length > 0 ? (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="p-4 bg-blue-500 rounded-lg shadow-md text-white text-center text-lg font-medium tracking-wide transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
        >
          {step.message}
        </motion.div>
      ))}
    </div>
  ) : (
    <p className="text-gray-400 text-center text-lg">No execution steps yet. Run some code! 💡</p>
  )}
</motion.div>



{/* Heap & Stack Section */}
<h3 className="text-xl font-bold mt-6 text-gray-800 dark:text-white flex items-center gap-2">
  <span className="text-pink-500">📦 Heap & Stack Visualization</span>
</h3>

<div
  id="heap-stack"
  className="border p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg mt-4 transition-all duration-300 hover:shadow-2xl"
></div>

{/* Execution Graph */}
<h3 className="text-xl font-bold mt-6 text-gray-800 dark:text-white flex items-center gap-2">
  <span className="text-green-500">🔗 Execution Graph</span>
</h3>

<div
  id="execution-graph"
  className="border p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg mt-4 transition-all duration-300 hover:shadow-2xl"
></div>
{/* 
<pre className="mt-4 p-3 bg-gray-100 border rounded">{output}</pre>
      <h3 className="text-lg font-bold mt-4">Heap & Stack Visualization</h3>
      <div id="heap-stack" className="border p-4 rounded-md bg-white"></div>
      <h3 className="text-lg font-bold mt-4">Execution Flow</h3>
      <div id="execution-graph" className="border p-4 rounded-md bg-white"></div> */}
</div>
</div>
  );
}
