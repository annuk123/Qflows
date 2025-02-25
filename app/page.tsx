"use client";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import CodePreviewWithVideo from "./CodePreview/page";
import TestimonialsSection from "./Testimonial/page";
import Navbar from "./components/NavBar/navBar";
// Custom Button Component

const CustomButton = ({
  children,
  variant = "default",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) => {
  let baseStyles =
    "rounded-2xl text-lg font-semibold px-6 py-3 transition-all duration-300";
  let variants = {
    default: "bg-cyan-500 hover:bg-cyan-600 text-white",
    outline:
      "border border-cyan-500 text-cyan-500 hover:bg-gray-800 hover:border-cyan-600",
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

//const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });

const CustomCard = ({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-gray-800 p-6 rounded-2xl shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  // Optional: Add any animations or effects here

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="text-center py-20 mt-14">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          Visualize Your Code in Real-Time
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Step through your code line by line with intuitive, modern animations
          and insights.
        </p>
        <div className="mt-8 space-x-4">
          <CustomButton variant="default">Start Visualizing</CustomButton>
          <CustomButton variant="outline">Explore Examples</CustomButton>
        </div>
      </section>

      {/* Interactive 3D Preview Section */}
      <section className=" rounded-3xl shadow-lg mx-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Interactive Code Snippet
        </h2>
        <CodePreviewWithVideo />
      </section>

      {/* Features Grid Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
          {features.map((feature, index) => (
            <CustomCard key={index}>
              <h3 className="text-xl font-semibold text-cyan-400">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-300">{feature.description}</p>
            </CustomCard>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-800  rounded-2xl shadow-lg mx-10">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="space-y-8 ml-8">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-6">
              <span className="text-cyan-400 text-2xl font-bold">
                {index + 1}
              </span>

              <div>
                <h4 className="text-xl font-semibold text-white">
                  {step.title}
                </h4>
                <p className="text-gray-300 mt-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        {/* <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
          {testimonials.map((testimonial, index) => (
            <CustomCard key={index}>
              <p className="text-gray-300">"{testimonial.feedback}"</p>
              <h4 className="mt-4 font-semibold text-cyan-400">- {testimonial.name}</h4>
            </CustomCard>
          ))} */}

        <TestimonialsSection />
        {/* </div> */}
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl mx-10">
        <h2 className="text-4xl font-bold text-white">
          Ready to See Your Code Like Never Before?
        </h2>
        <CustomButton className="mt-8 bg-gray-900 hover:bg-gray-800 text-white">
          Start Now for Free!
        </CustomButton>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Step-by-Step Code Execution",
    description:
      "See each line of your code come to life with our visual flow.",
  },
  {
    title: "3D Visual Flow Representation",
    description: "Interactive 3D representations for better understanding.",
  },
  {
    title: "Multi-Language Support",
    description:
      "Supports various programming languages including JavaScript and Python.",
  },
];

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

const testimonials = [
  {
    name: "Alex Smith",
    feedback: "This tool completely changed the way I debug my code.",
  },
  {
    name: "Priya Kumar",
    feedback: "The 3D visuals are stunning and incredibly helpful.",
  },
  {
    name: "John Doe",
    feedback: "Best code visualizer I have ever used. Highly recommended!",
  },
];
