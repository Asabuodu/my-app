// app/ongoing/page.tsx
"use client";

import OngoingSchedule from "../components/OngoingSchedule";
import { useScheduleStore } from "../lib/scheduleStore";
import Navbar from "../components/navbar";

const OngoingPage = () => {
  const categories = useScheduleStore((state) => state.categories);

  return (
    <div  className="items-center bg-white min-h-screen p-4">
      <Navbar />
      {categories.length > 0 ? (
        <OngoingSchedule categories={categories} />
      ) : (
        <p className="text-center text-gray-500 mt-20">No schedule found. Please go back and create one.</p>
      )}
    </div>
  );
};

export default OngoingPage;
