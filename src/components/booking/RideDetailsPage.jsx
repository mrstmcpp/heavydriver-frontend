import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../hooks/useAuthStore";
import userProfilePage from "../../assets/user.png";
import { PageTopBanner } from "../PageTopBanner";
import PageMeta from "../common/PageMeta";
import MapComponent from "../maps/MapComponent";

const PassengerRideDetails = () => {
  const { authUser, loading: authLoading } = useAuthStore();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [startLocation, setStartLocation] = useState("");

  useEffect(() => {
    if (authLoading) return;

    const fetchRideDetails = async () => {
      setIsFetching(true);
      setError("");

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BOOKING_BACKEND_URL}/details/${bookingId}`,
          {
            userId: authUser.userId,
            role: "PASSENGER",
          },
          { withCredentials: true }
        );

        setRide(res.data);
        setStartLocation(res.data.pickupLocation);
        console.log("Passenger ride details fetched:", res.data);
      } catch (err) {
        console.error("Error fetching ride details:", err);
        setError(err.response?.data?.error || "Failed to fetch ride details");
        navigate("/rides/all");
      } finally {
        setIsFetching(false);
      }
    };

    if (bookingId && authUser?.userId) fetchRideDetails();
  }, [bookingId, authUser, authLoading]);

  const handleRetryFindDriver = async () => {
    try {
      setIsFetching(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}/${bookingId}/retry`,
        { passengerId: authUser.userId },
        { withCredentials: true }
      );

      console.log("Retry driver assignment response:", res.data);
      setRide((prev) => ({
        ...prev,
        bookingStatus: res.data?.bookingStatus || prev.bookingStatus,
      }));

      navigate(
        `/driver-finding?startLat=${startLocation.latitude}&startLng=${startLocation.longitude}`,
        {
          state: { bookingId },
        }
      );
    } catch (err) {
      console.error("Retry driver assignment failed:", err);
      setError(
        err.response?.data?.error || "Failed to retry driver assignment"
      );
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-yellow-400 text-xl animate-pulse">
        <i className="pi pi-spin pi-spinner text-2xl mr-3" />
        Loading ride details...
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
        No ride found.
      </div>
    );
  }

  const {
    driverName,
    driverPhone,
    vehicleType,
    vehicleNumber,
    bookingStatus,
    fare,
    paymentMode,
    pickupLocation,
    dropoffLocation,
    startTime,
    endTime,
    totalTimeTaken,
  } = ride;

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not available";
    return new Date(dateTime).toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const mapCenter =
    pickupLocation && dropoffLocation
      ? {
          lat: (pickupLocation.latitude + dropoffLocation.latitude) / 2,
          lng: (pickupLocation.longitude + dropoffLocation.longitude) / 2,
        }
      : null;
  return (
    <>
      <PageMeta page={"rideDetails"} />
      <PageTopBanner section="Ride Details" />

      <div className="bg-gray-900 text-yellow-400 flex justify-center">
        <div className="w-full max-w-6xl px-6 py-10 space-y-8">
          {/* DRIVER CARD */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:scale-[1.02] transition-transform">
            <img
              src={userProfilePage}
              alt={driverName}
              className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover shadow-lg"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                {bookingStatus === "COMPLETED" ? (
                  <i className="pi pi-check-circle text-green-400 text-xl" />
                ) : bookingStatus === "CANCELLED" ? (
                  <i className="pi pi-times-circle text-red-400 text-xl" />
                ) : (
                  <i className="pi pi-clock text-yellow-400 text-xl" />
                )}
                <span
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    bookingStatus === "COMPLETED"
                      ? "text-green-400"
                      : bookingStatus === "CANCELLED"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {bookingStatus}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                {driverName || "Driver Not Assigned Yet"}
              </h2>

              <div className="space-y-1 text-sm mb-4">
                <p>
                  <span className="font-semibold text-white">
                    Vehicle Type:
                  </span>{" "}
                  <span className="text-gray-400">{vehicleType || "—"}</span>
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Vehicle Number:
                  </span>{" "}
                  <span className="text-gray-400">{vehicleNumber || "—"}</span>
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Driver Phone:
                  </span>{" "}
                  <span className="text-gray-400">{driverPhone || "—"}</span>
                </p>
              </div>

              {/* Conditional Buttons */}
              {bookingStatus === "ASSIGNING_DRIVER" && (
                <div className="mt-2 flex justify-center sm:justify-start">
                  <button
                    onClick={handleRetryFindDriver}
                    disabled={isFetching}
                    className={`flex items-center gap-2 py-2 px-5 rounded-full shadow-md border transition-all ${
                      isFetching
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                    }`}
                  >
                    {isFetching ? (
                      <>
                        <i className="pi pi-spin pi-spinner" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <i className="pi pi-refresh" />
                        Retry Finding Driver
                      </>
                    )}
                  </button>
                </div>
              )}

              {bookingStatus === "ARRIVED" && (
                <div className="mt-3 flex justify-center sm:justify-start">
                  <button
                    onClick={() => navigate(`/rides/${bookingId}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <i className="pi pi-play" />
                    Go to Ongoing Ride
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Ride Summary */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-800 pb-3 mb-5 flex items-center gap-2">
              <i className="pi pi-map-marker text-yellow-400 text-xl" />
              Ride Summary
            </h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <i className="pi pi-map-marker text-green-400 text-lg mt-1" />
                <p>
                  <span className="font-semibold text-white">Pickup:</span>{" "}
                  {pickupLocation?.address || "N/A"}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <i className="pi pi-map-marker text-red-400 text-lg mt-1" />
                <p>
                  <span className="font-semibold text-white">Dropoff:</span>{" "}
                  {dropoffLocation?.address || "N/A"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-700 pt-4 mt-4">
                <div>
                  <p className="text-gray-400 text-sm">Start Time</p>
                  <p className="text-white font-medium">
                    {formatDateTime(startTime)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">End Time</p>
                  <p className="text-white font-medium">
                    {formatDateTime(endTime)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Time Taken</p>
                  <p className="text-yellow-400 font-semibold">
                    {totalTimeTaken || "Not available"}
                  </p>
                </div>
              </div>

              {/* Fare + Payment */}
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

            {bookingStatus === "COMPLETED" && (
              <div className="mt-6 text-center">
                <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-lg" />
                  Ride Completed Successfully
                </p>
              </div>
            )}

            <div className="text-center mt-6">
              <button
                onClick={() => setShowMap((prev) => !prev)}
                className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-2 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <i className="pi pi-map" />
                {showMap ? "Hide Map" : "See Location on Map"}
              </button>
            </div>

            {showMap && (
              <div className="mt-6 rounded-xl overflow-hidden border border-gray-800">
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
                <div className="p-8 text-center text-gray-500">
                  Map view coming soon...
                </div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/rides/new")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
            >
              <i className="pi pi-car" />
              Book Another Ride
            </button>

            <button
              onClick={() => navigate("/rides/all")}
              className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-3 px-8 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
            >
              <i className="pi pi-list" />
              View My Rides
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PassengerRideDetails;
