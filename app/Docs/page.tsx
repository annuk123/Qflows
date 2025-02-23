"use client";
import React from "react";
import { useEffect } from "react";
import Navbar from "../components/NavBar/page";

const DocPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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
    // <div className="bg-gray-100 min-h-screen flex flex-col items-center min-w-80">
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-blue-200"
      } min-w-80 min-h-screen  items-center`}
    >
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <header className="flex justify-center flex-col items-center w-full mt-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Docs of Qflows
        </h1>
        <p className="justify-center flex flex-col w-full text-lg text-gray-700 items-center text-center">
          Uh-oh <br />
          Developer was too busy to write this page. <br />
          Please check back later. <br />
          This page will be updated soon...
        </p>
      </header>
    </div>
  );
};

export default DocPage;
