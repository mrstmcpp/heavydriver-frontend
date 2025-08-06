import React, { useState } from "react";
import { PageTopBanner } from "../components/PageTopBanner";
import YellowButton from "../resusables/YellowButton";
import CustomInput from "../resusables/CustomInput";

const BookRide = () => {
  const [rideType, setRideType] = useState("single");

  return (
    <div>
      <PageTopBanner section="Book a Ride" />
      <div className="max-w-3xl mx-auto bg-[#0f0f0f] text-white p-8 rounded shadow mt-10 mb-10">
        <h2 className="text-4xl font-bold mb-2">Book Your Taxi Ride!</h2>
        <p className="text-gray-400 mb-8">
          To get the ride of your taxi please select from the following:
        </p>

        <div className="space-y-4">
          {/* Taxi Type Dropdown */}
          <select className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded px-4 py-3 focus:outline-none">
            <option value="">Choose Taxi Type</option>
            <option value="mini">Mini</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
          </select>

          {/* Start and End Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomInput placeholder="Start Destination" icon="pi-map-marker" />
            <CustomInput placeholder="End Destination" icon="pi-map-marker" />
          </div>

          {/* Ride Type Toggle */}
          <div className="flex border border-gray-600 rounded overflow-hidden">
            <button
              onClick={() => setRideType("single")}
              className={`w-1/2 py-3 font-semibold transition ${
                rideType === "single"
                  ? "bg-yellow-400 text-black"
                  : "bg-[#1a1a1a] text-white"
              }`}
            >
              Single
            </button>
            <button
              onClick={() => setRideType("family")}
              className={`w-1/2 py-3 font-semibold transition ${
                rideType === "family"
                  ? "bg-yellow-400 text-black"
                  : "bg-[#1a1a1a] text-white"
              }`}
            >
              Family
            </button>
          </div>

          {/* Name, Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomInput placeholder="Complete Name" />
            <CustomInput type="email" placeholder="Email Address" />
          </div>

          {/* Phone */}
          <CustomInput placeholder="Phone No" icon="pi-phone" />

          {/* Submit Button */}
          <YellowButton onClick={() => console.log("Taxi booking submitted!")}>
            Find a Taxi
          </YellowButton>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
