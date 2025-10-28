import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const toggleChat = () => setOpen(!open);

  // Height of mobile footer nav: 64px (h-16) + small margin
  const mobileNavOffset = "calc(4rem + 1rem)"; // 4rem = 64px, +1rem margin

  return (
    <div
      className="fixed right-6 z-50"
      style={{ bottom: mobileNavOffset }} // Ensures chatbot stays above mobile nav
    >
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-400 shadow-lg hover:bg-amber-500 transition-colors"
      >
        {open ? <X className="w-6 h-6 text-gray-900" /> : <MessageCircle className="w-6 h-6 text-gray-900" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="mt-4 w-80 h-96 bg-gray-900 rounded-2xl shadow-xl border border-yellow-400/20 flex flex-col overflow-hidden">
          <div className="bg-yellow-400/20 p-4">
            <h3 className="text-yellow-400 font-bold text-lg">Golden Swift AI Assistant</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-gray-200">
            <div className="text-sm text-gray-400">Hello! How can I help you today?</div>
            {/* Messages would be dynamically added here */}
          </div>
          <div className="p-3 border-t border-yellow-400/20 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 text-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 p-2 rounded-xl hover:bg-amber-500 transition-colors">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
