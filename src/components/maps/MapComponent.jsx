import React, { useRef, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["marker"];

const MapComponent = ({ center, zoom = 12, height = "400px", onLocationSelect }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const markerRef = useRef(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
    markerRef.current = null;
  }, []);

  const handleClick = (e) => {
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    // Remove old marker
    if (markerRef.current) markerRef.current.map = null;

    // Place new AdvancedMarker
    markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
      position: latLng,
      map,
    });

    if (onLocationSelect) {
      onLocationSelect(latLng);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height }}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleClick}
      mapTypeId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
    />
  ) : null;
};

export default React.memo(MapComponent);
