import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [
    { id: "1", title: "Design UI", status: "todo" },
    { id: "2", title: "Setup Firebase", status: "inprogress" },
    { id: "3", title: "Create Charts", status: "done" },
  ],

  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: Date.now().toString(), title, status: "todo" },
      ],
    })),

  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      ),
    })),
}));