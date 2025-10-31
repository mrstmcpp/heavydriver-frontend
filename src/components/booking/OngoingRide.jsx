import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MapComponent from "../maps/MapComponent";
import { PageTopBanner } from "../PageTopBanner";
import useAuthStore from "../../hooks/useAuthStore";
import useBookingStore from "../../hooks/useBookingStore";
import { useToast } from "../../context/ToastContext";
import PageMeta from "../common/PageMeta";

const OngoingRide = () => {
  const { bookingId: bookingIdParam } = useParams();
  const { loading: authLoading, userId } = useAuthStore();
  const { activeBooking, loadingBooking, driverLocation } = useBookingStore();
  const [ride, setRide] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const bookingIdToUse = activeBooking?.bookingId || bookingIdParam;
  const bookingStatusFromStore = activeBooking?.bookingStatus;

  useEffect(() => {
    if (authLoading || loadingBooking) return;

    if (bookingStatusFromStore === "COMPLETED") {
      if (bookingIdToUse) navigate(`/rides/${bookingIdToUse}/details`);
      else navigate("/");
      return;
    }
    if (bookingStatusFromStore === "CANCELLED") {
      if (bookingIdToUse) navigate(`/rides/${bookingIdToUse}/details`);
      else navigate("/");
      return;
    }

    // require a booking id to fetch
    if (!bookingIdToUse) {
      // no booking send them away
      navigate("/");
      return;
    }

    let cancelled = false;
    const fetchRide = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BOOKING_BACKEND_URL}/details/${bookingIdToUse}`,
          {
            userId,
            role: "PASSENGER",
          }
        );

        if (cancelled) return;

        const data = res.data;
        setRide(data);

        if (data.bookingStatus === "COMPLETED") {
          navigate(`/rides/${bookingIdToUse}/details`);
          return;
        }
        if (data.bookingStatus === "CANCELLED") {
          navigate(`/rides/${bookingIdToUse}/details`);
          return;
        }
      } catch (err) {
        showToast({
          severity: "error",
          summary: "Error",
          detail:
            err.response?.data?.error || "Failed to fetch ongoing ride details.",
        });
        navigate("/");
      }
    };

    fetchRide();

    return () => {
      cancelled = true;
    };
  }, [
    bookingIdToUse,
    activeBooking,
    bookingStatusFromStore,
    authLoading,
    loadingBooking,
    userId,
    navigate,
    showToast,
  ]);

  const handleRouteCalculated = useCallback((dist, time) => {
    setDistance((prev) => (prev !== dist ? dist : prev));
    setDuration((prev) => (prev !== time ? time : prev));
  }, []);

  if (!ride) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-yellow-400 text-xl">
        Loading ride details...
      </div>
    );
  }

  const {
    bookingStatus,
    driverName,
    driverId,
    pickupLocation,
    dropoffLocation,
  } = ride;

  const mapCenter =
    pickupLocation && dropoffLocation
      ? {
          lat: (pickupLocation.latitude + dropoffLocation.latitude) / 2,
          lng: (pickupLocation.longitude + dropoffLocation.longitude) / 2,
        }
      : null;

  return (
    <>
    <PageMeta page={"activeRide"} />
      <PageTopBanner section="Ongoing Ride" />
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
                <span className="font-semibold text-yellow-400">
                  {bookingStatus}
                </span>
              </p>
              <p className="text-2xl font-bold mt-2">{driverName}</p>
              <p className="text-sm text-gray-400 mt-1">🆔 Driver ID: {driverId}</p>
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

          <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-8 mb-10 text-center">
            <p className="text-lg text-gray-400 mb-2">Ride OTP</p>
            <p className="text-5xl font-extrabold tracking-widest text-yellow-400">
              {ride.otp}
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-700 pb-2 mb-4">
              Your Route
            </h3>
            <div className="w-full rounded-xl overflow-hidden">
              {pickupLocation && dropoffLocation && mapCenter ? (
                <MapComponent
                  origin={{
                    lat: pickupLocation.latitude,
                    lng: pickupLocation.longitude,
                  }}
                  destination={{
                    lat: dropoffLocation.latitude,
                    lng: dropoffLocation.longitude,
                  }}
                  driverLocation={driverLocation}
                  onRouteCalculated={handleRouteCalculated}
                  center={mapCenter}
                  showDirectionsUI={false}
                  isInteractive={false}
                  height="600px"
                  showingYourRoute={true}
                />
              ) : (
                <div className="p-8 text-center text-gray-400">
                  Route unavailable — pickup or dropoff location missing.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngoingRide;
