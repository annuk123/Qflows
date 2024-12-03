// components/HamburgerMenu.tsx
"use client";
import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';

interface HamburgerMenuProps {
  isOpen: boolean;
  togglePanel: () => void;
  isDarkMode: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, togglePanel, isDarkMode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
  return (
    <div className="">
      {/* <span
        className={`block h-1 w-6 bg-white transition-transform ${
          isOpen ? 'transform rotate-45 translate-y-2' : ''
        }`}
      ></span>
      <span
        className={`block h-1 w-6 bg-white transition-opacity ${
          isOpen ? 'opacity-0' : ''
        }`}
      ></span>
      <span
        className={`block h-1 w-6 bg-white transition-transform ${
          isOpen ? 'transform -rotate-45 -translate-y-2' : ''
        }`}
      ></span> */}
     
     {isMenuOpen && (
         <div className="bg-gray-700 md:hidden">
          <ul className="flex flex-row space-y-4 p-4">
            <li>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/services" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
          <Link href="/pages/login" onClick={closeMenu} passHref>
        <Button variant="contained" color="primary" size="small" className='w-full'>
          Login
        </Button>
      </Link>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
