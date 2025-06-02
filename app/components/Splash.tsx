// "use client";
// import { useEffect, useState } from "react";

// type SplashProps = {
//   show: boolean;
//   onClose: () => void;
// };

// const Splash = ({ show, onClose }: SplashProps) => {
//   useEffect(() => {
//     if (show) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [show, onClose]);

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ease-out ${
//         show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div className="text-center px-8">
//         <div className="text-6xl md:text-8xl mb-4">⏱</div>
//         <h1 className="text-3xl md:text-5xl font-bold text-black">SIMP</h1>
//         <p className="mt-4 text-gray-600 text-lg md:text-xl font-medium">
//           Your personal time schedule – anywhere, anytime.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Splash;




"use client";
import { useEffect, useState } from "react";

type SplashProps = {
  show: boolean;
  onClose: () => void;
};

const Splash = ({ show, onClose }: SplashProps) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose();
        }, 500); // Match with transition duration
      }, 2000);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`text-center px-8 transform transition-all duration-500 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="text-6xl md:text-8xl mb-4 text-amber-500 font-bold">⏱</div>
        <h1 className="text-5xl md:text-5xl font-bold text-black">SIMP</h1>
        <p className="mt-4 text-gray-600 text-lg md:text-xl font-medium">
          Your personal time schedule <br /> Any Where,  Any Time.
        </p>
      </div>
    </div>
  );
};

export default Splash;
