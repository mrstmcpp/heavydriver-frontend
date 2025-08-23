import { create } from "zustand";
import axios from "axios";

const useNearbyDriversStore = create((set) => ({
  drivers: [],
  fetchNearbyDrivers: async (latitude, longitude) => {
    if (!latitude || !longitude) return;
    try {
      console.log("Fetching nearby drivers for:", latitude, longitude);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCATION_BACKEND_URL}/location/nearby/drivers`,
        { latitude, longitude }
      );

      // console.log("Nearby drivers fetched:", response.data);
      set({ drivers: response.data });
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
    return;
  },
}));

export default useNearbyDriversStore;
