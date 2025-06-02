"use client";
// import Image from "next/image";
import Navbar from "./components/navbar";
import TimerForm from "./components/TimerForm";

export default function Home() {
  return (
    <div className=" items-center bg-white  min-h-screen p-4">
      <Navbar/>
      <TimerForm />
    {/* <h1>Timer App</h1> */}
    </div>
  );
}
