// src/store/useTaskStore.js
import { create } from "zustand";

export const useTaskStore = create((set) => ({
  // 日付(startDate)と期間(duration)を追加したダミーデータ
  tasks: [
    { id: "1", title: "要件定義", status: "done", startDate: "2025-12-01", duration: 3 },
    { id: "2", title: "UIデザイン", status: "inprogress", startDate: "2025-12-04", duration: 5 },
    { id: "3", title: "実装", status: "todo", startDate: "2025-12-10", duration: 7 },
    { id: "4", title: "テスト", status: "todo", startDate: "2025-12-18", duration: 4 },
  ],

  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        // 新規タスク作成時もデフォルトの日付を入れる
        {
          id: Date.now().toString(),
          title,
          status: "todo",
          startDate: "2025-12-01",
          duration: 1
        },
      ],
    })),
function calcProgressFromSubtasks(subtasks = []) {
  if (!subtasks || subtasks.length === 0) return 0;
  const done = subtasks.filter(s => s.done).length;
  return done / subtasks.length;
}

export const useTaskStore = create((set, get) => ({
  mode: "list", // "list" | "timeline"
  setMode: (m) => set({ mode: m }),

  statusFilter: "todo", // current tab
  setStatus: (s) => set({ statusFilter: s }),
  setTasks: (tasks) => set({ tasks }),

  tasks: [
    {
      id: "1",
      title: "Login Page UI Design",
      assigned: "DS (avatar)",
      deadline: "20 DEC 2025",
      tag: "Frontend",
      status: "todo",
      subtasks: [
        { id: "s1", text: "Wireframe", done: true },
        { id: "s2", text: "Mockup", done: false },
      ],
      // progress is derived — included for hydration/debugging but recalc on init
      progress: 0.5,
      // for timeline view (start/end as day indices)
      startDayIndex: 0,
      endDayIndex: 1,
    },
    {
      id: "2",
      title: "Dashboard Layout",
      assigned: "MK (avatar)",
      deadline: "22 DEC 2025",
      tag: "Frontend",
      status: "review",
      subtasks: [
        { id: "s3", text: "Header", done: true },
        { id: "s4", text: "Cards", done: true },
        { id: "s5", text: "Footer", done: false },
      ],
      progress: 2 / 3,
      startDayIndex: 1,
      endDayIndex: 3,
    },
  ],

  // Recalculate progress for a task from its subtasks
  recalcProgress: (taskId) => {
    set((state) => {
      const tasks = state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        const progress = calcProgressFromSubtasks(t.subtasks);
        return { ...t, progress };
      });
      return { tasks };
    });
  },

  addTask: (payload) =>
    set((state) => {
      const id = Date.now().toString();
      // payload.subtasks: array of { text }
      const subtasks = (payload.subtasks || []).map((s, i) => ({
        id: `${id}-s${i}`,
        text: s,
        done: false,
      }));
      const progress = calcProgressFromSubtasks(subtasks);
      const newTask = {
        id,
        title: payload.title || "Untitled",
        assigned: payload.assigned || "Unassigned",
        deadline: payload.deadline || "",
        tag: payload.tag || "",
        status: payload.status || "todo",
        subtasks,
        progress,
        startDayIndex: payload.startDayIndex ?? 0,
        endDayIndex: payload.endDayIndex ?? (payload.startDayIndex ?? 0),
      };
      return { tasks: [newTask, ...state.tasks] };
    }),

  toggleSubtask: (taskId, subtaskId) =>
    set((state) => {
      const tasks = state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        const subtasks = t.subtasks.map((s) =>
          s.id === subtaskId ? { ...s, done: !s.done } : s
        );
        const progress = calcProgressFromSubtasks(subtasks);
        return { ...t, subtasks, progress };
      });
      return { tasks };
    }),

  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      ),
    })),
}));
