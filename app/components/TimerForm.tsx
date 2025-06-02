// Timer Form: src/components/TimerForm.tsx

"use client";
import  { useState } from "react";
import CategoryInput from "./CategoryInput";
import TimeInput from "./TimeInput";

const TimerForm = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState({ hours: 1, minutes: 30, seconds: 30 });
  const [categories, setCategories] = useState([
    { id: 1, name: "Opening Prayer", duration: { hours: 1, minutes: 30, seconds: 30 } }
  ]);

  const addCategory = () => {
    setCategories([...categories, { id: Date.now(), name: "", duration: { hours: 0, minutes: 0, seconds: 0 } }]);
  };
  

 const removeCategory = () => {
  if (categories.length > 1) {
    setCategories(categories.slice(0, -1));
  }
};
// TypeScript types for Category

  type Category = {
    id: number;
    name: string;
    duration: {
      hours: number;
      minutes: number;
      seconds: number;
    };
  };

  const updateCategory = (
    id: number,
    key: keyof Category,
    value: Category[keyof Category]
  ) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, [key]: value } : cat
    ));
  };

  return (

    <div className="mt-30 ">
    <h1 className="mx-auto w-3xl text-center text-black text-2xl font-bold mb-10 ">Welcome</h1>

    <div className="bg-gray-100 max-w-4xl mx-auto border-r-white border-b-white  border-8 mt-6 p-6 rounded-2xl shadow-lg">
      <p className=" font-semibold text-gray-800 text-center mb-6">Create Your Time Schedule</p>

      {/* Title input */}
      <div className="flex justify-between">

      <div className="flex flex-col">

      <p className="text-gray-600 font-medium ">Purpose/Title of your timer</p>
      <input
        type="text"
        placeholder="Eg. This is a church programme..."
        className="w-80 p-3 border rounded-lg mb-4 font-sans text-gray-600 flex"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      </div>

      <div className="mb-6 w-60 flex flex-col">
        <label className="block mb-2 font-medium text-gray-600">State your duration</label>
        <TimeInput time={duration} onChange={setDuration} />
      </div>
      </div>

      

      <hr className="my-6" />

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">How many categories?</label>
        {categories.map((cat, index) => (
          <CategoryInput
            key={cat.id}
            index={index + 1}
            data={cat}
            onUpdate={updateCategory}
          />
        ))}
      </div>

      <button
        onClick={addCategory}
        className="border border-gray-400 px-3 py-1 rounded-lg mb-6"
      >
        +
      </button>

       <button
        onClick={removeCategory}
        className="border border-gray-400 px-3 py-1 rounded-lg mb-6"
      >
        x
      </button>

      <div className="items-center flex gap-8 m-auto w-fit justify-center mt-6">
        <button className="bg-black text-white px-6 py-2 rounded-full w-40">Start</button>
        <button className="border border-black px-6 py-2 rounded-full w-40 text-black">Save</button>
      </div>
    </div>
    </div>
  );
};

export default TimerForm;