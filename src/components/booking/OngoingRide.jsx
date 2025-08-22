import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OngoingRide = () => {
  const { bookingId } = useParams();
  const [ride, setRide] = useState(null);
  

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BOOKING_BACKEND_URL}/booking/${bookingId}`
        );
        setRide(res.data);
      } catch (err) {
        console.error("Error fetching ride:", err);
      }
    };

    fetchRide();
  }, [bookingId]);

  if (!ride) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-yellow-400 text-xl">
        Loading ride details...
      </div>
    );
  }

  const { bookingStatus, driverName, driverId, startLocation, endLocation } = ride;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Ongoing Ride</h2>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side - Ride Details */}
        <div className="lg:w-1/3 w-full space-y-6">
          {/* Ride Status */}
          <div className="bg-zinc-900 rounded-2xl shadow-lg p-4">
            <p className="text-lg">
              Status:{" "}
              <span className="font-semibold text-yellow-400">{bookingStatus}</span>
            </p>
          </div>

          {/* Driver Info */}
          <div className="bg-zinc-900 rounded-2xl shadow-lg p-4 flex items-center gap-4">
            <img
              src={`/drivers/driver.png`}
              alt={driverName}
              className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-yellow-400"
            />
            <div>
              <p className="text-xl font-semibold">{driverName}</p>
              <p className="text-sm text-gray-400">🆔 Driver ID: {driverId}</p>
              <p className="text-sm text-gray-400">🚗 Car No: UP65 AB 1234</p>
            </div>
          </div>

          {/* Reviews (Dummy Data) */}
          <div className="bg-zinc-900 rounded-2xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Reviews</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>⭐ Great driver, smooth ride.</li>
              <li>⭐ Very polite and professional.</li>
              <li>⭐ Reached on time, clean vehicle.</li>
            </ul>
          </div>

          {/* Ride Locations */}
          <div className="bg-zinc-900 rounded-2xl shadow-lg p-4">
            <p className="mb-2">
              <span className="text-yellow-400">Start:</span>{" "}
              {startLocation.latitude}, {startLocation.longitude}
            </p>
            <p>
              <span className="text-yellow-400">End:</span>{" "}
              {endLocation.latitude}, {endLocation.longitude}
            </p>
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="lg:w-2/3 w-full">
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]">
            <MapContainer
              center={[startLocation.latitude, startLocation.longitude]}
              zoom={6}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* Start Marker */}
              <Marker position={[startLocation.latitude, startLocation.longitude]} />

              {/* End Marker */}
              <Marker position={[endLocation.latitude, endLocation.longitude]} />

              {/* Route Line */}
              <Polyline
                positions={[
                  [startLocation.latitude, startLocation.longitude],
                  [endLocation.latitude, endLocation.longitude],
                ]}
                color="yellow"
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingRide;
