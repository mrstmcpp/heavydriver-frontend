import React, { useEffect, useRef, useState, useMemo } from "react";
import carIconImg from "../../assets/drivercar.png";
import driverpng from "../../assets/driver.png";
import { useSearchParams } from "react-router-dom";
import useNearbyDriversStore from "../../hooks/useNearbyDriversStore";
import { Toast } from "primereact/toast";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  // styles: [
  //   { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  //   { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
  //   { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  //   {
  //     featureType: "road",
  //     elementType: "geometry",
  //     stylers: [{ color: "#304a7d" }],
  //   },
  //   {
  //     featureType: "water",
  //     elementType: "geometry",
  //     stylers: [{ color: "#17263c" }],
  //   },
  //   {
  //     featureType: "poi.park",
  //     elementType: "geometry",
  //     stylers: [{ color: "#263c3f" }],
  //   },
  // ],
};

const DriverFinding = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

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
  const mapRef = useRef(null);

  useEffect(() => {
    toast.current?.show({
      severity: "info",
      summary: "Booking created successfully",
      detail: "Finding nearby drivers...",
      life: 2500,
    });
  }, []);

  useEffect(() => {
    if (startLat && startLng) {
      fetchNearbyDrivers(startLat, startLng);
      const intervalId = setInterval(() => {
        fetchNearbyDrivers(startLat, startLng);
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, [startLat, startLng]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  return (
    <div className="relative flex flex-col items-center bg-[#0e0e0e] min-h-screen py-6">
      <Toast ref={toast} />
      {isLoaded ? (
        <div className="w-[90%] rounded-xl overflow-hidden relative">
          <GoogleMap
            center={mapCenter}
            zoom={16}
            mapContainerStyle={mapContainerStyle}
            options={mapOptions}
            onLoad={handleMapLoad}
          >
            {drivers?.map((driver) => (
              <Marker
                key={driver.driverId}
                position={{
                  lat: parseFloat(driver.latitude),
                  lng: parseFloat(driver.longitude),
                }}
                icon={{
                  url: carIconImg,
                  scaledSize: new window.google.maps.Size(
                    activeDriver === driver.driverId ? 45 : 35,
                    activeDriver === driver.driverId ? 45 : 35
                  ),
                  anchor: new window.google.maps.Point(20, 20),
                }}
                onMouseOver={() => setActiveDriver(driver.driverId)}
                onMouseOut={() => setActiveDriver(null)}
              />
            ))}
          </GoogleMap>

          {/* Floating info card */}
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
      ) : (
        <p className="text-white mt-10 text-lg">Loading map...</p>
      )}
    </div>
  );
};

export default DriverFinding;
