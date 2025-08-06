
import React from "react";

const CustomInput = ({
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-[#1a1a1a] text-white border border-gray-700 rounded px-4 py-3 pr-10 ${className}`}
      />
      {icon && (
        <span
          className={`pi ${icon} absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500`}
        />
      )}
    </div>
  );
};

export default CustomInput;
