"use client";

import { useState } from "react";
import { useScheduleStore } from "@/app/lib/scheduleStore";
import Navbar from "../components/navbar";
import ConfirmModal from "../components/ConfirmModal";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function SavedPage() {
  const { savedSchedules, deleteSchedule } = useScheduleStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  const [expandedScheduleId, setExpandedScheduleId] = useState<number | null>(
    null
  );
  const setEditingSchedule = useScheduleStore(
    (state) => state.setEditingSchedule
  );
  const router = useRouter();

  const openModal = (id: number) => {
    setSelectedScheduleId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedScheduleId !== null) {
      deleteSchedule(selectedScheduleId);
    }
    setModalOpen(false);
    setSelectedScheduleId(null);
  };

  const toggleExpanded = (id: number) => {
    setExpandedScheduleId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6  bg-white bg-linear-to-r/srgb from-white via-blue-100 to-white-100 to-90% text-gray-500 min-h-screen">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-600 text-center mb-10">
          Saved Schedules
        </h1>

        {savedSchedules.length === 0 ? (
          <p className="text-center">No schedules saved yet.</p>
        ) : (
          <ul className="space-y-6">
            {[...savedSchedules]
              .sort(
                (a, b) =>
                  new Date(b.createdAt || 0).getTime() -
                  new Date(a.createdAt || 0).getTime()
              )
              .map((schedule) => {
                const isExpanded = expandedScheduleId === schedule.id;

                return (
                  <li
                    key={schedule.id}
                    className="p-10 items-center  rounded-xl shadow bg-transparent text-center mx-auto max-w-full  border border-gray-200"
                  >
                    <h2
                      className="text-xl flex items-center justify-between font-bold cursor-pointer  hover:text-gray-900"
                      onClick={() => toggleExpanded(schedule.id)}
                    >
                      <div className="text-left ">
                        {schedule.title}
                        <span className="text-gray-500 text-lg font-light ">
                          <span className="mx-12 text-sm">
                            Schedule Duration:
                          </span>
                          <span>
                            {String(schedule.duration.hours).padStart(2, "0")}:
                            {String(schedule.duration.minutes).padStart(2, "0")}
                            :
                            {String(schedule.duration.seconds).padStart(2, "0")}
                          </span>
                          {/* {String(schedule.duration.hours).padStart(2, "0")}:
                          {String(schedule.duration.minutes).padStart(2, "0")}:
                          {String(schedule.duration.seconds).padStart(2, "0")} */}
                        </span>
                      </div>

                      <span>
                        <p className="text-sm text-gray-500">
                          Created:{" "}
                          {new Date(schedule.createdAt).toLocaleString()}
                        </p>
                        {schedule.createdAt && (
                          <div className="text-sm text-center text-gray-400 mt-1 ">
                            Last Edited:{" "}
                            {new Date(schedule.updatedAt).toLocaleString()}
                          </div>
                        )}
                      </span>

                      <ChevronDownIcon
                        className={`w-6 h-6 ml-2 transform flex-none transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </h2>

                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isExpanded
                          ? "max-h-[500px] opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-1 text-gray-700 text-sm text-left">
                        {schedule.categories.map((cat) => (
                          <li key={cat.id}>
                            • {cat.name || "Unnamed Category"}{" "}
                            <span> Cartegory Duration </span>{" "}
                            {String(cat.duration.hours).padStart(2, "0")}:
                            {String(cat.duration.minutes).padStart(2, "0")}:
                            {String(cat.duration.seconds).padStart(2, "0")}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                        <button
                          onClick={() => {
                            useScheduleStore
                              .getState()
                              .setCategories(schedule.categories);
                            router.push("/ongoing");
                          }}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
                        >
                          Start
                        </button>

                        <button
                          onClick={() => {
                            setEditingSchedule(schedule);
                            router.push(`/edit/${schedule.id}`);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => openModal(schedule.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}

        <ConfirmModal
          message="Are you sure you want to delete this schedule?"
          isOpen={isModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
}
