import React, { useState, useMemo } from "react";
import { PageTopBanner } from "../PageTopBanner";
import YellowButton from "../../resusables/YellowButton";
import CustomInput from "../../resusables/CustomInput";
import MapComponent from "../maps/MapComponent";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookRide = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const navigate = useNavigate();

  // Default center for the map


  const mapCenter = useMemo(() => ({ lat: 26.8467, lng: 80.9462 }), []);

  const handleLocationSelect = (coords) => {
    const formatted = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
    if (activeField === "start") {
      setStartLocation(formatted);
    } else if (activeField === "end") {
      setEndLocation(formatted);
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

  // ${import.meta.env.VITE_BOOKING_BACKEND_URL}/api/v1/booking

  const handleBooking = async () => {
    if (!startLocation || !endLocation) {
      alert("Please fill all fields before booking.");
      return;
    }

    const [startLat, startLng] = startLocation.split(",").map(Number);
    const [endLat, endLng] = endLocation.split(",").map(Number);

    try {
      const passengerId = 1;

      await axios.post(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}/booking`,
        {
          passengerId,
          startLocation: {
            latitude: startLat,
            longitude: startLng,
          },
          endLocation: {
            latitude: endLat,
            longitude: endLng,
          },
        },
        { withCredentials: true }
      );

      navigate(`/driver-finding?startLat=${startLat}&startLng=${startLng}`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed, please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <PageTopBanner section="Book a Ride" />

      <div className="max-w-3xl mx-auto bg-[#0f0f0f] p-8 rounded-2xl shadow-lg mt-10 mb-10 border border-gray-800">
        <h2 className="text-4xl font-bold mb-2 text-yellow-400">
          Book Your Taxi Ride!
        </h2>
        <p className="text-gray-400 mb-8">
          Choose your preferences and we'll find you the best ride.
        </p>

        <div className="space-y-8">
          <div>
            <label className="block text-sm mb-1 text-gray-400">
              Taxi Type
            </label>
            <select className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded px-4 py-3 focus:outline-none hover:border-yellow-400 transition">
              <option value="">Choose Taxi Type</option>
              <option value="mini">Mini</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div onClick={() => openMapFor("start")} className="cursor-pointer">
              <CustomInput
                label="Start Location"
                icon="pi pi-map-marker"
                value={startLocation}
                readOnly
              />
            </div>
            <div onClick={() => openMapFor("end")} className="cursor-pointer">
              <CustomInput
                label="End Location"
                icon="pi pi-map-marker"
                value={endLocation}
                readOnly
              />
            </div>
          </div>

          {startLocation && endLocation && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                Your Route
              </h3>
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
        header={`Select ${activeField === "start" ? "Start" : "End"} Location`}
        visible={mapVisible}
        maximizable
        style={{ width: "80vw", height: "80vh" }}
        onHide={() => setMapVisible(false)}
      >
        <MapComponent
          center={mapCenter}
          height="65vh"
          onLocationSelect={handleLocationSelect}
          showDirectionsUI={false}
        />
      </Dialog>
    </div>
  );
};

export default BookRide;
