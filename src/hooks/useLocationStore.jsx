import { create } from "zustand";

export const useLocationStore = create((set, get) => ({
  location: null,
  error: null,
  watchId: null,

  watchUserLocation: () => {
    get().stopWatchingUserLocation();

    if (!navigator.geolocation) {
      set({
        error: "Geolocation is not supported by this browser.",
      });
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        set({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
        });
      },
      (error) => {
        set({ error: error.message });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    set({ watchId: id });
  },

  stopWatchingUserLocation: () => {
    const { watchId } = get();
    if (watchId && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
      set({ watchId: null });
    }
  },
}));
