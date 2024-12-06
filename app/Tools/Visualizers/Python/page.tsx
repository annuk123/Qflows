import React from "react";

interface PythonVisualizerProps {
  isDarkMode: boolean;
  speed: number;
}

const PythonVisualizer: React.FC<PythonVisualizerProps> = ({ isDarkMode, speed }) => {
  const handleRunCode = (code: string) => {
    console.log("Run Python code visualization:", code);
    // Add Python-specific visualization logic here
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Python Visualizer</h2>
      <div className="mt-4">
        <button
          onClick={() => handleRunCode("print('Hello, Python!')")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Run Sample Python Code
        </button>
      </div>
    </div>
  );
};

export default PythonVisualizer;
