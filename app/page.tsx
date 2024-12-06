"use client";
import { useState, useEffect } from "react";
import Navbar  from "./components/NavBar/nav";
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className= {`${
      isDarkMode ? 'bg-gray-800' : 'bg-blue-200'
    } min-w-80 min-h-screen`}>
     <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
     <div className="flex justify-center flex-col items-center w-full">
      {/* <h1 className="text-4xl text-center mt-5">Welcome to Qflow</h1> */}
      <div className="flex items-center justify-center gap-x-2 mt-8">
  <h1
    className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg"
  >
    Welcome to Qflow
  </h1>
</div>


      <p className="text-lg text-center">Get started by editing{' '} <code className="bg-gray-700 p-1 rounded">pages/index.tsx</code></p>
      </div>
     
    </div>
  );
}
