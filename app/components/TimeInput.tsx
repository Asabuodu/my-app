
type Time = { hours: number; minutes: number; seconds: number };

type Props = {
  time: Time;
  onChange: (time: Time) => void;
};

const TimeInput = ({ time, onChange }: Props) => {
  // Format with 2-digit padding
  const format = (num: number) => String(num).padStart(2, "0");
  const [h1, h2] = format(time.hours);
  const [m1, m2] = format(time.minutes);
  const [s1, s2] = format(time.seconds);

  const updateTimeUnit = (
    unit: "hours" | "minutes" | "seconds",
    index: 0 | 1,
    value: string
  ) => {
    if (!/^\d$/.test(value)) return; // Only accept a single digit (0–9)

    const current = format(time[unit]);
    const newDigits = index === 0 ? value + current[1] : current[0] + value;
    let newValue = parseInt(newDigits);

    if (isNaN(newValue)) return;

    if (unit === "minutes" || unit === "seconds") {
      newValue = Math.min(59, newValue);
    } else if (unit === "hours") {
      newValue = Math.min(99, newValue); // Optional cap
    }

    onChange({ ...time, [unit]: newValue });
  };

  return (
    <div className="flex gap-2 text-gray-600 items-center">
      {/* Hours */}
      <input
        type="text"
        maxLength={1}
        className="w-6 text-center border rounded-md"
        value={h1}
        onChange={(e) => updateTimeUnit("hours", 0, e.target.value)}
      />
      <input
        type="text"
        maxLength={1}
        className="w-6 text-center border rounded-md"
        value={h2}
        onChange={(e) => updateTimeUnit("hours", 1, e.target.value)}
      />
      <span>:</span>

      {/* Minutes */}
      <input
        type="text"
        maxLength={1}
        className="w-6 text-center border rounded-md"
        value={m1}
        onChange={(e) => updateTimeUnit("minutes", 0, e.target.value)}
      />
      <input
        type="text"
        maxLength={1}
        className="w-6 text-center border rounded-md"
        value={m2}
        onChange={(e) => updateTimeUnit("minutes", 1, e.target.value)}
      />
      <span>:</span>

      {/* Seconds */}
      <input
        type="text"
        maxLength={1}
        className="w-6 text-center border rounded-md"
        value={s1}
        onChange={(e) => updateTimeUnit("seconds", 0, e.target.value)}
      />
      <input
        type="text"
        maxLength={1}
        className="w-6 text-center border rounded-md"
        value={s2}
        onChange={(e) => updateTimeUnit("seconds", 1, e.target.value)}
      />
    </div>
  );
};

export default TimeInput;
