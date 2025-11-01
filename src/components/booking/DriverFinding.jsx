import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";
import useNearbyDriversStore from "../../hooks/useNearbyDriversStore";
import useBookingStore from "../../hooks/useBookingStore";
import useAuthStore from "../../hooks/useAuthStore";
import { useSocket } from "../../context/SocketContext";
import MapComponent from "../maps/MapComponent";
import CarLoader from "../../resusables/CarLoader";
import userProfilePage from "../../assets/user.png";
import PageMeta from "../common/PageMeta";

const RETRY_COOLDOWN = 30; // ✅ cooldown time in seconds

const DriverFinding = () => {
  const navigate = useNavigate();
  const pageLocation = useLocation();
  const toast = useRef(null);
  const bookingId = pageLocation.state?.bookingId;
  const { authUser } = useAuthStore();
  const [searchParams] = useSearchParams();
  const { connected } = useSocket();
  const { drivers, fetchNearbyDrivers } = useNearbyDriversStore();
  const { setActiveBooking } = useBookingStore();

  const [ride, setRide] = useState(null);
  const [loadingRide, setLoadingRide] = useState(false);
  const [retryingDriver, setRetryingDriver] = useState(false);
  const [activeDriver, setActiveDriver] = useState(null);

  // ✅ NEW: Cooldown State
  const [retryCooldown, setRetryCooldown] = useState(0);

  const startLat = parseFloat(searchParams.get("startLat"));
  const startLng = parseFloat(searchParams.get("startLng"));

  // ✅ Load cooldown from localStorage on mount
  useEffect(() => {
    const savedTimestamp = localStorage.getItem(`retryTimestamp_${bookingId}`);
    if (savedTimestamp) {
      const diff = Math.floor((Date.now() - Number(savedTimestamp)) / 1000);
      if (diff < RETRY_COOLDOWN) {
        setRetryCooldown(RETRY_COOLDOWN - diff);
      } else {
        localStorage.removeItem(`retryTimestamp_${bookingId}`);
      }
    }
  }, [bookingId]);

  // ✅ Countdown interval
  useEffect(() => {
    if (retryCooldown <= 0) return;
    const interval = setInterval(() => {
      setRetryCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(`retryTimestamp_${bookingId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [retryCooldown, bookingId]);

  useEffect(() => {
    let interval;
    if (ride?.bookingStatus === "ASSIGNING_DRIVER" && startLat && startLng) {
      fetchNearbyDrivers(startLat, startLng);

      interval = setInterval(() => {
        fetchNearbyDrivers(startLat, startLng);
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [ride?.bookingStatus, startLat, startLng, fetchNearbyDrivers]);

  useEffect(() => {
    if (!bookingId) {
      toast.current?.show({
        severity: "warn",
        summary: "No Booking Found",
        detail: "Please create a new booking first.",
        life: 2500,
      });
      navigate("/rides/new", { replace: true });
    }
  }, [bookingId, navigate]);

  // Load booking details
  const fetchRideDetails = async () => {
    if (!bookingId || !authUser?.userId) return;
    try {
      setLoadingRide(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}/details/${bookingId}`,
        { userId: authUser.userId, role: "PASSENGER" },
        { withCredentials: true }
      );
      setRide(res.data);
    } catch (err) {
      console.error("Failed to fetch ride details:", err);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Unable to fetch ride details.",
        life: 3000,
      });
      navigate("/rides/new", { replace: true });
    } finally {
      setLoadingRide(false);
    }
  };

  useEffect(() => {
    fetchRideDetails();
  }, [bookingId, authUser]);

  // Handle socket-based driver assignment
  useEffect(() => {
    if (connected && ride?.bookingStatus === "SCHEDULED") {
      toast.current?.show({
        severity: "success",
        summary: "Driver Assigned!",
        detail: "Redirecting to your ride...",
        life: 2000,
      });
      setActiveBooking({
        bookingId,
        bookingStatus: "SCHEDULED",
      });
      setTimeout(() => navigate(`/rides/${bookingId}`), 2000);

      // ✅ Clear retry timestamp if driver assigned
      localStorage.removeItem(`retryTimestamp_${bookingId}`);
    }
  }, [connected, ride, bookingId, navigate, setActiveBooking]);

  // ✅ Retry handler with cooldown logic
  const handleRetryFindDriver = async () => {
    if (retryCooldown > 0) return; // extra protection

    try {
      setRetryingDriver(true);

      // ✅ Set new cooldown
      localStorage.setItem(`retryTimestamp_${bookingId}`, Date.now());
      setRetryCooldown(RETRY_COOLDOWN);

      const res = await axios.post(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}/${bookingId}/retry`,
        { passengerId: authUser.userId },
        { withCredentials: true }
      );
      setRide((prev) => ({
        ...prev,
        bookingStatus: res.data?.bookingStatus || prev.bookingStatus,
      }));

      toast.current?.show({
        severity: "info",
        summary: "Retrying",
        detail: "Attempting to find another driver...",
        life: 3000,
      });
    } catch (err) {
      console.error("Retry failed:", err);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to retry driver assignment.",
        life: 3000,
      });
    } finally {
      setRetryingDriver(false);
    }
  };

  const mapCenter = useMemo(() => {
    if (ride?.pickupLocation) {
      return {
        lat: ride.pickupLocation.latitude || startLat,
        lng: ride.pickupLocation.longitude || startLng,
      };
    }
    return { lat: 25.49249, lng: 81.85936 };
  }, [ride]);

  const isAssigning = ride?.bookingStatus === "ASSIGNING_DRIVER";
  const showLoader = loadingRide || retryingDriver;

  return (
    <>
      <PageMeta page={"driverFinding"} />
      <div className="relative flex flex-col items-center bg-[#0e0e0e] min-h-screen py-6 overflow-hidden">
        <Toast ref={toast} />

        {showLoader && (
          <div className="absolute inset-0 bg-black bg-opacity-85 flex items-center justify-center z-40">
            <CarLoader
              message={
                retryingDriver
                  ? "Retrying driver assignment..."
                  : "Loading ride details..."
              }
            />
          </div>
        )}

        <div className="w-[95%] max-w-7xl flex flex-col lg:flex-row gap-6">
          {ride && (
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
              <MapComponent
                center={mapCenter}
                zoom={15}
                height="75vh"
                origin
                drivers={drivers}
                activeDriver={activeDriver}
                showingYourRoute={true}
                onDriverMouseOver={(driverId) => setActiveDriver(driverId)}
                onDriverMouseOut={() => setActiveDriver(null)}
              />
            </div>
          )}

          {ride && !loadingRide && (
            <div className="flex-1 bg-[#141414] border border-gray-800 rounded-2xl shadow-xl p-6 text-gray-300 h-fit">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={userProfilePage}
                  alt={ride.driverName}
                  className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    {ride.bookingStatus === "COMPLETED" ? (
                      <i className="pi pi-check-circle text-green-400 text-lg" />
                    ) : (
                      <i className="pi pi-clock text-yellow-400 text-lg" />
                    )}
                    <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
                      {ride.bookingStatus}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                    {ride.driverName || "Driver Not Assigned Yet"}
                  </h2>

                  <p className="text-sm text-gray-400">
                    Vehicle:{" "}
                    <span className="text-white">
                      {ride.vehicleType || "—"} ({ride.vehicleNumber || "—"})
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Phone:{" "}
                    <span className="text-white">{ride.phoneNumber || "—"}</span>
                  </p>

                  {isAssigning && (
                    <div className="mt-4 flex justify-center sm:justify-start">
                      <button
                        onClick={handleRetryFindDriver}
                        disabled={retryCooldown > 0}
                        className={`flex items-center gap-2 py-2 px-5 rounded-full border transition-all ${
                          retryCooldown > 0
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                        }`}
                      >
                        {retryCooldown > 0 ? (
                          <>
                            ⏳ Retry in {retryCooldown}s
                          </>
                        ) : (
                          <>
                            <i className="pi pi-refresh" /> Retry Finding Driver
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-gray-800 pt-4 space-y-2">
                <p>
                  <span className="text-green-400 font-bold text-sm">Pickup:</span>{" "}
                  {ride.pickupLocation?.address || "N/A"}
                </p>
                <p>
                  <span className="text-red-400 font-bold text-sm">Dropoff:</span>{" "}
                  {ride.dropoffLocation?.address || "N/A"}
                </p>
                <p className="text-sm font-bold text-gray-400">
                  Payment Mode:{" "}
                  <span className="text-yellow-400 font-semibold">
                    {ride.paymentMode || "Cash"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DriverFinding;
