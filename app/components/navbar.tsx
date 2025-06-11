

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Splash from "./Splash";
import { useAuthStore } from "@/app/lib/authStore";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [disableSplash, setDisableSplash] = useState(false);
  // const [user, setUser] = useState<{ 
  //   isLoggedIn: boolean; 
  //   username: string; 
  //   avatarUrl: string 
  // } | null>(null);


  // Get auth state from store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = !!user;


  //  useEffect(() => {
  //   // Fetch user session on mount
  //   const fetchSession = async () => {
  //     try {
  //       const res = await fetch('/api/auth/session', {
  //         credentials: 'include',
  //       });
        
  //       if (res.ok) {
  //         const session = await res.json();
  //         if (session.user) {
  //           setUser(session.user);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Session check failed:', error);
  //     }
  //   };

  //   fetchSession();
  // }, [setUser]);

  useEffect(() => {
  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/session', {
        credentials: 'include',
      });

      if (res.ok) {
        const session = await res.json();
        if (session.user) {
          setUser({
            username: session.user.name || "Unnamed",
            avatarUrl: session.user.image || "/default-avatar.png",
            isLoggedIn: true,
          });
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
    }
  };

  fetchSession();
}, [setUser]);




  // Check authentication status on component mount
  // useEffect(() => {
  //   // In a real app, you would check authentication status here
  //   const userData = {
  //     isLoggedIn: true, // Change to false to see logged out state
  //     username: "Alex Johnson",
  //     avatarUrl: "/avatar.png",
  //   };
  //   setUser(userData);
  // }, []);

  

  const handleLogout = () => {
    // In a real app: clear tokens, session, etc.
    setUser(null);
    // Redirect to home page after logout
    router.push("/");
    // Close mobile menu if open
    setIsOpen(false);
  };

  const navItems = [
    { label: "Make Schedule", path: "/" },
    { label: "Ongoing Schedule", path: "/ongoing" },
    { label: "Saved Schedule", path: "/saved" },
    { label: "Setting", path: "/settings" },
    { label: "Help", path: "/help" },
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

            {/* User Status Section */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={user.avatarUrl}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-gray-300"
                  />
                  <span className="text-sm font-medium text-black">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 border border-gray-400 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="ml-4 text-gray-700 border-2 border-black px-6 py-2 rounded-full text-sm font-mono hover:bg-blue-500 hover:text-white transition"
                onClick={() => handleNavClick("/signup")}
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
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

            {/* Mobile User Status Section */}
            {user ? (
              <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Image
                    src={user.avatarUrl}
                    alt="User Avatar"
                    width={30}
                    height={30}
                    className="rounded-full border-2 border-gray-300"
                  />
                  <span className="text-sm text-black">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 border border-gray-400 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                className="text-gray-700 border border-black px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                onClick={() => handleNavClick("/signup")}
              >
                Sign Up
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;