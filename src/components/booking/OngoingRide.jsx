import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapComponent from "../maps/MapComponent";

const OngoingRide = () => {
  const { bookingId } = useParams();
  const [ride, setRide] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BOOKING_BACKEND_URL}/booking/${bookingId}`
        );
        setRide(res.data);
        console.log("Ride details:", res.data);
      } catch (err) {
        console.error("Error fetching ride:", err);
      }
    };

    fetchRide();
  }, [bookingId]);

  // ✅ Prevent infinite updates by checking before setting state
  const handleRouteCalculated = useCallback(
    (dist, time) => {
      if (dist !== distance || time !== duration) {
        setDistance(dist);
        setDuration(time);
      }
    },
    [distance, duration]
  );

  if (!ride) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-yellow-400 text-xl">
        Loading ride details...
      </div>
    );
  }

  const { bookingStatus, driverName, driverId, startLocation, endLocation } =
    ride;

  const mapCenter = {
    lat: (startLocation.latitude + endLocation.latitude) / 2,
    lng: (startLocation.longitude + endLocation.longitude) / 2,
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Ongoing Ride</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Ride Info */}
        <div className="lg:w-1/3 w-full space-y-6">
          <div className="bg-zinc-900 rounded-2xl shadow-lg p-4">
            <p className="text-lg">
              Status:{" "}
              <span className="font-semibold text-yellow-400">
                {bookingStatus}
              </span>
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl shadow-lg p-4 flex items-center gap-4">
            <img
              src={`/drivers/driver.png`}
              alt={driverName}
              className="w-20 h-20 rounded-full border-2 border-yellow-400"
            />
            <div>
              <p className="text-xl font-semibold">{driverName}</p>
              <p className="text-sm text-gray-400">🆔 Driver ID: {driverId}</p>
              <p className="text-sm text-gray-400">🚗 Car No: UP65 AB 1234</p>
            </div>
          </div>

          {/* Distance + Duration */}
          {distance && duration && (
            <div className="grid grid-cols-2 gap-4 text-center bg-[#1a1a1a] p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">Est. Distance</p>
                <p className="text-xl font-bold">{distance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Est. Time</p>
                <p className="text-xl font-bold">{duration}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right - Map */}
        <div className="lg:w-2/3 w-full">
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]">
            {startLocation && endLocation && (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                  Your Route
                </h3>
                <div className="h-64 md:h-80 w-full">
                  <MapComponent
                    origin={{
                      lat: startLocation.latitude,
                      lng: startLocation.longitude,
                    }}
                    destination={{
                      lat: endLocation.latitude,
                      lng: endLocation.longitude,
                    }}
                    onRouteCalculated={handleRouteCalculated}
                    center={mapCenter}
                    showDirectionsUI={false}
                    isInteractive={false}
                    height="100%"
                  />
                </div>

                {distance && duration && (
                  <div className="grid grid-cols-2 gap-4 text-center bg-[#1a1a1a] p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-400">Est. Distance</p>
                      <p className="text-xl font-bold">{distance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Est. Time</p>
                      <p className="text-xl font-bold">{duration}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingRide;
