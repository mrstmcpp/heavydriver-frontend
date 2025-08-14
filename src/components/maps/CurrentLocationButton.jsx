import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocationStore } from "../../hooks/useLocationStore";

const CurrentLocationButton = ({ onLocationFound }) => {
  const { location, error, getLocation } = useLocationStore();

  useEffect(() => {
    if (location && onLocationFound) {
      onLocationFound(location);
    }
  }, [location, onLocationFound]);

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col items-end">
      <button
        onClick={getLocation}
        className="bg-yellow-500 text-black px-3 py-1 rounded shadow hover:bg-yellow-400 transition"
      >
        📍 My Location
      </button>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default CurrentLocationButton;