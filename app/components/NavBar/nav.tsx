"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HamburgerMenu from "../../Hamburger/hamburger"; // Import the HamburgerMenu component
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
  const [isNavFixed, setIsNavFixed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        isDarkMode ? "bg-gray-800 text-white" : "bg-blue-300 text-black"
      } bg-black text-white shadow-lg p-4 flex justify-between items-center transition-all duration-300`}
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
              isDarkMode ? "font-bold text-blue-600 hover:text-gray-200" : "hover:text-gray-600 font-bold"
            }`}
          >
            Home
          </Link>
          <Link
            href="/Tools/Visualizers"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-blue-600 hover:text-gray-200" : "hover:text-gray-600 font-bold"
            }`}
          >
            Visualizers
          </Link>

          <Link
            href="/Tools/Docs"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-blue-600 hover:text-gray-200" : "hover:text-gray-600 font-bold"
            }`}
          >
            Docs
          </Link>
          <Link
            href="/Tools/About"
            className={`text-sm sm:text-base ${
              isDarkMode ? "font-bold text-blue-600 hover:text-gray-200"  : "hover:text-gray-600 font-bold"
            }`}
          >
            About
          </Link>
          <Link href="/profile" className="hover:bg-gray-300 rounded-full">
            <ProfileIcon className="w-16 h-16" />
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
