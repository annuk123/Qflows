"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HamburgerMenu from "../../Hamburger/hamburger"; // Import the HamburgerMenu component
import SunIcon from "../icons/sunicon";
import MoonIcon from "../icons/moonicon";
import Button from "@mui/material/Button";
import { AccountCircle as ProfileIcon } from "@mui/icons-material";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

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
        className={`${
          isDarkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-black"
        } bg-black text-white shadow-lg py-2 px-4 flex items-center justify-between lg:justify-around gap-1 w-full min-w-80 transition-all duration-300`}
      >
        {/* Logo */}
        <div className="flex flex-0 items-center">
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
        </div>

        {/* Links for desktop */}
        <div className="hidden lg:flex lg:items-center lg:space-x-7 lg:ml-16">
          <Link
            href="/"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-blue-600" : "hover:text-gray-600 "
            }`}
          >
            Home
          </Link>
          <Link
            href="/Tools/Visualizer"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-blue-600" : "hover:text-gray-600"
            }`}
          >
            Visualizer
          </Link>
          <Link
            href="/Tools/SvgEditor"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-blue-600" : "hover:text-gray-600"
            }`}
          >
            SVG Editor
          </Link>
          <Link
            href="/Tools/Reviewer"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-blue-600" : "hover:text-gray-600"
            }`}
          >
            Reviewer
          </Link>
          <Link
            href="/Tools/UI-Designs"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-blue-600" : "hover:text-gray-600"
            }`}
          >
            UI Designs
          </Link>
          <Link href="/profile" className="hover:text-gray-600">
            <ProfileIcon className="w-16 h-16" />
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
              color="primary"
              className="ml-4"
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




{/* mobile view */}
        {/* Theme Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="text-white ml-12" />
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

        <div
          className="flex flex-col gap-2 lg:hidden cursor-pointer "
          onClick={togglePanel}
        >
          <span className="w-8 h-0.5 bg-black dark:bg-white"></span>
          <span className="w-8 h-0.5 bg-black dark:bg-white"></span>
          <span className="w-8 h-0.5 bg-black dark:bg-white"></span>
        </div>
        <HamburgerMenu
          isOpen={isMenuOpen}
          togglePanel={togglePanel}
          isDarkMode={isDarkMode}
        />
      </nav>

  );
};

export default Navbar;
