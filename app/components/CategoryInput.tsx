// Category Input: src/components/CategoryInput.tsx

"use client";
// import React from "react";
import TimeInput from "./TimeInput";

type Category = {
  id: number;
  name: string;
  duration: { hours: number; minutes: number; seconds: number };
};

type Props = {
  index: number;
  data: Category;
  onUpdate: (id: number, key: string, value: string | Category["duration"]) => void;
};

const CategoryInput = ({ index, data, onUpdate }: Props) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={data.name}
        placeholder={`Category ${index}`}
        onChange={(e) => onUpdate(data.id, "name", e.target.value)}
        className="w-full p-2 border text-gray-500 rounded-md mb-2"
      />
      <TimeInput
        time={data.duration}
        onChange={(newTime) => onUpdate(data.id, "duration", newTime)}
      />
    </div>
  );
};

export default CategoryInput;