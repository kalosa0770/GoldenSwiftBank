import React from "react";
import { CreditCard, DollarSign, PieChart, Phone } from "lucide-react";

const shortcuts = [
  { name: "Transfer", icon: DollarSign },
  { name: "Pay Bills", icon: CreditCard },
  { name: "Analytics", icon: PieChart },
  { name: "Airtime", icon: Phone },
];

const ShortcutAccess = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-yellow-400/20">
      <h2 className="text-yellow-400 font-extrabold text-xl mb-4">Quick Shortcuts</h2>
      <div className="grid grid-cols-2 gap-4">
        {shortcuts.map((item, idx) => (
          <button
            key={idx}
            className="flex flex-col items-center justify-center p-4 bg-yellow-50/10 hover:bg-yellow-400/20 rounded-xl transition-all duration-200"
          >
            <item.icon className="w-6 h-6 text-yellow-400 mb-2" />
            <span className="text-gray-200 text-sm">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShortcutAccess;
