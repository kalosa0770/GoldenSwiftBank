import React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ShoppingCart,
  Home,
  DollarSign,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import Announcements from "./Announcements";
import ShortcutAccess from "./ShortcutAccess";

// --- SmartTip Component ---
const SmartTip = () => {
  const currentTip = {
    title: "Your Health Matters",
    content: "Remember to renew your health insurance this month!",
    action: "Set a Monthly Budget",
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50/10 to-amber-50/5 p-6 rounded-2xl shadow-lg border border-yellow-400/20 flex flex-col justify-between transition-all duration-300 hover:shadow-xl min-h-[250px]">
      <div className="flex items-center space-x-3 mb-5">
        <Lightbulb className="w-8 h-8 text-yellow-400 bg-yellow-100/30 p-1 rounded-full shadow-sm" />
        <h3 className="text-xl font-extrabold text-yellow-400">Golden Swift Tip</h3>
      </div>

      <div className="flex flex-col flex-grow justify-center">
        <p className="text-gray-900 text-2xl font-bold mb-3 leading-snug">
          {currentTip.title}
        </p>
        <p className="text-gray-700 text-base mb-6">{currentTip.content}</p>
      </div>

      <button className="w-full py-3 text-center bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-amber-500 transition duration-200 shadow-md shadow-yellow-400/30">
        {currentTip.action}
      </button>
    </div>
  );
};

// --- RecentActivities Component ---
const mockActivities = [
  { id: 1, type: "Transfer", description: "Received funds from John M.", amount: 850.0, date: "Oct 24", status: "completed", icon: ArrowDownLeft, iconColor: "text-green-600", bgColor: "bg-green-100/50" },
  { id: 2, type: "Payment", description: "Electricity Bill (ZESCO)", amount: -125.5, date: "Oct 23", status: "completed", icon: Home, iconColor: "text-red-600", bgColor: "bg-red-100/50" },
  { id: 3, type: "Purchase", description: "Online Shopping (Amazon)", amount: -45.99, date: "Oct 23", status: "completed", icon: ShoppingCart, iconColor: "text-red-600", bgColor: "bg-red-100/50" },
  { id: 4, type: "Withdrawal", description: "Cash withdrawal at Agent 102", amount: -300.0, date: "Oct 22", status: "completed", icon: DollarSign, iconColor: "text-red-600", bgColor: "bg-red-100/50" },
  { id: 5, type: "Transfer", description: "Sent funds to Jane D.", amount: -50.0, date: "Oct 22", status: "pending", icon: ArrowUpRight, iconColor: "text-amber-600", bgColor: "bg-amber-100/50" },
];

const RecentActivities = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-yellow-400/20 text-white min-h-[400px] flex flex-col">
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-6">Recent Activities</h2>
      <div className="space-y-4 flex-grow overflow-y-auto no-scrollbar">
        {mockActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-yellow-400/30 hover:bg-gray-800/50 transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${activity.bgColor}`}>
                <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">{activity.description}</span>
                <span className="text-sm text-gray-300">{activity.date} &bull; {activity.type}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className={`font-bold text-lg ${activity.amount > 0 ? "text-green-400" : "text-gray-200"}`}>
                  {activity.amount > 0 ? "+" : "-"}ZMW {Math.abs(activity.amount).toFixed(2)}
                </span>
                <span className={`block text-xs font-medium uppercase ${activity.status === "pending" ? "text-amber-400" : "text-gray-400"}`}>
                  {activity.status}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full py-3 text-center bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-amber-500 transition duration-200 shadow-md shadow-yellow-400/30">
        View All Transactions
      </button>
    </div>
  );
};

// --- Combined Dashboard Widget Layout ---
const DashboardWidgets = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">
      <div className="lg:col-span-2 flex flex-col space-y-6">
        <RecentActivities />
        <Announcements className="min-h-[200px]" />
      </div>
      <div className="lg:col-span-1 flex flex-col space-y-6">
        <SmartTip />
        <ShortcutAccess className="min-h-[200px]" />
      </div>
    </div>
  );
};

export default DashboardWidgets;
