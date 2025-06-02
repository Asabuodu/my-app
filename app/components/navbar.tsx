// "use client";
// import { useState } from "react";
// import { Menu, X } from "lucide-react"; // You can install lucide-react or use any icon lib

// const Navbar = () => {
//   const [active, setActive] = useState("Make Schedule");
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     "Make Schedule",
//     "Ongoing Schedule",
//     "Saved Schedule",
//     "Setting",
//     "Help",
//   ];

//   return (
//     <nav className="w-full px-6 md:px-14 py-4 bg-white ">
//       <div className="flex items-center justify-around hover:border-black">
//         {/* Logo */}
//         <div className="flex items-center gap-2 text-black text-xl font-bold">
//           <span className="hover:text-amber-500 text-4xl md:text-6xl">⏱</span>
//           <span className="text-3xl md:text-5xl font-bold">Simp</span>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex gap-14 text-sm font-medium">
//           {navItems.map((item) => (
//             <button
//               key={item}
//               onClick={() => setActive(item)}
//               className={`pb-2 transition-all ${
//                 active === item
//                   ? "border-b-2 border-black text-black hover:text-amber-500 hover:border-amber-500"
//                   : "text-black hover:text-amber-500"
//               }`}
//             >
//               {item}
//             </button>
//           ))}

//           {/* Sign Up */}
//         <button className="hidden md:inline-block text-gray-700 border border-black px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition">
//           Sign Up
//         </button>
//         </div>

        

//         {/* Mobile Toggle Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="mt-4 flex flex-col md:hidden gap-4">
//           {navItems.map((item) => (
//             <button
//               key={item}
//               onClick={() => {
//                 setActive(item);
//                 setIsOpen(false);
//               }}
//               className={`text-left text-sm font-medium ${
//                 active === item
//                   ? "border-b-2 border-black text-black hover:text-amber-500 hover:border-amber-500"
//                   : "text-black hover:text-amber-500"
//               }`}
//             >
//               {item}
//             </button>
//           ))}
//           <button className="text-gray-700 border border-black px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition">
//             Sign Up
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Splash from "./Splash"; // Adjust path if needed

const Navbar = () => {
  const [active, setActive] = useState("Make Schedule");
  const [isOpen, setIsOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const navItems = [
    "Make Schedule",
    "Ongoing Schedule",
    "Saved Schedule",
    "Setting",
    "Help",
  ];

  const handleLogoClick = () => {
    setShowSplash(true);
  };

  return (
    <>
      <Splash show={showSplash} onClose={() => setShowSplash(false)} />

      <nav className="w-full px-6 md:px-14 py-4 bg-white">
        <div className="flex items-center justify-around hover:border-black">
          {/* Logo */}
          <div
            className="flex items-center gap-2 text-black text-xl font-bold cursor-pointer"
            onClick={handleLogoClick}
          >
            <span className="hover:text-amber-500 text-4xl md:text-6xl">⏱</span>
            <span className="text-3xl md:text-5xl font-bold">Simp</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-24 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`pb-2 transition-all ${
                  active === item
                    ? "border-b-2 border-black text-black hover:text-amber-500 hover:border-amber-500"
                    : "text-black hover:text-amber-500"
                }`}
              >
                {item}
              </button>
            ))}

            <button className="hidden md:inline-block text-gray-700 border w-28 h-12 border-black px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-400 hover:text-white transition">
              Sign Up
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 flex flex-col md:hidden gap-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActive(item);
                  setIsOpen(false);
                }}
                className={`text-left text-sm font-medium ${
                  active === item
                    ? "border-b-2 border-black text-black hover:text-amber-500 hover:border-amber-500"
                    : "text-black hover:text-amber-500"
                }`}
              >
                {item}
              </button>
            ))}
            <button className="text-gray-700 border border-black px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition">
              Sign Up
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
