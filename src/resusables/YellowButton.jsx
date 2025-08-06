import React from "react";

const YellowButton = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer relative bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded shadow-md transition-all duration-200 overflow-hidden flex items-center justify-center ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {/* Decorative bar without affecting layout */}
      <span className="absolute right-0 top-0 w-2 h-full bg-white skew-x-[30deg] pointer-events-none" />
    </button>
  );
};

export default YellowButton;
