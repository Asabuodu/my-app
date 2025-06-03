// "use client";
// // import Image from "next/image";
// import Navbar from "../components/navbar";
// import OngoingSchedule from "../components/OngoingSchedule"; 

// export default function ongoing() {
//   return (
//     <div className=" items-center bg-white  min-h-screen p-4">
//       <Navbar/>
//       <OngoingSchedule categories={[]} />
//     {/* <h1>Timer App</h1> */}
//     </div>
//   );
// }

"use client";
import Navbar from "../components/navbar";
import OngoingSchedule from "../components/OngoingSchedule";
import { useScheduleStore } from "../lib/scheduleStore";

export default function Ongoing() {
  const categories = useScheduleStore((state) => state.categories);

  return (
    <div className="items-center bg-white min-h-screen p-4">
      <Navbar />
      <OngoingSchedule categories={categories} />
    </div>
  );
}
