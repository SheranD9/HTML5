import React from "react";
import Column from "../components/board/Column";

const BoardPage = () => {
  return (
    <div className="flex gap-4 p-6 h-screen bg-gray-100">
      <Column title="To Do" status="todo" />
      <Column title="In Progress" status="inprogress" />
      <Column title="Done" status="done" />
    </div>
  );
};

export default BoardPage;
