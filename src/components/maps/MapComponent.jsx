import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import CurrentLocationButton from "./CurrentLocationButton";
import drivercar from "../../assets/drivercar.png";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};
const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  mapId: "YOUR_CUSTOM_MAP_ID",
};

const autocompleteCardStyle = {
  backgroundColor: "#000",
  borderRadius: "3px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  margin: "10px",
  // padding: "5px",
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 10,
};

const LIBRARIES = ["places", "marker"];
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
  driverLocation,
  showingYourRoute,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);

  const prevRouteRef = useRef(null);
  const autocompleteCardRef = useRef(null);

  const clickedMarkerRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const routeMarkersRef = useRef([]);
  const selectedPlaceMarkerRef = useRef(null);

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

        setMarkerPosition(null);
        if (selectedPlaceMarkerRef.current) {
          selectedPlaceMarkerRef.current.map = null;
        }

        setDirectionResponse(results);
        prevRouteRef.current = {
          origin: originVal,
          destination: destinationVal,
        };

        const leg = results.routes[0].legs[0];
        if (onRouteCalculated) {
          onRouteCalculated({
            distance: leg.distance.text,
            duration: leg.duration.text,
          });
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

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (!isLoaded || !map || !autocompleteCardRef.current || !window.google) {
      return;
    }

    if (autocompleteCardRef.current.hasChildNodes()) {
      return;
    }

    selectedPlaceMarkerRef.current =
      new window.google.maps.marker.AdvancedMarkerElement({
        map: map,
      });

    const { PlaceAutocompleteElement } = window.google.maps.places;
    const placeAutocomplete = new PlaceAutocompleteElement();
    placeAutocomplete.id = "place-autocomplete-input";

    autocompleteCardRef.current.appendChild(placeAutocomplete);

    placeAutocomplete.addEventListener(
      "gmp-select",
      async ({ placePrediction }) => {
        if (clickedMarkerRef.current) {
          clickedMarkerRef.current.map = null;
        }
        setDirectionResponse(null);

        const place = placePrediction.toPlace();
        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location", "viewport"],
        });

        if (place.viewport) {
          map.fitBounds(place.viewport);
        } else {
          map.setCenter(place.location);
          map.setZoom(17);
        }

        if (selectedPlaceMarkerRef.current) {
          selectedPlaceMarkerRef.current.position = place.location;
          selectedPlaceMarkerRef.current.map = map;
        }
      }
    );
  }, [isLoaded, map]);

  const onUnmount = useCallback(() => setMap(null), []);

  const handleClick = (e) => {
    if (!isInteractive) return;

    if (selectedPlaceMarkerRef.current) {
      selectedPlaceMarkerRef.current.map = null;
    }
    setDirectionResponse(null);

    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPosition(latLng);
    if (onLocationSelect) onLocationSelect(latLng);
  };

  const handleCurrentLocation = (latLng) => {
    if (!map) return;
    map.panTo(latLng);
    map.setZoom(15);
  };

  useEffect(() => {
    if (!map || !window.google) return;
    if (clickedMarkerRef.current) {
      clickedMarkerRef.current.map = null;
    }
    if (markerPosition) {
      clickedMarkerRef.current =
        new window.google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: markerPosition,
        });
    }
  }, [map, markerPosition]);

  useEffect(() => {
    if (!map || !window.google) return;
    if (driverLocation) {
      const img = document.createElement("img");
      img.src = drivercar;
      img.style.width = "40px";
      img.style.height = "40px";
      if (!driverMarkerRef.current) {
        driverMarkerRef.current =
          new window.google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: driverLocation,
            content: img,
            title: "Driver",
          });
      } else {
        driverMarkerRef.current.position = driverLocation;
      }
    } else if (driverMarkerRef.current) {
      driverMarkerRef.current.map = null;
      driverMarkerRef.current = null;
    }
  }, [map, driverLocation]);

  useEffect(() => {
    if (!map || !window.google) return;
    routeMarkersRef.current.forEach((marker) => (marker.map = null));
    routeMarkersRef.current = [];
    if (directionResponse) {
      const leg = directionResponse.routes[0].legs[0];
      const startMarker = new window.google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: leg.start_location,
      });
      const endMarker = new window.google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: leg.end_location,
      });
      routeMarkersRef.current = [startMarker, endMarker];
    }
  }, [map, directionResponse]);

  if (loadError) return <div>Error loading maps. Check your API key.</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ position: "relative", height, width: "100%" }}>
      {!showingYourRoute && (
        <div ref={autocompleteCardRef} style={autocompleteCardStyle}></div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleClick}
      >
        {directionResponse && (
          <DirectionsRenderer
            directions={directionResponse}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>
      

      {!showingYourRoute && (
        <CurrentLocationButton onLocationFound={handleCurrentLocation} />
      )}
    </div>
  );
};

export default MapComponent;
