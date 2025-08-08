import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import React from "react";

const CustomInput = ({
  id,
  type = "text",
  label,
  placeholder,
  icon,
  value,
  onChange,
  className = "",
}) => {
  const baseStyle =
    "bg-[#1a1a1a] text-white text-sm border border-gray-700 rounded-md px-3 py-3 pr-10 w-full";

  return (
    <div className="relative mb-4 w-full">
      <FloatLabel>
        {type === "password" ? (
          <Password
            id={id}
            value={value}
            onChange={onChange}
            toggleMask
            feedback={false}
            inputId={id}
            className="w-full"
            inputClassName={`${baseStyle} ${className} !pr-10`}
            pt={{
              root: { className: "w-full" },
              input: {
                className:
                  "!text-sm !leading-none !p-0 !px-3 !py-3",
              },
              toggleMask: {
                className:
                  "!text-gray-400 right-3 top-1/2 -translate-y-1/2",
              },
            }}
            placeholder={placeholder}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={`${baseStyle} ${className}`}
            placeholder={placeholder}
          />
        )}

        <label htmlFor={id} className="text-gray-400 text-sm">
          {label}
        </label>

        {icon && type !== "password" && (
          <span
            className={`pi ${icon} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm`}
          />
        )}
      </FloatLabel>
    </div>
  );
};

export default CustomInput;
