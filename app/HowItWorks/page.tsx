"use client";
import React from "react";

const howItWorksSteps = [
  {
    title: "Write Code",
    description: "Use our intuitive code editor to write or paste your code.",
  },
  {
    title: "Click Visualize",
    description: "Hit the visualize button to see the magic happen.",
  },
  {
    title: "Watch the Execution",
    description:
      "Experience real-time code execution with animations and visual flow.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-2xl mx-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-20 bg-cyan-400 blur-3xl"></div>
      <h2 className="text-4xl font-extrabold text-center text-white mb-12 relative">
        How It Works
      </h2>
      <div className="space-y-10 px-8 md:px-16 relative">
        {howItWorksSteps.map((step, index) => (
          <div key={index} className="flex items-center space-x-6 bg-gray-700 p-6 rounded-xl shadow-md transition transform hover:scale-105">
            <span className="text-cyan-400 text-3xl font-extrabold bg-gray-900 px-4 py-2 rounded-full shadow-lg">
              {index + 1}
            </span>
            <div>
              <h4 className="text-2xl font-semibold text-white">
                {step.title}
              </h4>
              <p className="text-gray-300 mt-2 max-w-lg">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
