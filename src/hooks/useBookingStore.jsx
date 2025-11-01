import { create } from "zustand";
import useAuthStore from "./useAuthStore";
import axios from "axios";

axios.defaults.withCredentials = true;

const useBookingStore = create((set, get) => ({
  activeBooking: null,
  loadingBooking: false,
  driverLocation: null,

  setDriverLocation: (location) => {
    set({ driverLocation: location });
  },

  setActiveBooking: (data) => {
    set({ activeBooking: data });
  },

  fetchActiveBooking: async () => {
    const { loadingBooking } = get();
    if (loadingBooking) return;

    set({ loadingBooking: true });

    try {
      const { userId } = useAuthStore.getState(); // console.log(userId);
      if (!userId) {
        if (import.meta.env.DEV)
          console.warn("⚠ No userId found in auth store.");
        set({ loadingBooking: false });
        return;
      }

      const res = await axios.get(
        `${
          import.meta.env.VITE_BOOKING_BACKEND_URL
        }/active/passenger/${userId}`,
        { withCredentials: true }
      ); // console.log(res.data);
      if (res.data) {
        set({
          activeBooking: res.data,
        }); // console.info(res.data)

        if (import.meta.env.DEV)
          console.log("Active booking fetched:", res.data);
      } else {
        set({ activeBooking: null });
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        set({ activeBooking: null });
        if (import.meta.env.DEV)
          console.warn("No active booking found for this driver.");
      } else {
        console.error("Could not fetch active booking:", err);
      }
    } finally {
      set({ loadingBooking: false });
    }
  },

  clearBooking: () => {
    const { activeBooking } = get();
    // console.log("clearing active booking" + activeBooking.bookingId);
    set({ activeBooking: null, loadingBooking: false , driverLocation: null });
  },
}));

export default useBookingStore;

useAuthStore.subscribe(
  (state) => state.status,
  (status) => {
    const { fetchActiveBooking, clearBooking } = useBookingStore.getState();

    if (status === "authenticated") {
      fetchActiveBooking();
    } else if (status === "unauthenticated") {
      clearBooking();
    }
  },
  { fireImmediately: true }
);
