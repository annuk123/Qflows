"use client";
import { motion } from "framer-motion";
import { CheckCircle, Code, Rocket, Eye, Layers, PlayCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "See Code Execution in Action",
    description:
      "Unlike AI, which just explains, our app shows **real-time execution flow** with step-by-step tracking.",
    icon: <PlayCircle className="text-purple-500" size={30} />, 
  },
  {
    title: "Memory & Heap Visualization",
    description:
      "Track **stack vs. heap allocation** with stunning visual representation, making complex concepts easy.",
    icon: <Layers className="text-blue-500" size={30} />, 
  },
  {
    title: "Multi-Language Debugging",
    description:
      "AI mostly explains code in text, but we offer **real-time execution** across multiple languages, starting with Rust.",
    icon: <Code className="text-green-500" size={30} />, 
  },
  {
    title: "AI Gives Answers, We Show Execution",
    description:
      "See how recursion, loops, and memory work step by step—perfect for **learning and interviews.**",
    icon: <Eye className="text-yellow-500" size={30} />, 
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4"
        >
          AI Explains, But We <span className="text-cyan-400">Visualize & Execute</span>
        </motion.h2>
        <p className="text-lg text-gray-400 mb-8">
          Unlike AI tools that only generate text-based explanations, our app **runs** your actual Rust code and **visually represents execution.**
        </p>
      </div>

      {/* Features Section */}
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Code Execution Demo */}
      <div className="container mx-auto text-center mt-12 bg-gray-800 p-6 rounded-lg shadow-lg">
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold mb-4"
        >
          Watch Code Execution Live 🖥️
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-black text-green-400 p-4 rounded-lg text-left font-mono text-sm shadow-lg"
        >
          <p>fn main() &#123;</p>
          <motion.p animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            &nbsp;&nbsp;let x = 5;
          </motion.p>
          <motion.p animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            &nbsp;&nbsp;let y = x * 2;
          </motion.p>
          <motion.p animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            &nbsp;&nbsp;println!("Result: &#123;y&#125;");
          </motion.p>
          <p>&#125;</p>
        </motion.div>
        <p className="text-gray-400 mt-2">👀 Visualize how each line executes step by step.</p>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto text-center mt-12">
        <Link href="/languages/JavaScript">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Try It Now 🚀
        </motion.button>
        </Link>
      </div>
    </section>
  );
}
