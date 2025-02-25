"use client"
import React from "react";
import { FaCode, FaCubes, FaGlobe } from "react-icons/fa";

const features = [
  {
    title: "Step-by-Step Code Execution",
    description:
      "See each line of your code come to life with our visual flow.",
    icon: <FaCode size={30} className="text-cyan-400" />,
  },
  {
    title: "3D Visual Flow Representation",
    description: "Interactive 3D representations for better understanding.",
    icon: <FaCubes size={30} className="text-cyan-400" />,
  },
  {
    title: "Multi-Language Support",
    description:
      "Supports various programming languages including JavaScript and Python.",
    icon: <FaGlobe size={30} className="text-cyan-400" />,
  },
  {
    title: "Customizable Themes",
    description: "Switch between dark, light, and custom themes effortlessly.",
    icon: <FaCode size={30} className="text-cyan-400" />,
  },
  {
    title: "Real-Time Collaboration",
    description: "Work with your team in real time on live code visualization.",
    icon: <FaCubes size={30} className="text-cyan-400" />,
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-2xl mx-10 relative overflow-hidden mb-9">
      <h2 className="text-4xl font-extrabold text-center text-white mb-12 relative">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 relative">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-700 p-6 rounded-xl shadow-lg transition transform hover:scale-105 flex flex-col items-center text-center">
            {feature.icon}
            <h3 className="text-2xl font-semibold text-cyan-400 mt-4">
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-300 max-w-md">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
