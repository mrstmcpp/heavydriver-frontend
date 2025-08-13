import React, { useState } from "react";
import { PageTopBanner } from "../components/PageTopBanner";
import YellowButton from "../resusables/YellowButton";
import CustomInput from "../resusables/CustomInput";
import MapComponent from "../components/maps/MapComponent";
import { Dialog } from "primereact/dialog";
const BookRide = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [activeField, setActiveField] = useState(null); // "start" | "end"

  const handleLocationSelect = (coords) => {
    const formatted = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
    if (activeField === "start") {
      setStartLocation(formatted);
    } else if (activeField === "end") {
      setEndLocation(formatted);
    }
    setMapVisible(false); // close dialog
  };

  const openMapFor = (field) => {
    setActiveField(field);
    setMapVisible(true);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <PageTopBanner section="Book a Ride" />

      <div className="max-w-3xl mx-auto bg-[#0f0f0f] p-8 rounded-2xl shadow-lg mt-10 mb-10 border border-gray-800">
        <h2 className="text-4xl font-bold mb-2 text-yellow-400">Book Your Taxi Ride!</h2>
        <p className="text-gray-400 mb-8">
          Choose your preferences and we'll find you the best ride.
        </p>

        <div className="space-y-8">
          {/* Taxi Type */}
          <div>
            <label className="block text-sm mb-1 text-gray-400">Taxi Type</label>
            <select className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded px-4 py-3 focus:outline-none hover:border-yellow-400 transition">
              <option value="">Choose Taxi Type</option>
              <option value="mini">Mini</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
            </select>
          </div>

          {/* Start & End Location */}
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

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomInput label="Full Name" icon="pi pi-user" />
            <CustomInput type="email" label="Email Address" icon="pi pi-envelope" />
          </div>

          {/* Phone */}
          <CustomInput label="Phone Number" icon="pi pi-phone" />

          {/* Button */}
          <div className="pt-2">
            <YellowButton onClick={() => console.log("Taxi booking submitted!")}>
              Find a Taxi
            </YellowButton>
          </div>
        </div>
      </div>

      {/* Map Dialog */}
      <Dialog
        header={`Select ${activeField === "start" ? "Start" : "End"} Location`}
        visible={mapVisible}
        maximizable
        style={{ width: "80vw" }}
        onHide={() => setMapVisible(false)}
      >
        <MapComponent
          center={{ lat: 25.492683, lng: 81.8642 }}
          zoom={14}
          height="500px"
          onLocationSelect={handleLocationSelect}
        />
      </Dialog>
    </div>
  );
};

export default BookRide;