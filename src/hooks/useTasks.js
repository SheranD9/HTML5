import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase"; // firebase 初期化

export default function useTasks(projectId) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (!projectId) return;
    const q = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(arr);
    }, (err) => {
      console.error("tasks snapshot error", err);
    });
    return () => unsub();
  }, [projectId]);

  const getByStatus = (status) => tasks.filter(t => t.status === status);

  return { tasks, setTasks, getByStatus };
}