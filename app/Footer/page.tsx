import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Brand Name */}
        <div className="text-lg font-semibold">Qflows</div>
        
        {/* Middle Section - Links */}
        <nav className="mt-4 md:mt-0 flex space-x-6 text-sm">
          <a href="/about" className="hover:text-gray-400 transition">About</a>
          <a href="/contact" className="hover:text-gray-400 transition">Contact</a>
          <a href="/privacy" className="hover:text-gray-400 transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-400 transition">Terms of Service</a>
        </nav>

        {/* Right Section - Social Links */}
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <FaTwitter size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <FaLinkedin size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <FaInstagram size={20} />
          </a>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-4 md:mt-0 text-sm">
          &copy; {new Date().getFullYear()} Qflows. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
