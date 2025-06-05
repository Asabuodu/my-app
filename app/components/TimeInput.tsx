import React from "react";

type Time = { hours: number; minutes: number; seconds: number };

type Props = {
  time: Time;
  onChange: (time: Time) => void;
};

const TimeInput = ({ time, onChange }: Props) => {
  const format = (num: number) => String(num).padStart(2, "0");
  const [h1, h2] = format(time.hours);
  const [m1, m2] = format(time.minutes);
  const [s1, s2] = format(time.seconds);

  const updateTimeUnit = (
    unit: "hours" | "minutes" | "seconds",
    index: 0 | 1,
    value: string
  ) => {
    if (!/^\d$/.test(value)) return;

    const current = format(time[unit]);
    const newDigits = index === 0 ? value + current[1] : current[0] + value;
    let newValue = parseInt(newDigits);

    if (isNaN(newValue)) return;

    if (unit === "minutes" || unit === "seconds") {
      newValue = Math.min(59, newValue);
    } else if (unit === "hours") {
      newValue = Math.min(99, newValue);
    }

    onChange({ ...time, [unit]: newValue });
  };

  const inputClass =
    "w-10 sm:w-8 text-center border rounded-md text-base sm:text-sm py-1";

  return (
    <div className="flex flex-wrap gap-1 sm:gap-2 text-gray-600 items-center">
      {/* Hours */}
      <input
        type="text"
        maxLength={1}
        className={inputClass}
        value={h1}
        onChange={(e) => updateTimeUnit("hours", 0, e.target.value)}
      />
      <input
        type="text"
        maxLength={1}
        className={inputClass}
        value={h2}
        onChange={(e) => updateTimeUnit("hours", 1, e.target.value)}
      />
      <span className="px-1">:</span>

      {/* Minutes */}
      <input
        type="text"
        maxLength={1}
        className={inputClass}
        value={m1}
        onChange={(e) => updateTimeUnit("minutes", 0, e.target.value)}
      />
      <input
        type="text"
        maxLength={1}
        className={inputClass}
        value={m2}
        onChange={(e) => updateTimeUnit("minutes", 1, e.target.value)}
      />
      <span className="px-1">:</span>

      {/* Seconds */}
      <input
        type="text"
        maxLength={1}
        className={inputClass}
        value={s1}
        onChange={(e) => updateTimeUnit("seconds", 0, e.target.value)}
      />
      <input
        type="text"
        maxLength={1}
        className={inputClass}
        value={s2}
        onChange={(e) => updateTimeUnit("seconds", 1, e.target.value)}
      />
    </div>
  );
};

export default TimeInput;
