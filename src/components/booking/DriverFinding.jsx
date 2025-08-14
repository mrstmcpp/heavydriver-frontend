import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import carIconImg from "../../assets/car.png";
import { useSearchParams } from "react-router-dom";

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
  
  const drivers = [
    { id: 1, name: "Driver 1", lat: 28.6139, lng: 77.2090 }, // Delhi
    { id: 2, name: "Driver 2", lat: 28.7041, lng: 77.1025 }, // Delhi alt
    { id: 3, name: "Driver 3", lat: 28.5355, lng: 77.3910 }, // Noida
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[startLat, startLng]} // Initial center
        zoom={11}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {drivers.map((driver) => (
          <Marker
            key={driver.id}
            position={[driver.lat, driver.lng]}
            icon={carIcon} 
          >
            <Popup>
              <b>{driver.name}</b> <br />
              Latitude: {driver.lat} <br />
              Longitude: {driver.lng}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DriverFinding;
