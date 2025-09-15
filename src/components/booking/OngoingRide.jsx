import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapComponent from "../maps/MapComponent";
import { PageTopBanner } from "../PageTopBanner";

const OngoingRide = () => {
  const { bookingId } = useParams();
  const [ride, setRide] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    //TODO: if user dont have active booking , he should not accesss this page
    const fetchRide = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BOOKING_BACKEND_URL}/booking/${bookingId}`
        );
        setRide(res.data);

        if (res.data.bookingStatus === "COMPLETED") {
          window.location.href = `/ride/completed/${bookingId}`;
          return;
        }
        // Log the ride details for debugging
        console.log("Ride details:", res.data);
      } catch (err) {
        console.error("Error fetching ride:", err);
      }
    };

    fetchRide();
  }, [bookingId]);

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
    <>
      <PageTopBanner section="Ongoing Ride" />
      <div className="bg-black text-white py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          {/* <h2 className="text-3xl font-bold text-yellow-400 mb-10 text-center">
          Ride Details
        </h2> */}

          {/* Driver Details Card */}
          <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6 mb-10 flex flex-col sm:flex-row gap-6 items-center">
            <img
              src={`/drivers/driver.png`}
              alt={driverName}
              className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover"
            />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lg">
                Status:{" "}
                <span className="font-semibold text-yellow-400">
                  {bookingStatus}
                </span>
              </p>
              <p className="text-2xl font-bold mt-2">{driverName}</p>
              <p className="text-sm text-gray-400 mt-1">
                🆔 Driver ID: {driverId}
              </p>
              <p className="text-sm text-gray-400">🚗 Car No: UP65 AB 1234</p>
            </div>

            {distance && duration && (
              <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6 grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-400">Est. Distance</p>
                  <p className="text-2xl font-bold">{distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Est. Time</p>
                  <p className="text-2xl font-bold">{duration}</p>
                </div>
              </div>
            )}
          </div>

          {/* OTP Section */}
          <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-8 mb-10 text-center">
            <p className="text-lg text-gray-400 mb-2">Ride OTP</p>
            <p className="text-5xl font-extrabold tracking-widest text-yellow-400">
              {ride.otp}
            </p>
          </div>

          {/* Distance & Duration Card */}

          {/* Map Card */}
          <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-700 pb-2 mb-4">
              Your Route
            </h3>
            <div className="w-full rounded-xl overflow-hidden">
              {startLocation &&
                endLocation &&
                (console.log(
                  "Rendering Map with locations:",
                  startLocation,
                  endLocation
                ),
                (
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
                    height="600px"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngoingRide;
