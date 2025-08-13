import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  authUser: null,
  loading: true, // start in loading state

  checkAuth: async () => {
    set({ loading: true }); // mark as loading before checking
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_AUTH_BACKEND_URL}/auth/validate`
      );
      console.log("Authentication status:", res.data);

      if (res.data?.loggedIn) {
        set({ authUser: res.data.user, loading: false });
      } else {
        set({ authUser: null, loading: false });
      }
    } catch {
      set({ authUser: null, loading: false });
    }
  },
}));

export default useAuthStore;
