import React from "react";
import { Bell } from "lucide-react";

const announcements = [
  { title: "New Feature", content: "AI Assistant now available in your dashboard." },
  { title: "Maintenance Alert", content: "Scheduled downtime on Nov 1, 2 AM - 4 AM." },
  { title: "Promo", content: "Earn 5% cashback on all transfers this month!" },
];

const Announcements = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-yellow-400/20">
      <div className="flex items-center mb-4">
        <Bell className="w-6 h-6 text-yellow-400 mr-2" />
        <h2 className="text-yellow-400 font-extrabold text-xl">Announcements</h2>
      </div>
      <ul className="space-y-3">
        {announcements.map((item, idx) => (
          <li
            key={idx}
            className="bg-gray-800 p-3 rounded-lg hover:bg-gray-800/70 transition-all duration-200"
          >
            <p className="font-semibold text-gray-200">{item.title}</p>
            <p className="text-gray-400 text-sm">{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
