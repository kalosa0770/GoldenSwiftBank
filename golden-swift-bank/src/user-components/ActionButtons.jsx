import React from "react";
import {
  Send,
  SendToBack,
  ArrowDownCircle,
  ArrowUpCircle,
  ReceiptText,
  Phone,
} from "lucide-react";

const ActionButtons = () => {
  const actions = [
    { name: "Send", icon: Send, primary: true },
    { name: "Request", icon: SendToBack },
    { name: "Cash In", icon: ArrowDownCircle },
    { name: "Cash Out", icon: ArrowUpCircle },
    { name: "Pay Bills", icon: ReceiptText },
    { name: "Airtime", icon: Phone },
  ];

  return (
    <div className="space-y-5">
      {/* Title */}
      <h1 className="text-white font-semibold text-xl tracking-wide">
        Quick Actions
      </h1>

      {/* Scrollable Action Buttons */}
      <div className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-2">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`flex-shrink-0 flex flex-col items-center justify-center
              rounded-2xl p-4 w-24 h-24 sm:w-28 sm:h-28
              font-medium text-sm tracking-tight shadow-sm
              transition-all duration-300 ease-in-out transform
              hover:scale-[1.05] hover:shadow-lg active:scale-95
              ${
                action.primary
                  ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-yellow-400/40 hover:from-amber-500 hover:to-yellow-700"
                  : "bg-white text-gray-800 border border-yellow-400/20 hover:bg-yellow-50 hover:text-amber-600 hover:border-yellow-200"
              }`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full mb-2
                ${
                  action.primary
                    ? "bg-white/20"
                    : "bg-yellow-100 text-amber-600 group-hover:bg-yellow-200"
                }`}
            >
              <action.icon
                className={`w-6 h-6 ${
                  action.primary ? "text-white" : "text-amber-600"
                }`}
              />
            </div>
            <span className={`${action.primary ? "text-white" : "text-gray-800"}`}>
              {action.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
