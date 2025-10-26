import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PageTopBanner } from "../PageTopBanner";
import useAuthStore from "../../hooks/useAuthStore";

const CompletedRide = () => {
  const { userId, loading: authLoading } = useAuthStore();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    const fetchRide = async () => {
      setIsFetching(true);
      setError("");
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BOOKING_BACKEND_URL}/details/${bookingId}`,
          {
            userId,
            role: "PASSENGER",
          }
        );
        setRide(res.data);
      } catch (err) {
        console.error("Error fetching completed ride:", err);
        setError("Failed to load ride details. Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };

    if (bookingId && userId) fetchRide();
  }, [bookingId, userId, authLoading]);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-yellow-400 text-xl animate-pulse">
        <i className="pi pi-spin pi-spinner text-2xl mr-3" />
        Loading your completed ride...
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
        No completed ride found.
      </div>
    );
  }

  const {
    driverName,
    driverId,
    bookingStatus,
    fare,
    paymentMode,
    pickupLocation,
    dropoffLocation,
  } = ride;

  return (
    <>
      <PageTopBanner section="Completed Ride" />
      <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white min-h-screen py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 🚗 Driver Info */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:scale-[1.02] transition-transform">
            <img
              src="/drivers/driver.png"
              alt={driverName}
              className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover shadow-lg"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                {bookingStatus === "COMPLETED" ? (
                  <i className="pi pi-check-circle text-green-400 text-xl" />
                ) : (
                  <i className="pi pi-exclamation-circle text-yellow-400 text-xl" />
                )}
                <span
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    bookingStatus === "COMPLETED"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {bookingStatus}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-yellow-400 mb-1">
                {driverName}
              </h2>
              <p className="text-gray-400 text-sm mb-1">
                🆔 <span className="font-mono">{driverId}</span>
              </p>
              <p className="text-gray-400 text-sm">🚗 Car No: UP65 AB 1234</p>
            </div>
          </div>

          {/* 📝 Ride Summary */}
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
                  {pickupLocation?.address || "N/A"}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <i className="pi pi-map-marker text-red-400 text-lg mt-1" />
                <p>
                  <span className="font-semibold text-white">To:</span>{" "}
                  {dropoffLocation?.address || "N/A"}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-700 pt-4 mt-4">
                <div>
                  <p className="text-gray-400 text-sm">Fare</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₹{fare || "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Payment Mode</p>
                  <p className="text-lg font-semibold flex items-center justify-end gap-2 text-yellow-400">
                    <i className="pi pi-credit-card" />
                    {paymentMode || "Cash"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                <i className="pi pi-check-circle text-lg" />
                Ride Completed Successfully 🎉
              </p>
            </div>
          </div>

          {/* ✅ CTA Buttons */}
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

export default CompletedRide;
