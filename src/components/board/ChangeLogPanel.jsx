import React from "react";

const logs = Array(10).fill({
  date: "yyyy/mm/dd",
  message: "変更しましたとかの通知",
});

const ChangeLogPanel = ({ open, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-gray-200 p-4 shadow-xl transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">変更ログ</h2>
        <button onClick={onClose} className="text-xl font-bold">×</button>
      </div>

      <div className="overflow-y-scroll h-full">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-2 mb-4">
            <div className="w-4 h-4 bg-white rounded-full border"></div>
            <div>
              <p className="text-sm font-medium">{log.date}</p>
              <p className="text-sm text-gray-600">{log.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeLogPanel;
