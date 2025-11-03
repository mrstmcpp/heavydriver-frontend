import React from "react";

const FloatingAction = ({
  label,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "fixed bottom-6 left-0 right-0 flex justify-center z-50";

  const buttonBase =
    "relative font-semibold py-3 px-10 rounded-full shadow-lg transition-all duration-200 border";

  const variants = {
    primary:
      "bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-700 animate-glow-yellow",
    danger:
      "bg-red-600 hover:bg-red-700 text-white border-red-800 animate-glow-red",
    warning:
      "bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-600 animate-glow-yellow",
  };

  const variantClasses = variants[variant] || variants.primary;

  return (
    <div className={`${baseStyles} ${className}`}>
      <button onClick={onClick} className={`${buttonBase} ${variantClasses}`}>
        {label}
        <span className="absolute inset-0 rounded-full pointer-events-none animate-glow-ring"></span>
      </button>
    </div>
  );
};

export default FloatingAction;
