// Time Input: src/components/TimeInput.tsx
// import React from "react";

type Time = { hours: number; minutes: number; seconds: number };

type Props = {
  time: Time;
  onChange: (time: Time) => void;
};

const TimeInput = ({ time, onChange }: Props) => {
  return (
    <div className="flex gap-2 text-gray-600">
      <input
        type="number"
        className="w-16 text-center border rounded-md"
        value={time.hours}
        onChange={(e) => onChange({ ...time, hours: parseInt(e.target.value) || 0 })}
      />
      <span>:</span>
      <input
        type="number"
        className="w-16 text-center border rounded-md"
        value={time.minutes}
        onChange={(e) => onChange({ ...time, minutes: parseInt(e.target.value) || 0 })}
      />
      <span>:</span>
      <input
        type="number"
        className="w-16 text-center border rounded-md"
        value={time.seconds}
        onChange={(e) => onChange({ ...time, seconds: parseInt(e.target.value) || 0 })}
      />
    </div>
  );
};

export default TimeInput;