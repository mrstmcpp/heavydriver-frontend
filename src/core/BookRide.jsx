import React, { useState } from "react";
import { PageTopBanner } from "../components/PageTopBanner";
import YellowButton from "../resusables/YellowButton";
import CustomInput from "../resusables/CustomInput";

const BookRide = () => {
  const [rideType, setRideType] = useState("single");

  return (
    <div className="bg-black min-h-screen text-white">
      <PageTopBanner section="Book a Ride" />

      <div className="max-w-3xl mx-auto bg-[#0f0f0f] p-8 rounded-2xl shadow-lg mt-10 mb-10 border border-gray-800">
        <h2 className="text-4xl font-bold mb-2 text-yellow-400">Book Your Taxi Ride!</h2>
        <p className="text-gray-400 mb-8">
          Choose your preferences and we'll find you the best ride.
        </p>

        <div className="space-y-8">
          {/* Taxi Type Dropdown */}
          <div>
            <label className="block text-sm mb-1 text-gray-400">Taxi Type</label>
            <select className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded px-4 py-3 focus:outline-none hover:border-yellow-400 transition">
              <option value="">Choose Taxi Type</option>
              <option value="mini">Mini</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
            </select>
          </div>

          {/* Start and End Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomInput label="Start Location" icon="pi pi-map-marker" />
            <CustomInput label="End Location" icon="pi pi-map-marker" />
          </div>

          {/* Ride Type Toggle */}
          <div>
            <label className="block text-sm text-gray-400">Ride Type</label>
            <div className="flex border border-gray-700 rounded overflow-hidden">
              <button
                onClick={() => setRideType("single")}
                className={`w-1/2 py-3 font-semibold transition duration-200 ${
                  rideType === "single"
                    ? "bg-yellow-400 text-black"
                    : "bg-[#1a1a1a] text-white hover:bg-gray-800"
                }`}
              >
                Single
              </button>
              <button
                onClick={() => setRideType("family")}
                className={`w-1/2 py-3 font-semibold transition duration-200 ${
                  rideType === "family"
                    ? "bg-yellow-400 text-black"
                    : "bg-[#1a1a1a] text-white hover:bg-gray-800"
                }`}
              >
                Family
              </button>
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomInput label="Full Name" icon="pi pi-user" />
            <CustomInput type="email" label="Email Address" icon="pi pi-envelope" />
          </div>

          {/* Phone */}
          <CustomInput label="Phone Number" icon="pi pi-phone" />

          {/* Submit Button */}
          <div className="pt-2">
            <YellowButton onClick={() => console.log("Taxi booking submitted!")}>
              Find a Taxi
            </YellowButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
