import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import carIconImg from "../../assets/car.png";
import { useSearchParams } from "react-router-dom";
import useNearbyDriversStore from "../../hooks/useNearbyDriversStore";
import driverpng from "../../assets/driver.png";
import NearbyDrivers from "./NearbyDrivers";
import { Toast } from "primereact/toast";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

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
      detail: "Waiting for driver confirmation...",
      life: 3000,
    });
  }, []);

  useEffect(() => {
    if (startLat && startLng) {
      fetchNearbyDrivers(startLat, startLng);
      const intervalId = setInterval(() => {

        fetchNearbyDrivers(startLat, startLng);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [startLat, startLng]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  return (
    <div>
      <div className="h-[600px] w-full">
        <Toast ref={toast} />
        {isLoaded ? (
          <GoogleMap
            center={mapCenter}
            zoom={16}
            mapContainerStyle={{ width: "100%", height: "800px" }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
            }}
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
                  scaledSize: new window.google.maps.Size(40, 40),
                  anchor: new window.google.maps.Point(20, 20),
                }}
                onMouseOver={() => setActiveDriver(driver.driverId)}
                onMouseOut={() => setActiveDriver(null)}
              >
                {activeDriver === driver.driverId && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(driver.latitude),
                      lng: parseFloat(driver.longitude),
                    }}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -40),
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={driver.profilePic || driverpng}
                        alt="driver"
                        className="w-12 h-12 rounded-full mb-2"
                      />
                      <p className="text-sm font-semibold text-gray-800">
                        Driver ID: {driver.driverId}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        ) : (
          <>Loading...</>
        )}
      </div>
      <NearbyDrivers drivers={drivers} />
    </div>
  );
};

export default DriverFinding;
