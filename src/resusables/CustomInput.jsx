import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

const CustomInput = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderInput = () => {
    const baseClasses =
      "w-full bg-[#0f1218] text-gray-100 border border-gray-700 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 shadow-inner focus:shadow-[0_0_8px_#facc15aa]";

    if (type === "password") {
      return (
        <div className="relative w-full">
          <InputText
            id={name}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            {...rest}
            className={baseClasses}
          />
          <i
            className={`pi ${
              showPassword ? "pi-eye-slash" : "pi-eye"
            } absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-yellow-400 transition-colors duration-200`}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
      );
    }

    return (
      <InputText
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
        className={baseClasses}
      />
    );
  };

  return (
    <div className="w-full mb-6">
      <FloatLabel>
        {renderInput()}
        <label
          htmlFor={name}
          className="text-gray-400 transition-all duration-200 peer-focus:text-yellow-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
        >
          {label}
        </label>
      </FloatLabel>
    </div>
  );
};

export default CustomInput;
