import { create } from "zustand";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useTaskStore = create((set) => ({
  tasks: [],
  logs: [],
  isEditing: false,

  subscribeTasks: () => {
    const q = query(collection(db, "tasks"), orderBy("startDate", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ tasks: tasksData });
    });
    return unsubscribe;
  },

  addTask: async (title) => {
    try {
      await addDoc(collection(db, "tasks"), {
        title,
        status: "todo",
        startDate: "2025-12-01",
        duration: 1,
        createdAt: new Date()
      });
      useTaskStore.getState().addLog(`タスク「${title}」を作成しました`);
    } catch (e) {
      console.error(e);
    }
  },

  deleteTask: async (taskId) => {
    if (!window.confirm("このタスクを削除しますか？")) return;
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    useTaskStore.getState().addLog(`タスクを削除しました`);
  },

  updateTaskTitle: async (taskId, newTitle) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { title: newTitle });
  },

  updateTaskStatus: async (taskId, newStatus) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { status: newStatus });
  },

  updateTaskDate: async (taskId, newStartDate) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { startDate: newStartDate });
  },

  updateTaskDuration: async (taskId, newDuration) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { duration: Math.max(1, newDuration) });
  },

  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),

  addLog: (message) =>
    set((state) => {
      const now = new Date();
      const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      return {
        logs: [{ id: Date.now(), message, time: timeStr }, ...state.logs],
      };
    }),
}));