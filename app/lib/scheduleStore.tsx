// import { create } from "zustand";

// type Time = {
//   hours: number;
//   minutes: number;
//   seconds: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   duration: Time;
// };

// type Store = {
//   categories: Category[];
//   setCategories: (cats: Category[]) => void;
// };

// export const useScheduleStore = create<Store>((set) => ({
//   categories: [],
//   setCategories: (cats) => set({ categories: cats }),
// }));



// import { create } from "zustand";

// type Time = {
//   hours: number;
//   minutes: number;
//   seconds: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   duration: Time;
// };

// type Store = {
//   categories: Category[];
//   setCategories: (cats: Category[]) => void;
// };

// export const useScheduleStore = create<Store>((set) => ({
//   categories: [],
//   setCategories: (cats) => set({ categories: cats }),
// }));


// lib/scheduleStore.ts
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

type Store = {
  categories: Category[];
  setCategories: (cats: Category[]) => void;
};

export const useScheduleStore = create<Store>((set) => ({
  categories: [],
  setCategories: (cats) => set({ categories: cats }),
}));
