"use client";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import CodePreviewWithVideo from "./CodePreview/page";
import TestimonialsSection from "./Testimonial/page";
import Navbar from "./components/NavBar/navBar";
import WhyChooseUs from "./WhyChooseUs/page";
import Footer from "./Footer/page";
import HowItWorks from "./HowItWorks/page";
import Features from "./Features/page";
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
      <section className=" rounded-3xl shadow-lg mx-10 py-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Interactive Code Snippet
        </h2>
        <CodePreviewWithVideo />
      </section>

      {/* Features Grid Section */}
      <section className="py-20">
        <Features/>
      </section>

      {/* How It Works Section */}
      <section className="py-5">
        <HowItWorks/>
      </section>


      {/* Testimonials Section */}
      <section className="py-20">
        <TestimonialsSection />
      </section> 

      {/* Why Choose Us Section */}
      <section className="py-3">
        <WhyChooseUs/>
      </section>

      {/* Footer Section */}
      <section className="py-3">
        <Footer/>
      </section>
    </div>
  );
}


