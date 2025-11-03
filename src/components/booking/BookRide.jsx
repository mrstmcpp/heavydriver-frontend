import React, { useState, useMemo, useEffect, useRef } from "react";
import { PageTopBanner } from "../PageTopBanner";
import YellowButton from "../../resusables/YellowButton";
import CustomInput from "../../resusables/CustomInput";
import MapComponent from "../maps/MapComponent";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocationStore } from "../../hooks/useLocationStore";
import { Toast } from "primereact/toast";
import useAuthStore from "../../hooks/useAuthStore";
import useBookingStore from "../../hooks/useBookingStore";
import CarTypeSelector from "./CarTypeSelector";
import CarLoader from "../../resusables/CarLoader";
import PageMeta from "../common/PageMeta";

const BookRide = () => {
  const { userId } = useAuthStore();
  const { activeBooking, loadingBooking } = useBookingStore();

  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [carType, setCarType] = useState("");
  const [fareDetails, setFareDetails] = useState(null);
  const [fetchingFare, setFetchingFare] = useState(false);

  const { location, watchUserLocation, stopWatchingUserLocation } =
    useLocationStore();

  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    if (!loadingBooking && activeBooking) {
      navigate(`/rides/${activeBooking}`, { replace: true });
    }
  }, [activeBooking, navigate, loadingBooking]);

  useEffect(() => {
    watchUserLocation();
    return () => stopWatchingUserLocation();
  }, [watchUserLocation, stopWatchingUserLocation]);

  const mapCenter = useMemo(() => {
    if (location?.lat && location?.lng) {
      return Object.freeze({ lat: location.lat, lng: location.lng });
    }
    return Object.freeze({ lat: 25.49249, lng: 81.85936 });
  }, [location]);

  const handleLocationSelect = (coords) => {
    if (activeField === "start") {
      setStartLocation(coords);
      setStartAddress("Start location selected");
    } else if (activeField === "end") {
      setEndLocation(coords);
      setEndAddress("End location selected");
    }
    setMapVisible(false);
  };

  const openMapFor = (field) => {
    setActiveField(field);
    setMapVisible(true);
  };

  const fetchFareEstimate = async () => {
    if (!startLocation || !endLocation || !carType) {
      toast.current?.show({
        severity: "warn",
        summary: "Incomplete Data",
        detail: "Please select start, end, and car type first.",
      });
      return;
    }

    try {
      setFetchingFare(true);
      setFareDetails(null);

      const payload = {
        startLocation: {
          latitude: Number(startLocation.lat),
          longitude: Number(startLocation.lng),
        },
        endLocation: {
          latitude: Number(endLocation.lat),
          longitude: Number(endLocation.lng),
        },
        carType: carType.toUpperCase(),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}/fare/estimate`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      const { distance, duration, fare, startAddress, endAddress } =
        response.data;

      setFareDetails({ distance, duration, fare });
      setStartAddress(startAddress);
      setEndAddress(endAddress);

      toast.current?.show({
        severity: "success",
        summary: "Fare Estimated",
        detail: "Fare details fetched successfully!",
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail:
          error?.response?.data?.message ||
          "Failed to fetch fare estimate. Check console for details.",
      });
    } finally {
      setFetchingFare(false);
    }
  };

  useEffect(() => {
    setFareDetails(null);
  }, [startLocation, endLocation, carType]);

  const handleBooking = async () => {
    if (!startLocation || !endLocation || !fareDetails) {
      alert("Please get fare estimate before booking.");
      return;
    }

    try {
      const passengerId = userId;
      const idempotencyKey = crypto.randomUUID();

      const res = await axios.post(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}`,
        {
          passengerId,
          startLocation: {
            latitude: startLocation.lat,
            longitude: startLocation.lng,
            address: startAddress,
          },
          endLocation: {
            latitude: endLocation.lat,
            longitude: endLocation.lng,
            address: endAddress,
          },
          carType,
        },
        {
          withCredentials: true,
          headers: {
            "Idempotency-Key": idempotencyKey,
            "Content-Type": "application/json",
          },
        }
      );

      const bookingId = res.data?.bookingId;
      if (!bookingId) {
        throw new Error("No booking ID returned from server.");
      }

      navigate(
        `/driver-finding?startLat=${startLocation.lat}&startLng=${startLocation.lng}`,
        {
          state: { bookingId },
        }
      );
    } catch (error) {
      alert("Booking failed, please try again.");
    }
  };

  return (
    <>
      <PageMeta page={"bookRide"} />
      <PageTopBanner section="Book a Ride" />
      <Toast ref={toast} />
      <div className="m-4">

        {fetchingFare && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
            <CarLoader message="Loading fare estimate" />
          </div>
        )}

        <div className="max-w-3xl mx-auto bg-[#0f0f0f] p-8 rounded-2xl shadow-lg mt-10 mb-10 border border-gray-800 relative z-10">
          <h2 className="text-4xl font-bold mb-2 text-yellow-400">
            Book Your Ride!
          </h2>
          <p className="text-gray-400 mb-8">
            Choose your preferences and we'll find you the best ride.
          </p>

          <div className="space-y-8">
            <div className="w-full">
              <CarTypeSelector carType={carType} setCarType={setCarType} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => openMapFor("start")}
                className="cursor-pointer"
              >
                <CustomInput
                  label="Start Location"
                  icon="pi pi-map-marker"
                  value={startAddress || ""}
                  readOnly
                />
              </div>
              <div onClick={() => openMapFor("end")} className="cursor-pointer">
                <CustomInput
                  label="End Location"
                  icon="pi pi-map-marker"
                  value={endAddress || ""}
                  readOnly
                />
              </div>
            </div>

            {fareDetails && (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                  Ride Estimate
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center bg-[#1a1a1a] p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-400">Pickup Address</p>
                    <p className="text-xl font-bold">{startAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Drop-off Address</p>
                    <p className="text-xl font-bold">{endAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Est. Distance</p>
                    <p className="text-xl font-bold">
                      {fareDetails.distance} km
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Est. Time</p>
                    <p className="text-xl font-bold">
                      {fareDetails.duration} min
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-400">Est. Fare</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      ₹{fareDetails.fare.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic text-center mt-2">
                  *Note: The estimated fare may vary based on traffic, route
                  changes, and waiting time.*
                </p>
              </div>
            )}

            {startLocation && endLocation && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                  Route Preview
                </h3>
                <div className="h-64 md:h-80 w-full mt-3 rounded-lg overflow-hidden">
                  <MapComponent
                    origin={startLocation}
                    destination={endLocation}
                    center={startLocation}
                    showDirectionsUI={false}
                    isInteractive={false}
                    height="100%"
                    showingYourRoute={true}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <YellowButton
                onClick={fetchFareEstimate}
                disabled={
                  !startLocation || !endLocation || !carType || fetchingFare
                }
              >
                {fetchingFare ? "Fetching Fare..." : "Get Fare Estimate"}
              </YellowButton>

              <YellowButton
                onClick={handleBooking}
                disabled={!fareDetails || fetchingFare}
              >
                Create Booking
              </YellowButton>
            </div>
          </div>
        </div>

        <Dialog
          header={`Select ${
            activeField === "start" ? "Start" : "Destination"
          } Location`}
          visible={mapVisible}
          maximizable
          style={{ width: "80vw", height: "80vh" }}
          onHide={() => setMapVisible(false)}
        >
          <MapComponent
            center={mapCenter}
            height="65vh"
            onLocationSelect={handleLocationSelect}
            showDirectionsUI={true}
          />
        </Dialog>
      </div>
    </>
  );
};

export default BookRide;
