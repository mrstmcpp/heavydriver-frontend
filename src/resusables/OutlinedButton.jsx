import React from "react";

const OutlinedButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`text-yellow-400 cursor-pointer border border-yellow-400 px-6 py-2 rounded hover:bg-yellow-500 hover:text-black transition ${className}`}
    >
      {children}
    </button>
  );
};

export default OutlinedButton;
