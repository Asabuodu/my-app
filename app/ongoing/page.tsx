// app/ongoing/page.tsx
"use client";

import OngoingSchedule from "../components/OngoingSchedule";
import { useScheduleStore } from "../lib/scheduleStore";
import Navbar from "../components/navbar";

const OngoingPage = () => {
  const categories = useScheduleStore((state) => state.categories);

  return (
    <div className="items-center  bg-white bg-linear-to-r/srgb from-white via-blue-100 to-white-100 to-90% min-h-screen p-6">
      <Navbar />
      {categories.length > 0 ? (
        <OngoingSchedule categories={categories} />
      ) : (
        <p className="text-center text-gray-500 mt-20">
          No schedule found. Please go back and create one.
        </p>
      )}
    </div>
  );
};

export default OngoingPage;
