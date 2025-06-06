import { create } from "zustand";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

type Category = {
  id: number;
  name: string;
  duration: Time;
};

type Schedule = {
  id: number;
  title: string;
  duration: Time;
  categories: Category[];
  createdAt: string; // ✅ creation timestamp
  updatedAt?: string; // ✅ optional update timestamp
};

type ScheduleStore = {
  categories: Category[];
  savedSchedules: Schedule[];
  setCategories: (categories: Category[]) => void;
  saveSchedule: (schedule: Schedule) => void;
  deleteSchedule: (id: number) => void;
  setEditingSchedule: (schedule: Schedule | null) => void;
  editingSchedule: Schedule | null;
};

export const useScheduleStore = create<ScheduleStore>((set, get) => ({
  categories: [],
  savedSchedules: [],
  editingSchedule: null,

  setCategories: (categories) => set({ categories }),

  saveSchedule: (schedule) =>
    set((state) => {
      const existingIndex = state.savedSchedules.findIndex(
        (s) => s.id === schedule.id
      );

      let updatedSchedules;
      const now = new Date().toISOString();

      if (existingIndex !== -1) {
        // ✅ Update existing schedule with updatedAt
        const existing = state.savedSchedules[existingIndex];
        const updated = {
          ...schedule,
          createdAt: existing.createdAt, // preserve original creation time
          updatedAt: now,
        };
        updatedSchedules = [...state.savedSchedules];
        updatedSchedules[existingIndex] = updated;
      } else {
        // ✅ New schedule with createdAt
        const newSchedule = {
          ...schedule,
          createdAt: now,
        };
        updatedSchedules = [...state.savedSchedules, newSchedule];
      }

      return {
        savedSchedules: updatedSchedules,
        editingSchedule: null, // ✅ Clear after save
      };
    }),

  deleteSchedule: (id) =>
    set((state) => ({
      savedSchedules: state.savedSchedules.filter((s) => s.id !== id),
    })),

  setEditingSchedule: (schedule) => set({ editingSchedule: schedule }),
  clearEditingSchedule: () => set({ editingSchedule: null }),

}));
