import { create } from "zustand";

export const useTaskStore = create((set) => ({
  status: "todo",

  setStatus: (s) => set({ status: s }),

  tasks: [
    {
      id: "1",
      title: "Login Page UI Design",
      assigned: "DS (avatar)",
      deadline: "20 DEC 0000",
      tag: "Frontend",
      status: "todo",
      progress: 0.4,
    },
    {
      id: "2",
      title: "Dashboard Layout",
      assigned: "MK (avatar)",
      deadline: "22 DEC 0000",
      tag: "Frontend",
      status: "review",
      progress: 0.8,
    },
  ],

  getTasksByStatus: (status) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.status === status) })),
}));
