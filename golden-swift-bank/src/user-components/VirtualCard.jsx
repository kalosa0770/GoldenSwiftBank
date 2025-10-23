// VirtualCard.jsx
import React from 'react';
import { CreditCard } from 'lucide-react';

const maskCardNumber = (rawNumber) => {
  if (!rawNumber) return '•••• •••• •••• ••••';

  // Keep only digits
  const digits = rawNumber.replace(/\D/g, '');
  const last4 = digits.slice(-4).padStart(4, '•'); // if shorter than 4, pad with bullets

  // Build masked blocks: show bullets for every preceding 4-digit block
  const maskedBlocks = [];
  const totalBlocks = Math.ceil(digits.length / 4) || 4;

  for (let i = 0; i < totalBlocks - 1; i++) {
    maskedBlocks.push('••••');
  }
  // Add last block showing only last 4 digits
  maskedBlocks.push(last4);

  // Ensure exactly 4 blocks for consistent layout (optional)
  while (maskedBlocks.length < 4) {
    maskedBlocks.unshift('••••');
  }

  return maskedBlocks.join(' ');
};

const VirtualCard = ({
  bank = 'ZANACO',
  cardNumber = '4567890123456789',
  cardHolder = 'GOLDEN SWIFT',
  expiry = '10/27',
}) => {
  const maskedNumber = maskCardNumber(cardNumber);

  return (
    <div className="flex flex-col space-y-3">
      <div className="w-full h-full p-6 relative rounded-3xl shadow-2xl overflow-hidden
                      bg-gradient-to-br from-amber-900 to-blue-700 text-white
                      transition duration-500 transform hover:scale-[1.01] hover:shadow-indigo-500/50">
        <div
          className="absolute inset-0 bg-white opacity-5 rounded-3xl"
          style={{ clipPath: 'polygon(0% 0%, 50% 0%, 100% 100%, 0% 100%)' }}
        />

        <div className="flex justify-between items-start mb-6 z-10 relative">
          <h2 className="text-xl font-extrabold text-amber-400 tracking-widest">{bank}</h2>
          <CreditCard className="w-8 h-8 text-white opacity-80" />
        </div>

        {/* Masked Card Number */}
        <div className="text-center font-mono text-lg sm:text-xl md:text-2xl tracking-[0.2em] mb-4 pt-6 z-10 relative">
          {maskedNumber.split(' ').map((block, i) => (
            <span key={i} className={`${i === 3 ? 'text-amber-300 font-extrabold mr-2' : 'mr-2'}`}>
              {block}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center text-xs pt-4 z-10 relative">
          <div className="flex flex-col">
            <span className="text-indigo-200 opacity-80 text-[0.6rem] tracking-wider">CARD HOLDER</span>
            <span className="text-sm font-semibold uppercase tracking-wider">{cardHolder}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-indigo-200 opacity-80 text-[0.6rem] tracking-wider">EXPIRES</span>
            <span className="text-sm font-semibold">{expiry}</span>
          </div>
        </div>

        <button className="mt-4 w-full bg-white text-amber-600 hover:bg-amber-600 hover:text-white 
                         font-semibold py-3 px-6 rounded-xl border border-amber-600 transition 
                         duration-200 shadow-md">
          Manage Card Details
        </button>
      </div>
    </div>
  );
};

export default VirtualCard;
