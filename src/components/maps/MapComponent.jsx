import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import CurrentLocationButton from "./CurrentLocationButton";
import drivercar from "../../assets/drivercar.png";
import { useLocationStore } from "../../hooks/useLocationStore";
import pickupIcon from "../../assets/pin2.png";
import dropIcon from "../../assets/pin.png";

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
  mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
};

const autocompleteCardStyle = {
  backgroundColor: "#000",
  borderRadius: "3px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  margin: "10px",
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 10,
};

const LIBRARIES = ["places", "marker"];

const MapComponent = ({
  center,
  zoom = 15,
  height = "400px",
  onLocationSelect,
  showDirectionsUI = true,
  origin,
  destination,
  onRouteCalculated,
  isInteractive = true,
  driverLocation,
  showingYourRoute,
  drivers = [],
  activeDriver = null,
  onDriverMouseOver,
  onDriverMouseOut,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const { location, watchUserLocation, stopWatchingUserLocation } =
    useLocationStore();

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);

  const prevRouteRef = useRef(null);
  const autocompleteCardRef = useRef(null);

  const clickedMarkerRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const routeMarkersRef = useRef([]);
  const selectedPlaceMarkerRef = useRef(null);
  const driverMarkersRef = useRef({});

  const currentUserLocationMarkerRef = useRef(null);

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

  const handleCurrentLocation = () => {
    if (!map || !location) return;
    map.panTo(location);
    map.setZoom(15);
  };

  useEffect(() => {
    watchUserLocation();

    return () => {
      stopWatchingUserLocation();
    };
  }, [watchUserLocation, stopWatchingUserLocation]);

  useEffect(() => {
    if (!map || !window.google || !location) return;

    const userDot = document.createElement("div");
    userDot.style.width = "14px";
    userDot.style.height = "14px";
    userDot.style.backgroundColor = "#4285F4";
    userDot.style.borderRadius = "50%";
    userDot.style.border = "2px solid white";
    userDot.style.boxShadow = "0 0 4px rgba(0,0,0,0.3)";
    userDot.style.boxSizing = "border-box";

    if (!currentUserLocationMarkerRef.current) {
      currentUserLocationMarkerRef.current =
        new window.google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: location,
          content: userDot,
          title: "Your Location",
        });
    } else {
      currentUserLocationMarkerRef.current.position = location;
    }
  }, [map, location]);

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

    // Remove old markers
    routeMarkersRef.current.forEach((marker) => (marker.map = null));
    routeMarkersRef.current = [];

    if (directionResponse && origin && destination) {
      const leg = directionResponse.routes[0].legs[0];

      // 🟢 Pickup Marker with Label
      const pickupWrapper = document.createElement("div");
      pickupWrapper.style.display = "flex";
      pickupWrapper.style.flexDirection = "column";
      pickupWrapper.style.alignItems = "center";

      const pickupLabel = document.createElement("div");
      pickupLabel.innerText = origin.address || "Pickup";
      pickupLabel.style.color = "#fff";
      pickupLabel.style.background = "rgba(0, 0, 0, 0.7)";
      pickupLabel.style.padding = "3px 8px";
      pickupLabel.style.borderRadius = "6px";
      pickupLabel.style.fontSize = "12px";
      pickupLabel.style.marginBottom = "4px";
      pickupLabel.style.whiteSpace = "nowrap";
      pickupLabel.style.maxWidth = "150px";
      pickupLabel.style.textAlign = "center";
      pickupLabel.style.overflow = "hidden";
      pickupLabel.style.textOverflow = "ellipsis";

      const pickupImg = document.createElement("img");
      pickupImg.src = pickupIcon;
      pickupImg.style.width = "38px";
      pickupImg.style.height = "38px";

      pickupWrapper.appendChild(pickupLabel);
      pickupWrapper.appendChild(pickupImg);

      const pickupMarker = new window.google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: leg.start_location,
        content: pickupWrapper,
        title: "Pickup Location",
      });

      // 🔴 Drop Marker with Label
      const dropWrapper = document.createElement("div");
      dropWrapper.style.display = "flex";
      dropWrapper.style.flexDirection = "column";
      dropWrapper.style.alignItems = "center";

      const dropLabel = document.createElement("div");
      dropLabel.innerText = destination.address || "Drop";
      dropLabel.style.color = "#fff";
      dropLabel.style.background = "rgba(0, 0, 0, 0.7)";
      dropLabel.style.padding = "3px 8px";
      dropLabel.style.borderRadius = "6px";
      dropLabel.style.fontSize = "12px";
      dropLabel.style.marginBottom = "4px";
      dropLabel.style.whiteSpace = "nowrap";
      dropLabel.style.maxWidth = "150px";
      dropLabel.style.textAlign = "center";
      dropLabel.style.overflow = "hidden";
      dropLabel.style.textOverflow = "ellipsis";

      const dropImg = document.createElement("img");
      dropImg.src = dropIcon;
      dropImg.style.width = "38px";
      dropImg.style.height = "38px";

      dropWrapper.appendChild(dropLabel);
      dropWrapper.appendChild(dropImg);

      const dropMarker = new window.google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: leg.end_location,
        content: dropWrapper,
        title: "Drop Location",
      });

      // Save both markers
      routeMarkersRef.current = [pickupMarker, dropMarker];
    }
  }, [map, directionResponse, origin, destination]);

  useEffect(() => {
    if (!map || !window.google) return;

    const currentMarkers = driverMarkersRef.current;
    const newMarkers = {};

    drivers.forEach((driver) => {
      const driverId = driver.driverId;
      const isActive = activeDriver === driverId;
      const position = {
        lat: parseFloat(driver.latitude),
        lng: parseFloat(driver.longitude),
      };

      const img = document.createElement("img");
      img.src = drivercar;
      const size = isActive ? 45 : 35;
      img.style.width = `${size}px`;
      img.style.height = `${size}px`;
      img.style.transition = "width 0.1s, height 0.1s";

      if (currentMarkers[driverId]) {
        const marker = currentMarkers[driverId];
        marker.position = position;
        marker.content = img;
        newMarkers[driverId] = marker;
        delete currentMarkers[driverId];
      } else {
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: position,
          content: img,
          title: `Driver #${driverId}`,
        });

        marker.addListener("mouseover", () => {
          if (onDriverMouseOver) onDriverMouseOver(driverId);
        });
        marker.addListener("mouseout", () => {
          if (onDriverMouseOut) onDriverMouseOut();
        });

        newMarkers[driverId] = marker;
      }
    });

    Object.values(currentMarkers).forEach((marker) => {
      marker.map = null;
    });

    driverMarkersRef.current = newMarkers;
  }, [map, drivers, activeDriver, onDriverMouseOver, onDriverMouseOut]);

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
        <CurrentLocationButton onClick={handleCurrentLocation} />
      )}
    </div>
  );
};

export default MapComponent;
