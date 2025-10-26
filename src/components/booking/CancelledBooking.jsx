import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PageTopBanner } from "../PageTopBanner";

const CancelledRide = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRide = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BOOKING_BACKEND_URL}/details/${bookingId}`
        );
        setRide(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching cancelled ride:", err);
        setError("Failed to fetch cancelled ride details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-yellow-400 text-xl animate-pulse">
        <i className="pi pi-spin pi-spinner text-2xl mr-3" />
        Loading cancelled ride details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500 text-lg font-medium">
        <i className="pi pi-exclamation-triangle mr-2" />
        {error}
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-yellow-400 text-xl">
        <i className="pi pi-info-circle mr-2" />
        No cancelled ride found.
      </div>
    );
  }

  const {
    driverName,
    driverId,
    bookingStatus,
    startLocation,
    endLocation,
  } = ride;

  return (
    <>
      <PageTopBanner section="Cancelled Ride" />
      <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white min-h-screen py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 🚗 Driver Info Card */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:scale-[1.02] transition-transform">
            <img
              src="/drivers/driver.png"
              alt={driverName}
              className="w-28 h-28 rounded-full border-4 border-red-500 object-cover shadow-lg"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <i className="pi pi-times-circle text-red-400 text-xl" />
                <span className="text-sm font-semibold uppercase tracking-wider text-red-400">
                  {bookingStatus || "CANCELLED"}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-1">
                {driverName || "Unknown Driver"}
              </h2>
              <p className="text-gray-400 text-sm mb-1">
                🆔 <span className="font-mono">{driverId || "N/A"}</span>
              </p>
              <p className="text-gray-400 text-sm">🚗 Car No: UP65 AB 1234</p>
            </div>
          </div>

          {/* 📋 Ride Summary */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-800 pb-3 mb-5 flex items-center gap-2">
              <i className="pi pi-map-marker text-yellow-400 text-xl" />
              Ride Summary
            </h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <i className="pi pi-map-marker text-green-400 text-lg mt-1" />
                <p>
                  <span className="font-semibold text-white">From:</span>{" "}
                  {startLocation
                    ? `${startLocation.latitude}, ${startLocation.longitude}`
                    : "N/A"}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <i className="pi pi-map-marker text-red-400 text-lg mt-1" />
                <p>
                  <span className="font-semibold text-white">To:</span>{" "}
                  {endLocation
                    ? `${endLocation.latitude}, ${endLocation.longitude}`
                    : "N/A"}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-6 text-center justify-center">
                <i className="pi pi-times-circle text-red-400 text-xl" />
                <p className="text-red-400 font-semibold">
                  This ride was cancelled.
                </p>
              </div>
            </div>
          </div>

          {/* 🚀 CTA Buttons */}
          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/rides/new")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
            >
              <i className="pi pi-car" />
              Book Another Ride
            </button>

            <button
              onClick={() => navigate("/rides/history")}
              className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-3 px-8 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
            >
              <i className="pi pi-history" />
              View Ride History
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelledRide;
