import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const LIBRARIES = ["places", "marker"];

const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  if (loadError) return <p>Error loading Google Maps</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return <>{children}</>;
};

export default GoogleMapsProvider;
