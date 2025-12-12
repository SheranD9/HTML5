import React from "react";

const dates = [
  { day: "10日", week: "水" },
  { day: "11日", week: "木" },
  { day: "12日", week: "金" },
  { day: "13日", week: "土" },
  { day: "14日", week: "日" },
];

const tasks = [
  {
    id: 1,
    title: "〇〇作成",
    start: 0,
    end: 2,
    checkbox: true,
  },
  {
    id: 2,
    title: "追加で〇〇作成",
    start: 1,
    end: 3,
    arrowFrom: 0,
  },
  {
    id: 3,
    title: "",
    start: 0,
    end: 4,
  },
];

const TimelineGrid = () => {
  return (
    <div className="relative w-full border rounded-xl bg-white shadow p-4">
      {/* Month Header */}
      <div className="text-center text-lg font-medium mb-2">12月</div>

      {/* Date Row */}
      <div className="grid grid-cols-5 border-b mb-4">
        {dates.map((d) => (
          <div
            key={d.day}
            className="h-14 border-r flex flex-col justify-center items-center text-gray-700"
          >
            <span>{d.day}</span>
            <span className="text-sm text-gray-500">{d.week}</span>
          </div>
        ))}
      </div>

      {/* Tasks Layer */}
      <div className="relative h-80">
        {tasks.map((t, index) => (
          <div
            key={t.id}
            className="absolute bg-[#7ecbff] rounded-md text-white p-2 flex items-center gap-2"
            style={{
              top: index * 70,
              left: `${t.start * 20}%`,
              width: `${(t.end - t.start) * 20}%`,
              height: "50px",
            }}
          >
            {t.title && <span>{t.title}</span>}

            {t.checkbox && (
              <input type="checkbox" className="w-5 h-5 ml-auto" />
            )}
          </div>
        ))}

        {/* Arrow Example */}
        <div className="absolute"
          style={{
            top: "70px",
            left: "20%",
          }}
        >
          ➜
        </div>

        {/* SOS Button */}
        <button className="absolute bottom-2 left-2 bg-yellow-300 text-gray-800 px-6 py-2 rounded-full font-semibold shadow">
          SOS
        </button>
      </div>
    </div>
  );
};

export default TimelineGrid;
