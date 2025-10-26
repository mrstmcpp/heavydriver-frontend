import React, { useEffect } from "react";
import { useLocationStore } from "../../hooks/useLocationStore";
import gpsIcon from "../../assets/gps.png";

const CurrentLocationButton = ({ onLocationFound }) => {
  const { location, error, getLocation } = useLocationStore();

  useEffect(() => {
    if (location && onLocationFound) {
      onLocationFound(location);
    }
  }, [location, onLocationFound]);

  return (
    <div className="absolute bottom-4 left-4 z-10 flex flex-col items-center">
      <button
        onClick={getLocation}
        className="bg-white rounded-full text-black p-1 shadow  transition"
      >
        <img src={gpsIcon} alt="Your Location" className="inline-block  cursor-pointer" />
      </button>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default CurrentLocationButton;