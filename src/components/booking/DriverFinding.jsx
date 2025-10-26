import React, { useEffect, useRef, useState, useMemo } from "react";
import carIconImg from "../../assets/drivercar.png"; // <-- This is now only used for the info box
import driverpng from "../../assets/driver.png";
import { useSearchParams } from "react-router-dom";
import useNearbyDriversStore from "../../hooks/useNearbyDriversStore";
import { Toast } from "primereact/toast";
import MapComponent from "../maps/MapComponent";

const DriverFinding = () => {
  const [searchParams] = useSearchParams();
  const startLat = parseFloat(searchParams.get("startLat"));
  const startLng = parseFloat(searchParams.get("startLng"));

  const mapCenter = useMemo(
    () => ({
      lat: startLat || 25.49249,
      lng: startLng || 81.85936,
    }),
    [startLat, startLng]
  );

  const [activeDriver, setActiveDriver] = useState(null);
  const { drivers, fetchNearbyDrivers } = useNearbyDriversStore();
  const toast = useRef(null);

  useEffect(() => {
    toast.current?.show({
      severity: "info",
      summary: "Booking created successfully",
      detail: "Finding nearby drivers...",
      life: 2500,
    });
  }, []);

  useEffect(() => {
    if (startLat != null && startLng != null) {
      fetchNearbyDrivers(startLat, startLng);
      const intervalId = setInterval(() => {
        fetchNearbyDrivers(startLat, startLng);
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, [startLat, startLng, fetchNearbyDrivers]); // fetchNearbyDrivers

  return (
    <div className="relative flex flex-col items-center bg-[#0e0e0e] min-h-screen py-6">
      <Toast ref={toast} />

      <div className="w-[90%] rounded-xl overflow-hidden relative">
        <MapComponent
          center={mapCenter}
          zoom={16}
          height="80vh"
          driverLocation={null}
          showingYourRoute={true}
          drivers={drivers}
          activeDriver={activeDriver}
          onDriverMouseOver={(driverId) => setActiveDriver(driverId)}
          onDriverMouseOut={() => setActiveDriver(null)}
        >
          {/* {console.log("Drivers on map:", drivers)} */}
        </MapComponent>

        {activeDriver && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1e293b] text-white p-4 rounded-2xl shadow-lg flex items-center gap-3 w-[250px] justify-center border border-gray-600 transition-all duration-300">
            <img
              src={
                drivers.find((d) => d.driverId === activeDriver)?.profilePic ||
                driverpng
              }
              alt="driver"
              className="w-12 h-12 rounded-full border-2 border-yellow-400"
            />
            <div>
              <h4 className="text-base font-semibold">Driver #{activeDriver}</h4>
              <p className="text-sm text-gray-300">Nearby and available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverFinding;