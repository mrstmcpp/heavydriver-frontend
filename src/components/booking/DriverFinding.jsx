import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import carIconImg from "../../assets/car.png";
import { useSearchParams } from "react-router-dom";
import useNearbyDriversStore from "../../hooks/useNearbyDriversStore";
import driverpng from "../../assets/driver.png";
import NearbyDrivers from "./NearbyDrivers";
import { Toast } from "primereact/toast";

const carIcon = new L.Icon({
  iconUrl: carIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const DriverFinding = () => {
  const [searchParams] = useSearchParams();
  const startLat = parseFloat(searchParams.get("startLat"));
  const startLng = parseFloat(searchParams.get("startLng"));
  const { drivers, fetchNearbyDrivers } = useNearbyDriversStore();
  const toast = useRef(null);

  useEffect(() => {
    toast.current?.show({
      severity: "info",
      summary: "Booking created successfully",
      detail: "Waiting for driver confirmation...",
      life: 3000,
    });
  }, []);

  useEffect(() => {
    if (startLat && startLng) {
      fetchNearbyDrivers(startLat, startLng);
      //30 sec delay
      const intervalId = setInterval(() => {
        fetchNearbyDrivers(startLat, startLng);
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [fetchNearbyDrivers]);

  return (
    <div>
      <div className="h-[600px] w-full">
        <Toast ref={toast} />

        <MapContainer
          center={[startLat, startLng]}
          zoom={16}
          className="h-[600px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {drivers && drivers.length > 0 ? (
            drivers.map((driver) => (
              <Marker
                key={driver.driverId}
                position={[driver.latitude, driver.longitude]}
                icon={carIcon}
              >
                <Popup>
                  <div className="text-center">
                    <img
                      src={driver.imageUrl || `${driverpng}`}
                      alt="Driver"
                      className="w-14 h-14 rounded-full object-cover mx-auto"
                    />
                    <p className="font-bold text-sm">
                      Driver ID: {driver.driverId}
                    </p>
                    <p className="text-xs text-gray-600">
                      Rating: {driver.rating || "N/A"}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))
          ) : (
            <Popup position={[startLat, startLng]}>
              <div className="text-center text-sm">🚗 No drivers nearby</div>
            </Popup>
          )}
        </MapContainer>
      </div>
      <NearbyDrivers drivers={drivers} />
    </div>
  );
};

export default DriverFinding;
