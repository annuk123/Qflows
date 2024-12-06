// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import Nav from "@/app/components/Nav/navbar";
// import CodeEditor from "./editor/code";
// import PythonVisualizer from "./Python/page";
// interface VisualizerProps {

//   isDarkMode: boolean;

//   speed: number;

// }

// const JavaScriptVisualizer: React.FC<VisualizerProps> = ({ isDarkMode, speed }) => {

// // const Visualizer = () => {
//   const callStackRef = useRef<HTMLUListElement>(null);
//   const webApisRef = useRef<HTMLUListElement>(null);
//   const callbackQueueRef = useRef<HTMLUListElement>(null);
//   // const [isDarkMode, setIsDarkMode] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
//  //const [speed, setSpeed] = useState(1000); // Default speed is 1000ms


//  const handleRunCode = (code: string) => {
//   if (!callStackRef.current || !webApisRef.current || !callbackQueueRef.current) {
//     console.error("One or more elements are missing!");
//     return;
//   }


//     const callStack = callStackRef.current;
//     const webApis = webApisRef.current;
//     const callbackQueue = callbackQueueRef.current;

//     callStack.innerHTML = "";
//     webApis.innerHTML = "";
//     callbackQueue.innerHTML = "";

//     const lines: string[] = code.split("\n");
//     lines.forEach((line: string, index: number) => {
//       setTimeout(() => {
//         const listItem = document.createElement("li");
//         listItem.textContent = line.trim();
//         callStack.appendChild(listItem);
//       setTimeout(() => {
//         callStack.removeChild(listItem);

//         // If the line involves a setTimeout, add it to the Callback Queue
//         if (line.includes("setTimeout")) {
//           const callbackItem = document.createElement("li");
//           callbackItem.textContent = "Callback: " + line.trim();
//           callbackQueue.appendChild(callbackItem);
//         }
//       }, speed / 2); // Adjust inner step timing based on speed
//     }, index * speed); // Adjust outer step timing based on speed
//     });
//   };

//   return (
//     <div
//     className={`min-h-screen ${
//       isDarkMode ? "bg-gray-900 text-white" : "bg-blue-300 text-black"
//     }`}
//   >
//     <Nav 
//       isDarkMode={isDarkMode}
//       //toggleTheme={toggleTheme}
//       selectedLanguage={selectedLanguage}
//       onLanguageChange={setSelectedLanguage}
//       speed={speed}
//       //onSpeedChange={setSpeed}
//     />
//     <CodeEditor onRunCode={handleRunCode} />
//     <div
//       className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 p-4 ${
//         isDarkMode ? "bg-gray-900 text-white" : "bg-blue-300 text-black"
//       }`}
//     >
//       <div
//         className={`p-4 rounded shadow ${
//           isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//         }`}
//         style={{ minHeight: "250px", overflowY: "auto" }}
//       >
//         <h2 className="text-lg font-bold mb-2">Call Stack</h2>
//         <ul ref={callStackRef} className="list-disc pl-5"></ul>
//       </div>
//       <div
//         className={`p-4 rounded shadow ${
//           isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//         }`}
//         style={{ minHeight: "250px", overflowY: "auto" }}
//       >
//         <h2 className="text-lg font-bold mb-2">Web APIs</h2>
//         <ul ref={webApisRef} className="list-disc pl-5"></ul>
//       </div>
//       <div
//         className={`p-4 rounded shadow ${
//           isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//         }`}
//         style={{ minHeight: "250px", overflowY: "auto" }}
//       >
//         <h2 className="text-lg font-bold mb-2">Callback Queue</h2>
//         <ul ref={callbackQueueRef} className="list-disc pl-5"></ul>
//       </div>
//     </div>

    
//   </div>
//   );
// };

// export default JavaScriptVisualizer;





"use client";
import React, { useRef, useEffect, useState } from "react";
import Nav from "@/app/components/Nav/navbar";
import CodeEditor from "./editor/code";
import PythonVisualizer from "./Python/page"; // Python visualizer component
import { on } from "events";

interface VisualizerProps {
  isDarkMode: boolean;
  speed: number;
}

const JavaScriptVisualizer: React.FC<VisualizerProps> = ({ isDarkMode, speed }) => {
  const callStackRef = useRef<HTMLUListElement>(null);
  const webApisRef = useRef<HTMLUListElement>(null);
  const callbackQueueRef = useRef<HTMLUListElement>(null);

  const handleRunCode = (code: string) => {
    if (!callStackRef.current || !webApisRef.current || !callbackQueueRef.current) {
      console.error("One or more elements are missing!");
      return;
    }

    const callStack = callStackRef.current;
    const webApis = webApisRef.current;
    const callbackQueue = callbackQueueRef.current;

    callStack.innerHTML = "";
    webApis.innerHTML = "";
    callbackQueue.innerHTML = "";

    const lines: string[] = code.split("\n");
    lines.forEach((line, index) => {
      setTimeout(() => {
        const listItem = document.createElement("li");
        listItem.textContent = line.trim();
        callStack.appendChild(listItem);

        setTimeout(() => {
          callStack.removeChild(listItem);

          // Handle setTimeout
          if (line.includes("setTimeout")) {
            const callbackItem = document.createElement("li");
            callbackItem.textContent = `Callback: ${line.trim()}`;
            callbackQueue.appendChild(callbackItem);
          }
        }, speed / 2);
      }, index * speed);
    });
  };



  useEffect(() => {
    const handleRunJavaScriptCode = (event: CustomEvent<string>) => {
      handleRunCode(event.detail);
    };
  
    document.addEventListener("runJavaScriptCode", handleRunJavaScriptCode as EventListener);
  
    return () => {
      document.removeEventListener("runJavaScriptCode", handleRunJavaScriptCode as EventListener);
    };
  }, [speed]);
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 p-4">
      {/* Call Stack */}
      <div
        className={`p-4 rounded shadow ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        style={{ minHeight: "250px", overflowY: "auto" }}
      >
        <h2 className="text-lg font-bold mb-2">Call Stack</h2>
        <ul ref={callStackRef} className="list-disc pl-5"></ul>
      </div>
      {/* Web APIs */}
      <div
        className={`p-4 rounded shadow ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        style={{ minHeight: "250px", overflowY: "auto" }}
      >
        <h2 className="text-lg font-bold mb-2">Web APIs</h2>
        <ul ref={webApisRef} className="list-disc pl-5"></ul>
      </div>
      {/* Callback Queue */}
      <div
        className={`p-4 rounded shadow ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        style={{ minHeight: "250px", overflowY: "auto" }}
      >
        <h2 className="text-lg font-bold mb-2">Callback Queue</h2>
        <ul ref={callbackQueueRef} className="list-disc pl-5"></ul>
      </div>
    </div>
  );
};

const Visualizer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-blue-300 text-black"
      }`}
    >
      <Nav
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        speed={speed}
        onSpeedChange={setSpeed}
      />
      <CodeEditor
      isDarkMode={isDarkMode}
      speed={speed}
      onSpeedChange={setSpeed}
      
        onRunCode={ (code) => {
          // Pass code to the correct visualizer
          if (selectedLanguage === "JavaScript") {
            document.dispatchEvent(
              new CustomEvent("runJavaScriptCode", { detail: code })
            );
          } else if (selectedLanguage === "Python") {
            console.log("Python code visualization:", code);
          }
        }}
      />
      {selectedLanguage === "JavaScript" ? (
        <JavaScriptVisualizer isDarkMode={isDarkMode} speed={speed} />
      ) : selectedLanguage === "Python" ? (
        <PythonVisualizer isDarkMode={isDarkMode} speed={speed} />
      ) : (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold">
            Visualizer for {selectedLanguage} is not available yet!
          </h2>
        </div>
      )}
    </div>
  );
};

export default Visualizer;








