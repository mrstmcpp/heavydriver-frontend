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

const BookRide = () => {
  const { activeBooking } = useAuthStore();
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const { location, error, getLocation } = useLocationStore();
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    if (activeBooking) {
      navigate(`/ride/${activeBooking}`, { replace: true });
    }
  }, [activeBooking, navigate]);

  useEffect(() => {
    try {
      getLocation();
    } catch (error) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Failed to fetch location", life: 3000 });
      console.error("Error fetching location:", error);
    }
  }, []);

  const mapCenter = useMemo(() => {
  if (location?.latitude && location?.longitude) {
    return Object.freeze({ lat: location.latitude, lng: location.longitude });
  }
  return Object.freeze({ lat: 25.49249, lng: 81.85936 });
}, [location?.latitude, location?.longitude]);


  console.log(location);
  const handleLocationSelect = (coords) => {
    if (activeField === "start") {
      setStartLocation(coords);
    } else if (activeField === "end") {
      setEndLocation(coords);
    }
    setMapVisible(false);
  };

  const handleRouteCalculated = (results) => {
    if (results) {
      setDistance(results.distance);
      setDuration(results.duration);
    }
  };

  const openMapFor = (field) => {
    setActiveField(field);
    setMapVisible(true);
  };

  const handleBooking = async () => {
    if (!startLocation || !endLocation) {
      alert("Please fill all fields before booking.");
      return;
    }

    try {
      const passengerId = 1;
      await axios.post(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}/booking`,
        {
          passengerId,
          startLocation: {
            latitude: startLocation.lat,
            longitude: startLocation.lng,
          },
          endLocation: {
            latitude: endLocation.lat,
            longitude: endLocation.lng,
          },
        },
        { withCredentials: true }
      );

      navigate(`/driver-finding?startLat=${startLocation.lat}&startLng=${startLocation.lng}`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed, please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <PageTopBanner section="Book a Ride" />
      <Toast ref={toast} />

      <div className="max-w-3xl mx-auto bg-[#0f0f0f] p-8 rounded-2xl shadow-lg mt-10 mb-10 border border-gray-800">
        <h2 className="text-4xl font-bold mb-2 text-yellow-400">Book Your Taxi Ride!</h2>
        <p className="text-gray-400 mb-8">Choose your preferences and we'll find you the best ride.</p>

        <div className="space-y-8">
          <div>
            <label className="block text-sm mb-1 text-gray-400">Taxi Type</label>
            <select className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded px-4 py-3 focus:outline-none hover:border-yellow-400 transition">
              <option value="">Choose Taxi Type</option>
              <option value="mini">Auto</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div onClick={() => openMapFor("start")} className="cursor-pointer">
              <CustomInput
                label="Start Location"
                icon="pi pi-map-marker"
                value={startLocation ? `${startLocation.lat.toFixed(5)}, ${startLocation.lng.toFixed(5)}` : ""}
                readOnly
              />
            </div>
            <div onClick={() => openMapFor("end")} className="cursor-pointer">
              <CustomInput
                label="End Location"
                icon="pi pi-map-marker"
                value={endLocation ? `${endLocation.lat.toFixed(5)}, ${endLocation.lng.toFixed(5)}` : ""}
                readOnly
              />
            </div>
          </div>

          {startLocation && endLocation && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-700 pb-2">Your Route</h3>
              <div className="h-64 md:h-80 w-full">
                <MapComponent
                  origin={startLocation}
                  destination={endLocation}
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

          <div className="pt-2">
            <YellowButton onClick={handleBooking}>Create Booking</YellowButton>
          </div>
        </div>
      </div>

      <Dialog
        header={`Select Destination Location`}
        visible={mapVisible}
        maximizable
        style={{ width: "80vw", height: "80vh" }}
        onHide={() => setMapVisible(false)}
      >
        <MapComponent center={mapCenter} height="65vh" onLocationSelect={handleLocationSelect} showDirectionsUI={false} />
      </Dialog>
    </div>
  );
};

export default BookRide;
