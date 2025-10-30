import React from "react";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";

const CustomInput = ({
  id,
  type = "text",
  label,
  icon,
  value = "",
  onChange,
  className = "",
  readOnly = false,
}) => {
  const baseStyle =
    "bg-[#1a1a1a] text-white text-sm border border-gray-700 rounded-md px-3 py-3 pr-10 w-full";

  const hasValue = value !== null && value !== undefined && value !== "";

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
            inputClassName={`${baseStyle} ${className} !pr-10`}
            pt={{
              root: { className: "w-full" },
              input: {
                className: "!text-sm !leading-none !p-0 !px-3 !py-3",
              },
              toggleMask: {
                className:
                  "!text-gray-400 right-3 top-1/2 -translate-y-1/2",
              },
            }}
            placeholder=" "
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={`${baseStyle} ${className} ${
              readOnly ? "cursor-default" : ""
            }`}
            placeholder={hasValue ? label : " "} // key fix for FloatLabel behavior
            readOnly={readOnly}
          />
        )}

        <label
          htmlFor={id}
          className={`text-gray-400 text-sm ${
            hasValue ? "transform scale-90 -translate-y-4" : ""
          }`}
        >
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
