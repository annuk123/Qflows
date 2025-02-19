"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SunIcon from "../icons/sunicon";
import MoonIcon from "../icons/moonicon";
import Button from "@mui/material/Button";
import { AccountCircle as ProfileIcon } from "@mui/icons-material";
import { GitHub as GitHubIcon } from "@mui/icons-material";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setIsNavFixed(true);
  //     } else {
  //       setIsNavFixed(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    // Check theme preference from localStorage and apply it
    const storedTheme = localStorage.getItem("theme");
    try {
      if (storedTheme !== null && JSON.parse(storedTheme) !== isDarkMode) {
        toggleTheme();
      }
    } catch {
      console.log("Failed to read localStorage");
    }
    // Check login status from localStorage
    const authStatus = localStorage.getItem("authToken");
    setIsLoggedIn(!!authStatus);
  }, [isDarkMode]);


  const handleToggleTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!isDarkMode));
    toggleTheme();
  };

  const togglePanel = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsClient(true); // Ensure it's client-side rendering
  }, []);

  const handleLoginRedirect = () => {
    if (isClient) {
      router.push("/signIn");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token on logout
    setIsLoggedIn(false); // Update login state
    router.push("/"); // Redirect to homepage after logout
  };



  return (
      <nav
      className= {`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-blue-300 text-black"
      } bg-black text-white  p-4 flex justify-between items-center transition-all duration-300 fixed w-full z-10 top-0 `}
  >
        {/* Logo */}
        <div className="flex flex-0 items-center">
        <Link href={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 105 70"
          className="w-24 h-12"
          height={80}
          width={200}
        >
          {/* Background */}
         
          {/* Large Q */}
          <text
            x="10"
            y="50"
            fontFamily="'Arial', sans-serif"
            fontSize="55"
            fontWeight="bold"
            fill="#0056D2"
           
          >
            Q
          </text>
          {/* Flow Text */}
          <text
            x="53"
            y="50"
            fontFamily="'Arial', sans-serif"
            fontSize="40"
            fontWeight="normal"
            fill="#0056D2"
          >
            flow
          </text>
          <path
  d="M 5 54 C 50 10, 80 100, 120 55"
  stroke="#0056D2"
  strokeWidth="2"
  fill="none"
/>
        </svg>
        </Link>  
        </div>

        {/* Links for desktop */}
        <div className="hidden lg:flex lg:items-center lg:space-x-7 lg:ml-16">
          <Link
            href="/"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-gray-500 hover:text-gray-200" : "hover:text-gray-600 font-bold"
            }`}
          >
            Home
          </Link>
          <Link
            href="/Tools/Visualizers"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-gray-500 hover:text-gray-200" : "hover:text-gray-600 font-bold"
            }`}
          >
            Visualizers
          </Link>

          <Link
            href="/Compiler"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-gray-500 hover:text-gray-200" : "hover:text-gray-600 font-bold"
            }`}
          >
           Online Compiler
          </Link>
          <Link
            href="/AI Tutor"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-gray-500 hover:text-gray-200"  : "hover:text-gray-600 font-bold"
            }`}
          >
            AI Tutor
          </Link>
          <Link href="/profile" className="rounded-full">
            <ProfileIcon className="w-20 h-20" />
          </Link>

          <Link href={"https://github.com/annuk123/Qflows"} >
          <GitHubIcon />
          </Link>
          

          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="text-white" />
            ) : (
              <MoonIcon className="text-black" />
            )}
          </button>

          {!isLoggedIn ? (
            <Button
              onClick={handleLoginRedirect}
              variant="contained"
              //color="primary"
              className="ml-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 animate-gradient-border"
            >
              <Link href="/signIn" className="text-gray-400 hover:text-gray-300">Login</Link>
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              variant="contained"
              color="secondary"
              className="ml-4"
            >
              Logout
            </Button>
          )}
        </div>




{/* mobile view */}
        {/* Theme Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200 ml-12"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="text-white " />
            ) : (
              <MoonIcon className="text-black" />
            )}
          </button>
        </div>
        <div className="flex items-center lg:hidden">
          {!isLoggedIn ? (
            <Button
              onClick={handleLoginRedirect}
              variant="contained"
              color="primary"
              className="ml-6"
            >
              <Link href="/signIn">Login</Link>
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              variant="contained"
              color="secondary"
              className="ml-4"
            >
              Logout
            </Button>
          )}
        </div>


<div className="lg:hidden ">
        <button
          onClick={togglePanel}
          className="text-white p-2 focus:outline-none"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar for Mobile */}

      <div
  className={`fixed top-0 left-0 w-64 h-full p-6 z-50 transition-transform transform ${
    isMenuOpen ? "translate-x-0" : "-translate-x-full"
  } ${
    isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
  } shadow-lg lg:hidden`}
>
  {/* Close Button */}
  <button
    onClick={togglePanel}
    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

  {/* Navigation Links */}
  <nav className="mt-16 space-y-6">
    <Link
      href="/"
      className={`block text-lg font-semibold ${
        isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
      }`}
    >
      Home
    </Link>
    <Link
      href="/Tools/Visualizers"
      className={`block text-lg font-semibold ${
        isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
      }`}
    >
      Visualizers
    </Link>
    <Link
      href="/Tools/Docs"
      className={`block text-lg font-semibold ${
        isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
      }`}
    >
      Debugger
    </Link>
    <Link
      href="/Tools/About"
      className={`block text-lg font-semibold ${
        isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
      }`}
    >
      About
    </Link>
  </nav>

    {/* Github section */}
    <div className="mt-8 flex items-center space-x-4">
      <Link href={"https://github.com/annuk123/Qflows"} >
          <GitHubIcon />
          </Link>
    <Link
      href="/profile"
      className={`text-lg font-semibold ${
        isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
      }`}
    >
      Github
    </Link>
  </div>

  {/* Profile Section */}
  <div className="mt-8 flex items-center space-x-4">
    <Link href="/profile">
      <ProfileIcon
        className={`w-12 h-12 rounded-full border-2 ${
          isDarkMode ? "border-blue-400" : "border-blue-600"
        }`}
      />
    </Link>
    <Link
      href="/profile"
      className={`text-lg font-semibold ${
        isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
      }`}
    >
      Profile
    </Link>
  </div>


</div>

{/* Overlay when Sidebar is Open */}
{isMenuOpen && (
  <div
    className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
    onClick={togglePanel}
  />
)}
</nav>

  );
};

export default Navbar;
