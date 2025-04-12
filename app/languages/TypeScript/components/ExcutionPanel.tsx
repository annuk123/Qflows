"use client";

import React, { useState } from "react";
import MemoryViewer from "./MemortView";
import {
  Loader2,
  PlayCircle,
  StepForward,
  StepBack,
} from "lucide-react";

type ExecutionStep = {
  line: number;
  memory: Record<string, any>;
  code: string;
  queue?: string[]; // or structured events like { type: string, id: string }
  heap?: Record<string, any>;
};

export default function ExecutionPanel({ code }: { code: string }) {
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) throw new Error("Failed to fetch execution steps");

      const data = await res.json();
      setSteps(data.steps);
      setCurrentStep(0);
      setStarted(true);
    } catch (error) {
      console.error("Execution Error:", error);
      alert("Something went wrong during execution.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const current = steps[currentStep];

  return (
    <div className="mt-6 p-6 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-lg space-y-4 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleStart}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <PlayCircle className="w-4 h-4" />
          )}
          Start Execution
        </button>

        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-50"
          disabled={!started || currentStep === 0}
        >
          <StepBack className="w-4 h-4" />
          Previous Step
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-50"
          disabled={!started || currentStep >= steps.length - 1}
        >
          <StepForward className="w-4 h-4" />
          Next Step
        </button>

        {started && (
          <div className="text-sm text-gray-700 dark:text-gray-300 ml-auto">
            Step {currentStep + 1} of {steps.length}
          </div>
        )}
      </div>

      {started && current && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            <span className="inline-block px-2 py-1 bg-yellow-100 dark:bg-yellow-700/20 rounded text-yellow-800 dark:text-yellow-300">
              Executing Line {current.line}:
            </span>{" "}
            <code className="ml-2 text-gray-800 dark:text-gray-200">{current.code}</code>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              🧠 Memory State
            </h4>
            {/* <MemoryViewer memory={current.memory} /> */}
            <MemoryViewer
              memory={current.memory}
              queue={current.queue}
              heap={current.heap}
/>
          </div>
        </div>
      )}
    </div>
  );
}
