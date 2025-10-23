import React, { useState, useEffect } from "react";
import CheckBalance from "./CheckBalance";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
};

const Greeting = ({ userName }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
        {/* Greeting */}
        <div className="flex flex-col">
            <h1 className="text-gray-800 font-nunito font-extrabold text-2xl md:text-3xl tracking-tight leading-snug">
            {greeting},{' '}
            <span className="text-amber-500 font-extrabold">{userName}</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-1">
                Welcome back! Let’s continue we the transactions.
            </p>
        </div>

        {/* Balance Card */}
        <div className="mt-2">
            <CheckBalance />
        </div>
        </div>

  );
};

export default Greeting;
