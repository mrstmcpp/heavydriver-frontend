import React, { useRef, useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";
import CurrentLocationButton from "./CurrentLocationButton";

const containerStyle = { width: "100%", height: "100%", borderRadius: "0.5rem" };
const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

const MapComponent = ({
  center,
  zoom = 12,
  height = "400px",
  onLocationSelect,
  showDirectionsUI = true,
  origin,
  destination,
  onRouteCalculated,
  isInteractive = true,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const prevRouteRef = useRef(null);

  const calculateRoute = useCallback(
    async (originVal, destinationVal) => {
      if (!originVal || !destinationVal) return;

      const prev = prevRouteRef.current;
      if (
        prev &&
        prev.origin.lat === originVal.lat &&
        prev.origin.lng === originVal.lng &&
        prev.destination.lat === destinationVal.lat &&
        prev.destination.lng === destinationVal.lng
      ) {
        return;
      }

      const directionService = new window.google.maps.DirectionsService();
      try {
        const results = await directionService.route({
          origin: originVal,
          destination: destinationVal,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });

        setDirectionResponse(results);
        setMarkerPosition(null);
        prevRouteRef.current = { origin: originVal, destination: destinationVal };

        const leg = results.routes[0].legs[0];

        if (onRouteCalculated) {
          onRouteCalculated({ distance: leg.distance.text, duration: leg.duration.text });
        }
      } catch (error) {
        console.error("Error calculating route:", error);
        setDirectionResponse(null);
        prevRouteRef.current = null;
        if (onRouteCalculated) onRouteCalculated(null, null);
      }
    },
    [onRouteCalculated]
  );

  useEffect(() => {
    if (!map || !origin || !destination) return;
    if (showDirectionsUI) return;

    calculateRoute(origin, destination);
  }, [map, origin, destination, showDirectionsUI, calculateRoute]);

  const onLoad = useCallback((mapInstance) => setMap(mapInstance), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const placeMarker = (latLng) => {
    setDirectionResponse(null);
    setMarkerPosition(latLng);
    if (onLocationSelect) {
      onLocationSelect(latLng);
    }
  };

  const handleClick = (e) => {
    if (!isInteractive) return;
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    placeMarker(latLng);
  };

  const handleCurrentLocation = (latLng) => {
    if (!map) return;
    map.panTo(latLng);
    map.setZoom(15);
  };

  if (loadError) return <div>Error loading maps</div>;

  return isLoaded ? (
    <div style={{ position: "relative", height, width: "100%" }}>
      {console.log("Rendering Map with center:", center)}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleClick}
      >
        {!directionResponse && markerPosition && <Marker position={markerPosition} />}

        {directionResponse && (
          <>
            <DirectionsRenderer directions={directionResponse} options={{ suppressMarkers: true }} />
            <Marker position={directionResponse.routes[0].legs[0].start_location} />
            <Marker position={directionResponse.routes[0].legs[0].end_location} />
          </>
        )}
      </GoogleMap>
      <CurrentLocationButton onLocationFound={handleCurrentLocation} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default React.memo(MapComponent);
