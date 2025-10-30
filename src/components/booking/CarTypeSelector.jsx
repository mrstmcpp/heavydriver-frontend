import React from "react";

const carTypes = [
  { value: "SEDAN", label: "Sedan" },
  { value: "AUTO", label: "AUTO" },
];

const CarTypeSelector = ({ carType, setCarType }) => {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-400">Taxi Type</label>
      <select
        className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded px-4 py-3 focus:outline-none hover:border-yellow-400 transition"
        value={carType}
        onChange={(e) => setCarType(e.target.value)}
      >
        <option value="">Choose Taxi Type</option>
        {carTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CarTypeSelector;
