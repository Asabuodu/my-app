// "use client";
// import { AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import CategoryInput from "./CategoryInput";
// import TimeInput from "./TimeInput";

// const [started, setStarted] = useState(false);

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

// const TimerForm = () => {
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState<Time>({
//     hours: 1,
//     minutes: 30,
//     seconds: 30,
//   });
//   const [categories, setCategories] = useState<Category[]>([
//     {
//       id: 1,
//       name: "Opening Prayer",
//       duration: { hours: 1, minutes: 30, seconds: 30 },
//     },
//   ]);

//   const addCategory = () => {
//     setCategories([
//       ...categories,
//       {
//         id: Date.now(),
//         name: "",
//         duration: { hours: 0, minutes: 0, seconds: 0 },
//       },
//     ]); 
//   };


//   const removeCategoryById = (id: number) => {
//   setCategories((prev) => prev.filter((cat) => cat.id !== id));
// };


//   const updateCategoryName = (id: number, name: string) => {
//     setCategories((prev) =>
//       prev.map((cat) => (cat.id === id ? { ...cat, name } : cat))
//     );
//   };

//   const updateCategoryTime = (id: number, time: Time) => {
//     setCategories((prev) =>
//       prev.map((cat) => (cat.id === id ? { ...cat, duration: time } : cat))
//     );
//   };

//   return (
//     <div className="mt-30">
      
//       <h1 className="mx-auto w-3xl text-center text-black text-2xl font-bold mb-10">
//         Welcome
//       </h1>

//       <div className=" max-w-4xl mx-auto border-r-white border-b-white border-8 mt-6 p-6 rounded-2xl shadow-lg">
//         <p className="font-semibold text-gray-800 text-center mb-6">
//           Create Your Time Schedule
//         </p>

//         {/* Title input */}
//         <div className="flex justify-between items-end flex-wrap gap-4">
//           <div className="flex flex-col">
//             <p className="text-gray-600 font-medium">
//               Purpose/Title of your timer
//             </p>
//             <input
//               type="text"
//               placeholder="Eg. This is a church programme..."
//               className="w-80 p-3 border rounded-lg mb-4 font-sans text-gray-600 flex"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>
       

//         <div className="flex flex-col mb-6 w-full max-w-md">
//         <label className="block mb-2 font-medium text-gray-600">
//            State your duration
//          </label>

//         <div className="flex gap-4">
//         <TimeInput time={duration} onChange={setDuration} />
//         <p className="rounded-full bg-black text-white px-4 py-2 text-medium  w-24">
//           {String(duration.hours).padStart(2, "0")}:
//           {String(duration.minutes).padStart(2, "0")}:
//           {String(duration.seconds).padStart(2, "0")}
//         </p>
//         </div>
//       </div>

//         </div>

//         <hr className="my-6 text-gray-500 " />

//           <label className="block  text-gray-700 mx-auto w-fit m-7 mb-6 font-bold">
//             How many categories?
//           </label>
//         <div className="mb-2 text-gray-500 justify-between">
     

//           {/* // Inside the render: */}
//             <AnimatePresence>
//               {categories.map((cat, index) => (
//                 <CategoryInput
//                   key={cat.id}
//                   index={index + 1}
//                   data={cat}
//                   onNameChange={updateCategoryName}
//                   onTimeChange={updateCategoryTime}
//                   onRemove={removeCategoryById} // You’ll need this function
//                 />
//               ))}
//             </AnimatePresence>

//         </div>

//         <div className="flex gap-2 mb-6 items-center">
//           <button
//             onClick={addCategory}
//             className="border border-gray-500 px-3 mx-auto text-gray-500 py-1 rounded-lg"
//           >
//             +
//           </button>
        
//         </div>

//         <div className="items-center flex gap-8 m-auto w-fit justify-center mt-6">
//           {/* <button className="bg-black text-white px-6 py-2 rounded-full w-40">
//             Start
//           </button> */}
//           <button
//             className="bg-black text-white px-6 py-2 rounded-full w-40"
//             onClick={() => setStarted(true)}
//           >
//             Start
//           </button>

//           <button className="border border-black px-6 py-2 rounded-full w-40 text-black">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimerForm;



// "use client";
// import { AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import CategoryInput from "./CategoryInput";
// import TimeInput from "./TimeInput";
// import OngoingSchedule from "./OngoingSchedule"; // Make sure this import is present

// import { useScheduleStore } from "../lib/scheduleStore";
// import { useRouter } from "next/navigation";

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

// const TimerForm = () => {
//   const [started, setStarted] = useState(false); // ✅ Now correctly inside the component

//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState<Time>({
//     hours: 1,
//     minutes: 30,
//     seconds: 30,
//   });
//   const [categories, setCategories] = useState<Category[]>([
//     {
//       id: 1,
//       name: "Opening Prayer",
//       duration: { hours: 1, minutes: 30, seconds: 30 },
//     },
//   ]);

//   const { setCategories } = useScheduleStore();
// const router = useRouter();


//   // Add missing functions that use setCategories
//   const addCategory = () => {
//     setCategories([
//       ...categories,
//       {
//         id: Date.now(),
//         name: "",
//         duration: { hours: 0, minutes: 0, seconds: 0 },
//       },
//     ]);
//   };

//   const removeCategoryById = (id: number) => {
//     setCategories((prev) => prev.filter((cat) => cat.id !== id));
//   };

//   const updateCategoryName = (id: number, name: string) => {
//     setCategories((prev) =>
//       prev.map((cat) => (cat.id === id ? { ...cat, name } : cat))
//     );
//   };

//   const updateCategoryTime = (id: number, time: Time) => {
//     setCategories((prev) =>
//       prev.map((cat) => (cat.id === id ? { ...cat, duration: time } : cat))
//     );
//   };

//   return (
//     <div className="mt-30">
//       {started ? (
//         <OngoingSchedule categories={categories} />
//       ) : (
//         <div>
//           {/* ...Your full form code remains here, unchanged... */}

//             <h1 className="mx-auto w-3xl text-center text-black text-2xl font-bold mb-10">
//         Welcome
//       </h1>

//       <div className=" max-w-4xl mx-auto border-r-white border-b-white border-8 mt-6 p-6 rounded-2xl shadow-lg">
//         <p className="font-semibold text-gray-800 text-center mb-6">
//           Create Your Time Schedule
//         </p>

//         {/* Title input */}
//         <div className="flex justify-between items-end flex-wrap gap-4">
//           <div className="flex flex-col">
//             <p className="text-gray-600 font-medium">
//               Purpose/Title of your timer
//             </p>
//             <input
//               type="text"
//               placeholder="Eg. This is a church programme..."
//               className="w-80 p-3 border rounded-lg mb-4 font-sans text-gray-600 flex"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>
       

//         <div className="flex flex-col mb-6 w-full max-w-md">
//         <label className="block mb-2 font-medium text-gray-600">
//            State your duration
//          </label>

//         <div className="flex gap-4">
//         <TimeInput time={duration} onChange={setDuration} />
//         <p className="rounded-full bg-black text-white px-4 py-2 text-medium  w-24">
//           {String(duration.hours).padStart(2, "0")}:
//           {String(duration.minutes).padStart(2, "0")}:
//           {String(duration.seconds).padStart(2, "0")}
//         </p>
//         </div>
//       </div>

//         </div>

//         <hr className="my-6 text-gray-500 " />

//           <label className="block  text-gray-700 mx-auto w-fit m-7 mb-6 font-bold">
//             How many categories?
//           </label>
//         <div className="mb-2 text-gray-500 justify-between">
     

//           {/* // Inside the render: */}
//             <AnimatePresence>
//               {categories.map((cat, index) => (
//                 <CategoryInput
//                   key={cat.id}
//                   index={index + 1}
//                   data={cat}
//                   onNameChange={updateCategoryName}
//                   onTimeChange={updateCategoryTime}
//                   onRemove={removeCategoryById} // You’ll need this function
//                 />
//               ))}
//             </AnimatePresence>

//         </div>

//         <div className="flex gap-2 mb-6 items-center">
//           <button
//             onClick={addCategory}
//             className="border border-gray-500 px-3 mx-auto text-gray-500 py-1 rounded-lg"
//           >
//             +
//           </button>
        
//         </div>

//         <div className="items-center flex gap-8 m-auto w-fit justify-center mt-6">
        
//             <button
//   className="bg-black text-white px-6 py-2 rounded-full w-40"
//   onClick={() => {
//     setCategories(categories); // save to global store
//     router.push("/ongoing");   // navigate to ongoing page
//   }}
// >
//   Start
// </button>

//           <button className="border border-black px-6 py-2 rounded-full w-40 text-black">
//             Save
//           </button>
//         </div>
//       </div>



//         </div>
//       )}
//     </div>
//   );
// };

// export default TimerForm;



"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import CategoryInput from "./CategoryInput";
import TimeInput from "./TimeInput";
import OngoingSchedule from "./OngoingSchedule";
import { useScheduleStore } from "../lib/scheduleStore";
import { useRouter } from "next/navigation";

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

const TimerForm = () => {
  const [started, setStarted] = useState(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState<Time>({
    hours: 1,
    minutes: 30,
    seconds: 30,
  });
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Opening Prayer",
      duration: { hours: 1, minutes: 30, seconds: 30 },
    },
  ]);

  const setStoreCategories = useScheduleStore((state) => state.setCategories); // ✅ fixed
  const router = useRouter();

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: "",
        duration: { hours: 0, minutes: 0, seconds: 0 },
      },
    ]);
  };

  const removeCategoryById = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const updateCategoryName = (id: number, name: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, name } : cat))
    );
  };

  const updateCategoryTime = (id: number, time: Time) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, duration: time } : cat))
    );
  };

  return (
    <div className="mt-30">
      {started ? (
        <OngoingSchedule categories={categories} />
      ) : (
        <div>
          <h1 className="mx-auto w-3xl text-center text-black text-2xl font-bold mb-10">
            Welcome
          </h1>

          <div className=" max-w-4xl mx-auto border-r-white border-b-white border-8 mt-6 p-6 rounded-2xl shadow-lg">
            <p className="font-semibold text-gray-800 text-center mb-6">
              Create Your Time Schedule
            </p>

            {/* Title input */}
            <div className="flex justify-between items-end flex-wrap gap-4">
              <div className="flex flex-col">
                <p className="text-gray-600 font-medium">
                  Purpose/Title of your timer
                </p>
                <input
                  type="text"
                  placeholder="Eg. This is a church programme..."
                  className="w-80 p-3 border rounded-lg mb-4 font-sans text-gray-600 flex"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-6 w-full max-w-md">
                <label className="block mb-2 font-medium text-gray-600">
                  State your duration
                </label>

                <div className="flex gap-4">
                  <TimeInput time={duration} onChange={setDuration} />
                  <p className="rounded-full bg-black text-white px-4 py-2 text-medium  w-24">
                    {String(duration.hours).padStart(2, "0")}:
                    {String(duration.minutes).padStart(2, "0")}:
                    {String(duration.seconds).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-6 text-gray-500 " />

            <label className="block  text-gray-700 mx-auto w-fit m-7 mb-6 font-bold">
              How many categories?
            </label>

            <div className="mb-2 text-gray-500 justify-between">
              <AnimatePresence>
                {categories.map((cat, index) => (
                  <CategoryInput
                    key={cat.id}
                    index={index + 1}
                    data={cat}
                    onNameChange={updateCategoryName}
                    onTimeChange={updateCategoryTime}
                    onRemove={removeCategoryById}
                  />
                ))}
              </AnimatePresence>
            </div>

            <div className="flex gap-2 mb-6 items-center">
              <button
                onClick={addCategory}
                className="border border-gray-500 px-3 mx-auto text-gray-500 py-1 rounded-lg"
              >
                +
              </button>
            </div>

            <div className="items-center flex gap-8 m-auto w-fit justify-center mt-6">
              <button
                className="bg-black text-white px-6 py-2 rounded-full w-40"
                onClick={() => {
                  setStoreCategories(categories); // ✅ use Zustand
                  router.push("/ongoing"); // ✅ navigate
                }}
              >
                Start
              </button>

              <button className="border border-black px-6 py-2 rounded-full w-40 text-black">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerForm;
