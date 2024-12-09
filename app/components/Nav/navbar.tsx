"use client";

import React, { useState } from "react";
import SunIcon from "../icons/sunicon";
import MoonIcon from "../icons/moonicon";
import Link from "next/link";
import { AccountCircle as ProfileIcon } from "@mui/icons-material";
import { GitHub as GitHubIcon } from "@mui/icons-material";

interface NavProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const languages = [
  "JavaScript",
  "Python",
  "TypeScript",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "Swift",
  "Go",
  "Kotlin",
  "Rust",
];

const Nav: React.FC<NavProps> = ({
  isDarkMode,
  toggleTheme,
  selectedLanguage,
  onLanguageChange,
  // speed,
  // onSpeedChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLanguageClick = (language: string) => {
    onLanguageChange(language);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-blue-300 text-black"
      } bg-black text-white shadow-lg p-4 flex justify-between items-center transition-all duration-300`}
    >
      <div className="flex items-center mr-12">
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

      <div className="flex lg:items-center gap-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-gray-700 text-white p-2 rounded flex items-center gap-2"
          >
            {selectedLanguage}{" "}
            <span className="ml-2">
              {/* {dropdownOpen ? "arrow_drop_up" : "arrow_drop_down"} */}
              {dropdownOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 15l-7-7-7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </span>
          </button>

          {dropdownOpen && (
            <ul
              className={`absolute z-10 bg-gray-700 text-white rounded shadow-lg mt-2 text-capitalize`}
            >
              {languages.map((language) => (
                <li
                  key={language}
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleLanguageClick(language)}
                >
                  {language}
                </li>
              ))}
            </ul>
          )}

        </div>
        <Link href="/profile" className="hidden lg:block hover:bg-gray-300 rounded-full">
            <ProfileIcon className="w-16 h-16" />
          </Link>

          <Link href={"https://github.com/annuk123/Qflows"} className="hidden lg:block">
          <GitHubIcon />
          </Link>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <SunIcon className="text-white" />
          ) : (
            <MoonIcon className="text-black" />
          )}
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden ">
        <button
          onClick={toggleMenu}
          className="text-white p-2 focus:outline-none"
        >
          {menuOpen ? (
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
        className={`fixed top-0 left-0 w-64 h-full p-4 z-50 transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-blue-300 text-black"
        } lg:hidden`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white p-2"
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

      {/* Overlay when Sidebar is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
};

export default Nav;
