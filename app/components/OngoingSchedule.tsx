// "use client";
// import { useEffect, useRef, useState } from "react";

// type Time = {
//   hours: number;
//   minutes: number;
//   seconds: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   duration: Time;
// };

// const getTotalSeconds = (time: Time) =>
//   time.hours * 3600 + time.minutes * 60 + time.seconds;

// const format = (n: number) => String(n).padStart(2, "0");

// const OngoingSchedule = ({ categories }: { categories: Category[] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [secondsLeft, setSecondsLeft] = useState(
//     getTotalSeconds(categories[0].duration)
//   );
//   const [isRunning, setIsRunning] = useState(true);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const currentCategory = categories[currentIndex];
//   const total = getTotalSeconds(currentCategory.duration);
//   const percentage = 100 - (secondsLeft / total) * 100;

//   useEffect(() => {
//     if (isRunning) {
//       intervalRef.current = setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(intervalRef.current!);
//             if (currentIndex + 1 < categories.length) {
//               setCurrentIndex(currentIndex + 1);
//               return getTotalSeconds(categories[currentIndex + 1].duration);
//             }
//             return 0; // Timer done
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }

//     return () => clearInterval(intervalRef.current!);
//   }, [isRunning, currentIndex, categories]);

//   const toggleRunning = () => setIsRunning((r) => !r);
//   const reset = () => {
//     clearInterval(intervalRef.current!);
//     setCurrentIndex(0);
//     setSecondsLeft(getTotalSeconds(categories[0].duration));
//     setIsRunning(false);
//   };

//   const hrs = Math.floor(secondsLeft / 3600);
//   const mins = Math.floor((secondsLeft % 3600) / 60);
//   const secs = secondsLeft % 60;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <p className="text-xl mb-2 text-black">
//         {format(hrs)} : {format(mins)} : {format(secs)}
//       </p>

//       <div className="w-[260px] h-[260px] relative mb-6">
//         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//           <circle
//             cx="50"
//             cy="50"
//             r="45"
//             stroke="#eee"
//             strokeWidth="8"
//             fill="none"
//           />
//           <circle
//             cx="50"
//             cy="50"
//             r="45"
//             stroke="#000"
//             strokeWidth="8"
//             fill="none"
//             strokeDasharray="282.74"
//             strokeDashoffset={(282.74 * percentage) / 100}
//             strokeLinecap="round"
//           />
//         </svg>

//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <p className="text-xl font-semibold text-gray-800">{currentCategory.name}</p>
//           <p className="text-sm text-gray-500">hrs &nbsp;&nbsp; mins &nbsp;&nbsp; secs</p>
//           <p className="text-lg font-mono text-black">
//             {format(hrs)}:{format(mins)}:{format(secs)}
//           </p>
//         </div>

//         {/* 🔽 Add these buttons right below the circular timer */}
// <div className="flex justify-between w-72 my-4">
//   <button
//     disabled={currentIndex === 0}
//     onClick={() => {
//       const newIndex = Math.max(0, currentIndex - 1);
//       setCurrentIndex(newIndex);
//       setSecondsLeft(getTotalSeconds(categories[newIndex].duration));
//     }}
//     className="text-gray-600 disabled:text-gray-400"
//   >
//     ← Previous
//   </button>

//   <button
//     disabled={currentIndex === categories.length - 1}
//     onClick={() => {
//       const newIndex = Math.min(categories.length - 1, currentIndex + 1);
//       setCurrentIndex(newIndex);
//       setSecondsLeft(getTotalSeconds(categories[newIndex].duration));
//     }}
//     className="text-gray-600 disabled:text-gray-400"
//   >
//     Next →
//   </button>
// </div>

//       </div>

//       <div className="flex space-x-4">
//         <button onClick={toggleRunning} className="px-4 py-2 rounded bg-black text-white">
//           {isRunning ? "Pause" : "Resume"}
//         </button>
//         <button onClick={reset} className="px-4 py-2 rounded border border-black text-black">
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OngoingSchedule;




"use client";
import { useEffect, useRef, useState } from "react";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

type Category = {
  id: number;
  name: string;
  duration: Time;
};

const getTotalSeconds = (time: Time) =>
  time.hours * 3600 + time.minutes * 60 + time.seconds;

const format = (n: number) => String(n).padStart(2, "0");

const OngoingSchedule = ({ categories }: { categories: Category[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(() =>
    categories.length > 0 ? getTotalSeconds(categories[0].duration) : 0
  );
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentCategory = categories[currentIndex] || {
    name: "No Category",
    duration: { hours: 0, minutes: 0, seconds: 0 },
  };

  const total = getTotalSeconds(currentCategory.duration) || 1;
  const percentage = 100 - (secondsLeft / total) * 100;

  useEffect(() => {
    if (!isRunning || categories.length === 0) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 1) {
          if (currentIndex + 1 < categories.length) {
            setCurrentIndex((prev) => prev + 1);
            return getTotalSeconds(categories[currentIndex + 1].duration);
          } else {
            clearInterval(intervalRef.current!);
            return 0;
          }
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, currentIndex, categories]);

  const toggleRunning = () => setIsRunning((r) => !r);

  const reset = () => {
    clearInterval(intervalRef.current!);
    setCurrentIndex(0);
    setSecondsLeft(getTotalSeconds(categories[0]?.duration || { hours: 0, minutes: 0, seconds: 0 }));
    setIsRunning(false);
  };

  const hrs = Math.floor(secondsLeft / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <p className="text-xl mb-2 text-black">
        {format(hrs)} : {format(mins)} : {format(secs)}
      </p>

      <div className="w-[260px] h-[260px] relative mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#eee"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#000"
            strokeWidth="8"
            fill="none"
            strokeDasharray="282.74"
            strokeDashoffset={(282.74 * percentage) / 100}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-gray-800">
            {currentCategory.name}
          </p>
          <p className="text-sm text-gray-500">hrs &nbsp;&nbsp; mins &nbsp;&nbsp; secs</p>
          <p className="text-lg font-mono text-black">
            {format(hrs)}:{format(mins)}:{format(secs)}
          </p>
        </div>
      </div>

      <div className="flex justify-between w-72 my-4">
        <button
          disabled={currentIndex === 0}
          onClick={() => {
            const newIndex = Math.max(0, currentIndex - 1);
            setCurrentIndex(newIndex);
            setSecondsLeft(getTotalSeconds(categories[newIndex].duration));
          }}
          className="text-gray-600 disabled:text-gray-400"
        >
          ← Previous
        </button>

        <button
          disabled={currentIndex === categories.length - 1}
          onClick={() => {
            const newIndex = Math.min(categories.length - 1, currentIndex + 1);
            setCurrentIndex(newIndex);
            setSecondsLeft(getTotalSeconds(categories[newIndex].duration));
          }}
          className="text-gray-600 disabled:text-gray-400"
        >
          Next →
        </button>
      </div>

      <div className="flex space-x-4">
        <button onClick={toggleRunning} className="px-4 py-2 rounded bg-black text-white">
          {isRunning ? "Pause" : "Resume"}
        </button>
        <button onClick={reset} className="px-4 py-2 rounded border border-black text-black">
          Reset
        </button>
      </div>
    </div>
  );
};

export default OngoingSchedule;
