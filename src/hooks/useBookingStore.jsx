import { create } from "zustand";
import useAuthStore from "./useAuthStore";
import axios from "axios";

axios.defaults.withCredentials = true;

const useBookingStore = create((set, get) => ({
  activeBooking: null,
  bookingStatus: null,
  loadingBooking: false,

  fetchActiveBooking: async () => {
    const { loadingBooking } = get();
    if (loadingBooking) return;

    set({ loadingBooking: true });

    try {
      const { userId } = useAuthStore.getState();
      // console.log(userId);
      if (!userId) {
        if (import.meta.env.DEV) console.warn("⚠ No userId found in auth store.");
        set({ loadingBooking: false });
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}/active/passenger/${userId}`,
        { withCredentials: true }
      );
      // console.log(res.data);

      if (res.data) {
        set({
          activeBooking: res.data.bookingId,
          bookingStatus: res.data.bookingStatus,
        });

        // console.info(res.data)
        if (import.meta.env.DEV)
          console.log("Active booking fetched:", res.data);
      } else {
        set({ activeBooking: null, bookingStatus: null });
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        set({ activeBooking: null, bookingStatus: null });
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
    set({ activeBooking: null, bookingStatus: null, loadingBooking: false });
  },
}));


export default useBookingStore;

useAuthStore.subscribe((state) => {
  const { userId } = state;
  const bookingStore = useBookingStore.getState();

  if (userId) {
    // User logged in → fetch active booking
    if (import.meta.env.DEV)
      console.log("👤 Auth change detected → Fetching active booking...");
    bookingStore.fetchActiveBooking();
  } else {
    // User logged out → clear booking data
    if (import.meta.env.DEV)
      console.log("🚪 User logged out → Clearing active booking.");
    bookingStore.clearBooking();
  }
});