// "use client";

// import { AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import CategoryInput from "./CategoryInput";
// import TimeInput from "./TimeInput";
// import OngoingSchedule from "./OngoingSchedule";
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

// // TimerForm component allows users to create a schedule with categories and durations
// const TimerForm = () => {
//   const [started, setStarted] = useState(false);
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState<Time>({
//     hours: 1,
//     minutes: 30,
//     seconds: 30,
//   });
//   const [categories, setCategories] = useState<Category[]>([
//     {
//       id: 1,
//       name: "",
//       duration: { hours: 1, minutes: 30, seconds: 30 },
//     },
//   ]);


//   // hooks to access the store state and actions
//   const setStoreCategories = useScheduleStore((state) => state.setCategories);
//   // const saveSchedule = useScheduleStore((state) => state.saveSchedule);
//   const editingSchedule = useScheduleStore((state) => state.editingSchedule);
//   const router = useRouter();


//   // this effect runs when the component mounts or when editingSchedule changes
//   useEffect(() => {
//     if (editingSchedule) {
//       setTitle(editingSchedule.title);
//       setDuration(editingSchedule.duration);
//       setCategories(editingSchedule.categories);
//     }
//   }, [editingSchedule]);

//   // this adds a new category with default values
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

//   // this removes a category by its id
//   const removeCategoryById = (id: number) => {
//     setCategories((prev) => prev.filter((cat) => cat.id !== id));
//   };

//   // this updates the name for a specific category
//   const updateCategoryName = (id: number, name: string) => {
//     setCategories((prev) =>
//       prev.map((cat) => (cat.id === id ? { ...cat, name } : cat))
//     );
//   };

//   // this updates the time for a specific category
//   const updateCategoryTime = (id: number, time: Time) => {
//     setCategories((prev) =>
//       prev.map((cat) => (cat.id === id ? { ...cat, duration: time } : cat))
//     );
//   };

  

//   const saveToDatabase = async () => {
//   const schedule = {
//     title,
//     categories,
//     duration,
//     createdAt: new Date().toISOString(),
//   };

//   try {
//     const res = await fetch("/api/schedules", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(schedule),
//       credentials: "include", // ✅ sends the session cookie
//     });

//     const result = await res.json();

//     if (res.ok && result.success) {
//       alert("Schedule saved to DB");
//       router.push("/saved");
//     } else {
//       alert(result.error || "Failed to save schedule");
//     }
//   } catch (error) {
//     console.error("Error saving schedule:", error);
//     alert("Something went wrong while saving the schedule.");
//   }
// };




//   return (
//     <div className="mt-10 px-4">
//       {started ? (
//         <OngoingSchedule categories={categories} />
//       ) : (
//         <div>
//           <h1 className="text-center text-black text-2xl font-bold mb-10">
//             Welcome
//           </h1>

//           <div className="max-w-4xl w-full mx-auto border-white border-8 mt-6 p-6 rounded-2xl shadow-lg bg-transparent">
//             <p className="font-semibold text-gray-800 text-center mb-6">
//               Create Your Time Schedule
//             </p>

//             {/* Title + Duration input */}
//             <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
//               <div className="flex flex-col w-full md:w-1/2">
//                 <p className="text-gray-600 font-medium">
//                   Purpose/Title of your timer
//                 </p>
//                 <input
//                   type="text"
//                   placeholder="eg.This is a church programme... max 50 characters"
//                   className="w-full p-3 border rounded-lg mb-2 font-sans text-gray-600"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   maxLength={50}
//                 />
//               </div>

//               <div className="flex flex-col w-full md:w-1/2">
//                 <label className="mb-2 font-medium text-gray-600">
//                   State your duration
//                 </label>
//                 <div className="flex flex-wrap gap-4 items-center">
//                   <TimeInput time={duration} onChange={setDuration} />
//                   <p className="rounded-full bg-black text-white px-4 py-2 text-medium w-fit">
//                     {String(duration.hours).padStart(2, "0")}:
//                     {String(duration.minutes).padStart(2, "0")}:
//                     {String(duration.seconds).padStart(2, "0")}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <hr className="my-6 border-gray-300" />

//             <label className="block text-gray-700 mx-auto w-fit mb-6 font-bold">
//               How many categories?
//             </label>

//             <div className="space-y-4">
//               <AnimatePresence>
//                 {categories.map((cat, index) => (
//                   <CategoryInput
//                     key={cat.id}
//                     index={index + 1}
//                     data={cat}
//                     onNameChange={updateCategoryName}
//                     onTimeChange={updateCategoryTime}
//                     onRemove={removeCategoryById}
//                   />
//                 ))}
//                 maxLength={40}
//               </AnimatePresence>
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={addCategory}
//                 className="border border-gray-500 px-4 py-1 text-gray-500 rounded-lg"
//               >
//                 + Add Category
//               </button>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
//               <button
//                 className="bg-black text-white px-6 py-2 rounded-full w-full sm:w-40 hover:bg-transparent hover:text-black hover:border-black hover:border"
//                 onClick={() => {
//                   setStoreCategories(categories);
//                   router.push("/ongoing");
//                 }}
//               >
//                 Start
//               </button>

//               <button


//                 className="border border-black px-6 py-2 rounded-full w-full sm:w-40 text-black hover:bg-black hover:text-white"

//                // onClick={() => {
//                   // const schedule = {
//                   //   id: Date.now(),
//                   //   title,
//                   //   categories,
//                   //   duration,
//                   //   createdAt: new Date().toISOString(),
//                   // };
//                   // saveSchedule(schedule);
//                   // router.push("/saved");
//                 //}}

//                 onClick={saveToDatabase}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimerForm;



// "use client";

// import { AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// import CategoryInput from "./CategoryInput";
// import TimeInput from "./TimeInput";
// import OngoingSchedule from "./OngoingSchedule";
// import { useScheduleStore } from "../lib/scheduleStore";

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
//   const [started, setStarted] = useState(false);
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState<Time>({
//     hours: 1,
//     minutes: 30,
//     seconds: 30,
//   });
//   const [categories, setCategories] = useState<Category[]>([
//     {
//       id: 1,
//       name: "",
//       duration: { hours: 1, minutes: 30, seconds: 30 },
//     },
//   ]);

//   const router = useRouter();
//   const { data: session, status } = useSession();

//   const setStoreCategories = useScheduleStore((state) => state.setCategories);
//   const saveSchedule = useScheduleStore((state) => state.saveSchedule);
//   const editingSchedule = useScheduleStore((state) => state.editingSchedule);

//   // Redirect unauthenticated users
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     }
//   }, [status, router]);

//   // Load editing data
//   useEffect(() => {
//     if (editingSchedule) {
//       setTitle(editingSchedule.title);
//       setDuration(editingSchedule.duration);
//       setCategories(editingSchedule.categories);
//     }
//   }, [editingSchedule]);

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

//   const saveToDatabase = async () => {
//     const schedule = {
//       title,
//       categories,
//       duration,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       const res = await fetch("/api/schedules", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(schedule),
//         credentials: "include", // important for session cookies
//       });

//       const result = await res.json();

//       if (res.ok && result.success) {
//         alert("Schedule saved to DB");
//         router.push("/saved");
//       } else {
//         alert(result.error || "Failed to save schedule");
//       }
//     } catch (error) {
//       console.error("Error saving schedule:", error);
//       alert("Something went wrong while saving the schedule.");
//     }
//   };

//   return (
//     <div className="mt-10 px-4">
//       {started ? (
//         <OngoingSchedule categories={categories} />
//       ) : (
//         <div>
//           <h1 className="text-center text-black text-2xl font-bold mb-10">
//             Welcome
//           </h1>

//           <div className="max-w-4xl w-full mx-auto border-white border-8 mt-6 p-6 rounded-2xl shadow-lg bg-transparent">
//             <p className="font-semibold text-gray-800 text-center mb-6">
//               Create Your Time Schedule
//             </p>

//             <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
//               <div className="flex flex-col w-full md:w-1/2">
//                 <p className="text-gray-600 font-medium">
//                   Purpose/Title of your timer
//                 </p>
//                 <input
//                   type="text"
//                   placeholder="eg. This is a church programme... max 50 characters"
//                   className="w-full p-3 border rounded-lg mb-2 font-sans text-gray-600"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   maxLength={50}
//                 />
//               </div>

//               <div className="flex flex-col w-full md:w-1/2">
//                 <label className="mb-2 font-medium text-gray-600">
//                   State your duration
//                 </label>
//                 <div className="flex flex-wrap gap-4 items-center">
//                   <TimeInput time={duration} onChange={setDuration} />
//                   <p className="rounded-full bg-black text-white px-4 py-2 text-medium w-fit">
//                     {String(duration.hours).padStart(2, "0")}:
//                     {String(duration.minutes).padStart(2, "0")}:
//                     {String(duration.seconds).padStart(2, "0")}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <hr className="my-6 border-gray-300" />

//             <label className="block text-gray-700 mx-auto w-fit mb-6 font-bold">
//               How many categories?
//             </label>

//             <div className="space-y-4">
//               <AnimatePresence>
//                 {categories.map((cat, index) => (
//                   <CategoryInput
//                     key={cat.id}
//                     index={index + 1}
//                     data={cat}
//                     onNameChange={updateCategoryName}
//                     onTimeChange={updateCategoryTime}
//                     onRemove={removeCategoryById}
//                   />
//                 ))}
//               </AnimatePresence>
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={addCategory}
//                 className="border border-gray-500 px-4 py-1 text-gray-500 rounded-lg"
//               >
//                 + Add Category
//               </button>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
//               <button
//                 className="bg-black text-white px-6 py-2 rounded-full w-full sm:w-40 hover:bg-transparent hover:text-black hover:border-black hover:border"
//                 onClick={() => {
//                   setStoreCategories(categories);
//                   router.push("/ongoing");
//                 }}
//               >
//                 Start
//               </button>

//               <button
//                 className="border border-black px-6 py-2 rounded-full w-full sm:w-40 text-black hover:bg-black hover:text-white"
//                 onClick={saveToDatabase}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimerForm;



// "use client";

// import { AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import CategoryInput from "./CategoryInput";
// import TimeInput from "./TimeInput";
// import OngoingSchedule from "./OngoingSchedule";
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
//   const [started, setStarted] = useState(false);
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState<Time>({
//     hours: 1,
//     minutes: 30,
//     seconds: 30,
//   });
//   const [categories, setCategories] = useState<Category[]>([
//     {
//       id: 1,
//       name: "",
//       duration: { hours: 1, minutes: 30, seconds: 30 },
//     },
//   ]);

//   const setStoreCategories = useScheduleStore((state) => state.setCategories);
//   const saveSchedule = useScheduleStore((state) => state.saveSchedule);
//   const editingSchedule = useScheduleStore((state) => state.editingSchedule);
//   const router = useRouter();

//   useEffect(() => {
//     if (editingSchedule) {
//       setTitle(editingSchedule.title);
//       setDuration(editingSchedule.duration);
//       setCategories(editingSchedule.categories);
//     }
//   }, [editingSchedule]);

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

//   const saveToDatabase = async () => {
//     const schedule = {
//       title,
//       categories,
//       duration,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       const res = await fetch("/api/schedules", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(schedule),
//         credentials: "include", // sends cookie with session
//       });

//       const result = await res.json();

//       if (res.ok && result.success) {
//         alert("✅ Schedule saved to DB");
//         router.push("/saved");
//       } else if (res.status === 401) {
//         alert("⛔ You must be signed in to save your schedule.");
//         router.push("/signin");
//       } else {
//         console.error(result);
//         alert("❌ Failed to save schedule.");
//       }
//     } catch (error) {
//       console.error("Save error:", error);
//       alert("⚠️ Something went wrong.");
//     }
//   };

//   return (
//     <div className="mt-10 px-4">
//       {started ? (
//         <OngoingSchedule categories={categories} />
//       ) : (
//         <div>
//           <h1 className="text-center text-black text-2xl font-bold mb-10">
//             Welcome
//           </h1>

//           <div className="max-w-4xl w-full mx-auto border-white border-8 mt-6 p-6 rounded-2xl shadow-lg bg-transparent">
//             <p className="font-semibold text-gray-800 text-center mb-6">
//               Create Your Time Schedule
//             </p>

//             <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
//               <div className="flex flex-col w-full md:w-1/2">
//                 <p className="text-gray-600 font-medium">
//                   Purpose/Title of your timer
//                 </p>
//                 <input
//                   type="text"
//                   placeholder="e.g. This is a church programme..."
//                   className="w-full p-3 border rounded-lg mb-2 font-sans text-gray-600"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   maxLength={50}
//                 />
//               </div>

//               <div className="flex flex-col w-full md:w-1/2">
//                 <label className="mb-2 font-medium text-gray-600">
//                   State your duration
//                 </label>
//                 <div className="flex flex-wrap gap-4 items-center">
//                   <TimeInput time={duration} onChange={setDuration} />
//                   <p className="rounded-full bg-black text-white px-4 py-2 text-medium w-fit">
//                     {String(duration.hours).padStart(2, "0")}:
//                     {String(duration.minutes).padStart(2, "0")}:
//                     {String(duration.seconds).padStart(2, "0")}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <hr className="my-6 border-gray-300" />

//             <label className="block text-gray-700 mx-auto w-fit mb-6 font-bold">
//               How many categories?
//             </label>

//             <div className="space-y-4">
//               <AnimatePresence>
//                 {categories.map((cat, index) => (
//                   <CategoryInput
//                     key={cat.id}
//                     index={index + 1}
//                     data={cat}
//                     onNameChange={updateCategoryName}
//                     onTimeChange={updateCategoryTime}
//                     onRemove={removeCategoryById}
//                   />
//                 ))}
//               </AnimatePresence>
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={addCategory}
//                 className="border border-gray-500 px-4 py-1 text-gray-500 rounded-lg"
//               >
//                 + Add Category
//               </button>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
//               <button
//                 className="bg-black text-white px-6 py-2 rounded-full w-full sm:w-40 hover:bg-transparent hover:text-black hover:border-black hover:border"
//                 onClick={() => {
//                   setStoreCategories(categories);
//                   setStarted(true);
//                 }}
//               >
//                 Start
//               </button>

//               <button
//                 className="border border-black px-6 py-2 rounded-full w-full sm:w-40 text-black hover:bg-black hover:text-white"
//                 onClick={saveToDatabase}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimerForm;



// "use client";

// import { AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import CategoryInput from "./CategoryInput";
// import TimeInput from "./TimeInput";
// import OngoingSchedule from "./OngoingSchedule";
// import { useScheduleStore } from "../lib/scheduleStore";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "../lib/authStore"; // Create this store

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
//   const [started, setStarted] = useState(false);
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState<Time>({
//     hours: 1,
//     minutes: 30,
//     seconds: 30,
//   });
//   const [categories, setCategories] = useState<Category[]>([
//     {
//       id: 1,
//       name: "",
//       duration: { hours: 1, minutes: 30, seconds: 30 },
//     },
//   ]);
//   const [isSaving, setIsSaving] = useState(false);

//   const setStoreCategories = useScheduleStore((state) => state.setCategories);
//   const saveSchedule = useScheduleStore((state) => state.saveSchedule);
//   const editingSchedule = useScheduleStore((state) => state.editingSchedule);
//   const router = useRouter();
  
//   // Get user from auth store
//   const user = useAuthStore((state) => state.user);
//   const isAuthenticated = !!user;

//   useEffect(() => {
//     if (editingSchedule) {
//       setTitle(editingSchedule.title);
//       setDuration(editingSchedule.duration);
//       setCategories(editingSchedule.categories);
//     }
//   }, [editingSchedule]);

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

//   const saveToDatabase = async () => {
//     if (!isAuthenticated) {
//       alert("⛔ You must sign in to save your schedule.");
//       router.push("/signin");
//       return;
//     }

//     setIsSaving(true);
    
//     const schedule = {
//       title,
//       categories,
//       duration,
//       createdAt: new Date().toISOString(),
//       userId: user.id, // Add user ID for ownership
//     };

//     try {
//       const res = await fetch("/api/schedules", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(schedule),
//         credentials: "include",
//       });

//       const result = await res.json();

//       if (res.ok && result.success) {
//         alert("✅ Schedule saved successfully!");
//         router.push("/saved");
//       } else if (res.status === 401) {
//         alert("⛔ Session expired. Please sign in again.");
//         router.push("/signin");
//       } else {
//         console.error("Save failed:", result.error);
//         alert(`❌ Failed to save schedule: ${result.error || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("⚠️ Network error. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="mt-10 px-4">
//       {started ? (
//         <OngoingSchedule categories={categories} />
//       ) : (
//         <div>
//           <h1 className="text-center text-black text-2xl font-bold mb-10">
//             Welcome
//           </h1>

//           <div className="max-w-4xl w-full mx-auto border-white border-8 mt-6 p-6 rounded-2xl shadow-lg bg-transparent">
//             <p className="font-semibold text-gray-800 text-center mb-6">
//               Create Your Time Schedule
//             </p>

//             <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
//               <div className="flex flex-col w-full md:w-1/2">
//                 <p className="text-gray-600 font-medium">
//                   Purpose/Title of your timer
//                 </p>
//                 <input
//                   type="text"
//                   placeholder="e.g. This is a church programme..."
//                   className="w-full p-3 border rounded-lg mb-2 font-sans text-gray-600"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   maxLength={50}
//                 />
//               </div>

//               <div className="flex flex-col w-full md:w-1/2">
//                 <label className="mb-2 font-medium text-gray-600">
//                   State your duration
//                 </label>
//                 <div className="flex flex-wrap gap-4 items-center">
//                   <TimeInput time={duration} onChange={setDuration} />
//                   <p className="rounded-full bg-black text-white px-4 py-2 text-medium w-fit">
//                     {String(duration.hours).padStart(2, "0")}:
//                     {String(duration.minutes).padStart(2, "0")}:
//                     {String(duration.seconds).padStart(2, "0")}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <hr className="my-6 border-gray-300" />

//             <label className="block text-gray-700 mx-auto w-fit mb-6 font-bold">
//               How many categories?
//             </label>

//             <div className="space-y-4">
//               <AnimatePresence>
//                 {categories.map((cat, index) => (
//                   <CategoryInput
//                     key={cat.id}
//                     index={index + 1}
//                     data={cat}
//                     onNameChange={updateCategoryName}
//                     onTimeChange={updateCategoryTime}
//                     onRemove={removeCategoryById}
//                   />
//                 ))}
//               </AnimatePresence>
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={addCategory}
//                 className="border border-gray-500 px-4 py-1 text-gray-500 rounded-lg"
//               >
//                 + Add Category
//               </button>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
//               <button
//                 className="bg-black text-white px-6 py-2 rounded-full w-full sm:w-40 hover:bg-transparent hover:text-black hover:border-black hover:border"
//                 onClick={() => {
//                   setStoreCategories(categories);
//                   setStarted(true);
//                 }}
//               >
//                 Start
//               </button>

//               <button
//                 className={`border border-black px-6 py-2 rounded-full w-full sm:w-40 text-black ${
//                   isAuthenticated 
//                     ? "hover:bg-black hover:text-white" 
//                     : "opacity-50 cursor-not-allowed"
//                 }`}
//                 onClick={saveToDatabase}
//                 disabled={isSaving || !isAuthenticated}
//               >
//                 {isSaving ? "Saving..." : "Save"}
//               </button>
//             </div>
            
//             {!isAuthenticated && (
//               <p className="text-center text-red-500 mt-2 text-sm">
//                 Sign in required to save schedules
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimerForm;


// "use client";

// // ... existing imports ...
// import { useSession } from "next-auth/react"; // Add this import
// import { AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import CategoryInput from "./CategoryInput";
// import TimeInput from "./TimeInput";
// import OngoingSchedule from "./OngoingSchedule";
// import { useScheduleStore } from "../lib/scheduleStore";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "../lib/authStore"; // Create this store

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
//   // ... existing states ...

//     const [started, setStarted] = useState(false);
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState<Time>({
//     hours: 1,
//     minutes: 30,
//     seconds: 30,
//   });
//   const [categories, setCategories] = useState<Category[]>([
//     {
//       id: 1,
//       name: "",
//       duration: { hours: 1, minutes: 30, seconds: 30 },
//     },
//   ]);
//   const [isSaving, setIsSaving] = useState(false);

//     const setStoreCategories = useScheduleStore((state) => state.setCategories);
//   const saveSchedule = useScheduleStore((state) => state.saveSchedule);
//   const editingSchedule = useScheduleStore((state) => state.editingSchedule);
//   const router = useRouter();
  
//   // Get user from auth store
//   const user = useAuthStore((state) => state.user);
//   const isAuthenticated = !!user;

//   useEffect(() => {
//     if (editingSchedule) {
//       setTitle(editingSchedule.title);
//       setDuration(editingSchedule.duration);
//       setCategories(editingSchedule.categories);
//     }
//   }, [editingSchedule]);

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


//     const removeCategoryById = (id: number) => {
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

//   // Replace Zustand auth store with NextAuth session hook
//   const { data: session, status } = useSession();
//   const isAuthenticated = status === "authenticated";
//   const userId = session?.user?.id;

//   // ... existing code ...

//   const saveToDatabase = async () => {
//     // Use session status instead of Zustand store
//     if (status === "unauthenticated") {
//       alert("⛔ You must sign in to save your schedule.");
//       router.push("/signin");
//       return;
//     }

//     // Handle loading state while session is being checked
//     if (status === "loading") {
//       alert("🔃 Verifying session...");
//       return;
//     }

//     setIsSaving(true);
    
//     const schedule = {
//       title,
//       categories,
//       duration,
//       createdAt: new Date().toISOString(),
//       userId, // Use session user ID
//     };

//     try {
//       const res = await fetch("/api/schedules", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Add CSRF protection if needed
//           // "X-CSRF-Token": session?.csrfToken 
//         },
//         body: JSON.stringify(schedule),
//         credentials: "include", // Essential for cookies
//       });

//       // Handle session expiration
//       if (res.status === 401) {
//         alert("⛔ Session expired. Please sign in again.");
//         router.push("/signin");
//         return;
//       }

//       const result = await res.json();

//       if (res.ok && result.success) {
//         alert("✅ Schedule saved successfully!");
//         router.push("/saved");
//       } else {
//         console.error("Save failed:", result.error);
//         alert(`❌ Failed to save schedule: ${result.error || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("⚠️ Network error. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="mt-10 px-4">
//       {/* ... existing JSX ... */}

//        {started ? (
//         <OngoingSchedule categories={categories} />
//       ) : (
//         <div>
//           <h1 className="text-center text-black text-2xl font-bold mb-10">
//             Welcome
//           </h1>

//           <div className="max-w-4xl w-full mx-auto border-white border-8 mt-6 p-6 rounded-2xl shadow-lg bg-transparent">
//             <p className="font-semibold text-gray-800 text-center mb-6">
//               Create Your Time Schedule
//             </p>

//             <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
//               <div className="flex flex-col w-full md:w-1/2">
//                 <p className="text-gray-600 font-medium">
//                   Purpose/Title of your timer
//                 </p>
//                 <input
//                   type="text"
//                   placeholder="e.g. This is a church programme..."
//                   className="w-full p-3 border rounded-lg mb-2 font-sans text-gray-600"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   maxLength={50}
//                 />
//               </div>

//               <div className="flex flex-col w-full md:w-1/2">
//                 <label className="mb-2 font-medium text-gray-600">
//                   State your duration
//                 </label>
//                 <div className="flex flex-wrap gap-4 items-center">
//                   <TimeInput time={duration} onChange={setDuration} />
//                   <p className="rounded-full bg-black text-white px-4 py-2 text-medium w-fit">
//                     {String(duration.hours).padStart(2, "0")}:
//                     {String(duration.minutes).padStart(2, "0")}:
//                     {String(duration.seconds).padStart(2, "0")}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <hr className="my-6 border-gray-300" />

//             <label className="block text-gray-700 mx-auto w-fit mb-6 font-bold">
//               How many categories?
//             </label>

//             <div className="space-y-4">
//               <AnimatePresence>
//                 {categories.map((cat, index) => (
//                   <CategoryInput
//                     key={cat.id}
//                     index={index + 1}
//                     data={cat}
//                     onNameChange={updateCategoryName}
//                     onTimeChange={updateCategoryTime}
//                     onRemove={removeCategoryById}
//                   />
//                 ))}
//               </AnimatePresence>
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={addCategory}
//                 className="border border-gray-500 px-4 py-1 text-gray-500 rounded-lg"
//               >
//                 + Add Category
//               </button>
//             </div>
      
//       <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
//         <button
//           className="bg-black text-white px-6 py-2 rounded-full w-full sm:w-40 hover:bg-transparent hover:text-black hover:border-black hover:border"
//           onClick={() => {
//             setStoreCategories(categories);
//             setStarted(true);
//           }}
//         >
//           Start
//         </button>

//         <button
//           className={`border border-black px-6 py-2 rounded-full w-full sm:w-40 text-black ${
//             isAuthenticated 
//               ? "hover:bg-black hover:text-white" 
//               : "opacity-50 cursor-not-allowed"
//           }`}
//           onClick={saveToDatabase}
//           disabled={isSaving || !isAuthenticated}
//         >
//           {isSaving ? "Saving..." : "Save"}
//         </button>
//       </div>
      
//       {status === "unauthenticated" && (
//         <p className="text-center text-red-500 mt-2 text-sm">
//           Sign in required to save schedules
//         </p>
//       )}
//     </div>
//   );
// };

// export default TimerForm;


"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CategoryInput from "./CategoryInput";
import TimeInput from "./TimeInput";
import OngoingSchedule from "./OngoingSchedule";
import { useScheduleStore } from "../lib/scheduleStore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
      name: "",
      duration: { hours: 1, minutes: 30, seconds: 30 },
    },
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const setStoreCategories = useScheduleStore((state) => state.setCategories);
  const saveSchedule = useScheduleStore((state) => state.saveSchedule);
  const editingSchedule = useScheduleStore((state) => state.editingSchedule);
  const router = useRouter();
  
  // Get session from NextAuth
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const userId = session?.user?.id;

  useEffect(() => {
    if (editingSchedule) {
      setTitle(editingSchedule.title);
      setDuration(editingSchedule.duration);
      setCategories(editingSchedule.categories);
    }
  }, [editingSchedule]);

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

  const saveToDatabase = async () => {
    // Handle session states
    if (status === "unauthenticated") {
      alert("⛔ You must sign in to save your schedule.");
      router.push("/signin");
      return;
    }

    if (status === "loading") {
      alert("🔃 Verifying session...");
      return;
    }

    setIsSaving(true);
    
    const scheduleData = {
      title,
      categories,
      duration,
      createdAt: new Date().toISOString(),
      userId,
    };

    try {
      const res = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
        credentials: "include",
      });

      // Handle session expiration
      if (res.status === 401) {
        alert("⛔ Session expired. Please sign in again.");
        router.push("/signin");
        return;
      }

      const result = await res.json();

      if (res.ok && result.success) {
        alert("✅ Schedule saved successfully!");
        router.push("/saved");
      } else {
        console.error("Save failed:", result.error);
        alert(`❌ Failed to save schedule: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("⚠️ Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-10 px-4">
      {started ? (
        <OngoingSchedule categories={categories} />
      ) : (
        <div>
          <h1 className="text-center text-black text-2xl font-bold mb-10">
            Welcome
          </h1>

          <div className="max-w-4xl w-full mx-auto border-white border-8 mt-6 p-6 rounded-2xl shadow-lg bg-transparent">
            <p className="font-semibold text-gray-800 text-center mb-6">
              Create Your Time Schedule
            </p>

            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <div className="flex flex-col w-full md:w-1/2">
                <p className="text-gray-600 font-medium">
                  Purpose/Title of your timer
                </p>
                <input
                  type="text"
                  placeholder="e.g. This is a church programme..."
                  className="w-full p-3 border rounded-lg mb-2 font-sans text-gray-600"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <label className="mb-2 font-medium text-gray-600">
                  State your duration
                </label>
                <div className="flex flex-wrap gap-4 items-center">
                  <TimeInput time={duration} onChange={setDuration} />
                  <p className="rounded-full bg-black text-white px-4 py-2 text-medium w-fit">
                    {String(duration.hours).padStart(2, "0")}:
                    {String(duration.minutes).padStart(2, "0")}:
                    {String(duration.seconds).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

            <label className="block text-gray-700 mx-auto w-fit mb-6 font-bold">
              How many categories?
            </label>

            <div className="space-y-4">
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

            <div className="flex justify-center mt-4">
              <button
                onClick={addCategory}
                className="border border-gray-500 px-4 py-1 text-gray-500 rounded-lg"
              >
                + Add Category
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
              <button
                className="bg-black text-white px-6 py-2 rounded-full w-full sm:w-40 hover:bg-transparent hover:text-black hover:border-black hover:border"
                onClick={() => {
                  setStoreCategories(categories);
                  setStarted(true);
                }}
              >
                Start
              </button>

              <button
                className={`border border-black px-6 py-2 rounded-full w-full sm:w-40 text-black ${
                  isAuthenticated 
                    ? "hover:bg-black hover:text-white" 
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={saveToDatabase}
                disabled={isSaving || !isAuthenticated}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
            
            {status === "unauthenticated" && (
              <p className="text-center text-red-300 mt-3 text-sm">
                Sign in required to save schedules
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerForm;