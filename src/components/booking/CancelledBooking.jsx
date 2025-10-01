import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PageTopBanner } from "../PageTopBanner";

const CancelledRide = () => {
  const { bookingId } = useParams();
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BOOKING_BACKEND_URL}/booking/${bookingId}`
        );
        setRide(res.data);
        console.log("Cancelled Ride details:", res.data);
      } catch (err) {
        console.error("Error fetching cancelled ride:", err);
      }
    };

    fetchRide();
  }, [bookingId]);

  if (!ride) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-yellow-400 text-xl">
        Loading cancelled ride details...
      </div>
    );
  }

  const { driverName, driverId, bookingStatus, fare, paymentMode, startLocation, endLocation } = ride;

  return (
    <>
      <PageTopBanner section="Cancelled Ride" />
      <div className="bg-black text-white py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">


          <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6 mb-10 flex flex-col sm:flex-row gap-6 items-center">
            <img
              src={`/drivers/driver.png`}
              alt={driverName}
              className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover"
            />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lg">
                Status:{" "}
                <span className="font-semibold text-red-400">
                  {bookingStatus}
                </span>
              </p>
              <p className="text-2xl font-bold mt-2">{driverName}</p>
              <p className="text-sm text-gray-400 mt-1">
                🆔 Driver ID: {driverId}
              </p>
              <p className="text-sm text-gray-400">🚗 Car No: UP65 AB 1234</p>
            </div>
          </div>


          <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6 text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-700 pb-2 mb-4">
              Ride Summary
            </h3>
            <p className="mb-2">From: {startLocation?.latitude} ,  {startLocation?.longitude}</p>
            <p className="mb-2">To: {endLocation?.latitude} ,  {endLocation?.longitude}</p>
            <p className="mb-2">Ride was cancelled.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelledRide;
