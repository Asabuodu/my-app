
"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import Splash from "./Splash"; // Adjust the import path if needed

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Used for active state
  const [isOpen, setIsOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [disableSplash, setDisableSplash] = useState(false);

  const navItems = [
    { label: "Make Schedule", path: "/" },
    { label: "Ongoing Schedule", path: "/ongoing" },
    { label: "Saved Schedule", path: "/saved" },
    { label: "Setting", path: "/settings" },
    { label: "Help", path: "/help" },
    { label: "Sign Up", path: "/signup" },
  ];

  const handleLogoClick = () => {
    if (!disableSplash) {
      setShowSplash(true);
      setDisableSplash(true);
    }
  };

  const handleNavClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <>
      <Splash show={showSplash} onClose={() => setShowSplash(false)} />

      <nav className="w-full px-6 md:px-14 py-4 bg-transparent">
        <div className="flex items-center justify-around hover:border-black">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={isHovered ? "/vector.png" : "/vector1.png"}
              alt="Logo"
              width={50}
              height={50}
            />
            <span className="text-3xl md:text-5xl font-bold text-black">Simp</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 items-center">
            {navItems.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => handleNavClick(path)}
                className={`pb-2 text-sm font-medium transition-all ${
                  pathname === path
                    ? "border-b-2 border-black text-black hover:text-amber-500 hover:border-amber-500"
                    : "text-black hover:text-amber-500"
                }`}
              >
                {label}
              </button>
            ))}
            <button className="ml-4 text-gray-700 border-2 border-black px-6 py-2 rounded-full text-sm font-mono hover:bg-blue-500 hover:text-white transition"
            onClick={() => handleNavClick("/signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 flex flex-col md:hidden gap-4">
            {navItems.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => handleNavClick(path)}
                className={`text-left text-sm font-medium ${
                  pathname === path
                    ? "border-b-2 border-black text-black hover:text-amber-500 hover:border-amber-500"
                    : "text-black hover:text-amber-500"
                }`}
              >
                {label}
              </button>
            ))}
            <button className="text-gray-700 border border-black px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition"
              onClick={() => handleNavClick("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
 