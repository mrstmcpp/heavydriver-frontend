
import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const useAuthStore = create((set, get) => ({
  authUser: null,
  activeBooking: null,
  loading: true,
  userId: null,

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_AUTH_BACKEND_URL}/auth/validate`
      );

      if (res.data?.loggedIn) {
        console.log("User is authenticated:", res.data);
        set({ authUser: res.data.user, loading: false, userId: res.data.userId });
        get().fetchActiveBooking(res.data.userId);
        
      } else {
        set({ authUser: null, activeBooking: null, loading: false });
      }
    } catch {
      set({ authUser: null, activeBooking: null, loading: false });
    }
  },

  fetchActiveBooking: async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}/booking/active/${userId}`
      );
      if (res.data) {
        set({ activeBooking: res.data });
        // console.log("Fetched active booking:", get().activeBooking);
      } else {
        set({ activeBooking: null });
      }
    } catch {
      set({ activeBooking: null });
    }
  },
}));

export default useAuthStore;
