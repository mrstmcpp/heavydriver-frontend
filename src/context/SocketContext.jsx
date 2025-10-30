import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { Toast } from "primereact/toast";
import useAuthStore from "../hooks/useAuthStore";
import useBookingStore from "../hooks/useBookingStore";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const navigate = useNavigate();
  const { userId, loading: loadingAuth, logout } = useAuthStore();
  const { activeBooking, loadingBooking } = useBookingStore();

  const stompClientRef = useRef(null);
  const toastBottomRight = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const driverLocationSubRef = useRef(null);
  const bookingUpdateSubRef = useRef(null);
  const currentBookingIdRef = useRef(null);

  const [connected, setConnected] = useState(false);

  const connectSocket = useCallback(() => {
    if (!userId || loadingAuth || stompClientRef.current) return;

    const socket = new SockJS("http://localhost:3004/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 0,
      onConnect: () => {
        console.log("Connected to WebSocket for user:", userId);
        setConnected(true);

        // Subscribe to user-level notifications (ride assigned)
        stompClient.subscribe(`/topic/user/${userId}`, (data) => {
          const msg = JSON.parse(data.body);
          console.log("User notification received:", msg);

          toastBottomRight.current?.show({
            severity: "success",
            summary: `Your ride is scheduled with ${msg.fullName}`,
            detail: (
              <>
                Redirecting you to ride details.{" "}
                <Link
                  to={`/rides/${msg.bookingId}`}
                  className="text-yellow-400 underline hover:text-yellow-300"
                >
                  View Ride Details
                </Link>
              </>
            ),
            life: 5000,
          });

          // update booking store and navigate to new ride
          navigate(`/rides/${msg.bookingId}`);
          useBookingStore.getState().setActiveBooking({
            bookingId: msg.bookingId,
            bookingStatus: msg.status || "ASSIGNED",
          });
        });
      },
      onStompError: () => {
        console.error("STOMP error occurred");
        setConnected(false);
        attemptReconnect();
      },
      onWebSocketClose: () => {
        console.warn("WebSocket connection closed.");
        setConnected(false);
        stompClientRef.current = null;
        driverLocationSubRef.current = null;
        bookingUpdateSubRef.current = null;
        currentBookingIdRef.current = null;
        attemptReconnect();
      },
    });

    console.log("Attempting to connect WebSocket...");
    stompClient.activate();
    stompClientRef.current = stompClient;
  }, [userId, loadingAuth, navigate]);

  // reconnect only if connection drops
  const attemptReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) return;
    reconnectTimeoutRef.current = setTimeout(() => {
      console.log("Attempting to reconnect WebSocket...");
      reconnectTimeoutRef.current = null;
      connectSocket();
    }, 5000);
  }, [connectSocket]);

  // keep socket connected for lifetime of app
  useEffect(() => {
    if (!userId || loadingAuth) return;
    connectSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [userId, loadingAuth, connectSocket]);

  useEffect(() => {
    const stompClient = stompClientRef.current;
    const bookingId = activeBooking?.bookingId;
    const status = activeBooking?.bookingStatus;

    if (!connected || !stompClient || loadingBooking) return;

    if (status === "COMPLETED" || status === "CANCELLED") {
      console.log(`Ride ${status}: unsubscribing from ride topics`);
      if (driverLocationSubRef.current) {
        try {
          driverLocationSubRef.current.unsubscribe();
          console.log("Unsubscribed from driver-location topic");
        } catch {}
        driverLocationSubRef.current = null;
      }
      if (bookingUpdateSubRef.current) {
        try {
          bookingUpdateSubRef.current.unsubscribe();
          console.log("Unsubscribed from booking-updates topic");
        } catch {}
        bookingUpdateSubRef.current = null;
      }
      currentBookingIdRef.current = null;
      return;
    }

    if (bookingId && bookingId !== currentBookingIdRef.current) {
      console.log(`Booking changed: ${currentBookingIdRef.current} → ${bookingId}`);

      // cleanup old subscriptions
      if (driverLocationSubRef.current) {
        try {
          driverLocationSubRef.current.unsubscribe();
        } catch {}
        driverLocationSubRef.current = null;
      }
      if (bookingUpdateSubRef.current) {
        try {
          bookingUpdateSubRef.current.unsubscribe();
        } catch {}
        bookingUpdateSubRef.current = null;
      }

      // subscribe to new driver-location
      console.log(`Subscribing to driver-location for booking ${bookingId}`);
      driverLocationSubRef.current = stompClient.subscribe(
        `/topic/booking/${bookingId}/driver-location`,
        (payload) => {
          const data = JSON.parse(payload.body);
          const location = { lat: data.latitude, lng: data.longitude };
          console.log("Driver location update received:", location);
          useBookingStore.getState().setDriverLocation(location);
        }
      );

      // subscribe to booking updates
      console.log(`Subscribing to booking-updates for booking ${bookingId}`);
      bookingUpdateSubRef.current = stompClient.subscribe(
        `/topic/booking/${bookingId}/updates`,
        (payload) => {
          const data = JSON.parse(payload.body);
          console.log("Booking update received:", data);

          useBookingStore.getState().setActiveBooking({
            bookingId,
            bookingStatus: data.bookingStatus,
          });

          toastBottomRight.current?.show({
            severity: "info",
            summary: "Ride Update",
            detail: `Booking status changed to ${data.bookingStatus}`,
            life: 4000,
          });
        }
      );

      currentBookingIdRef.current = bookingId;
    }
  }, [activeBooking, connected, loadingBooking]);

  const disconnectSocket = useCallback(() => {
    console.log("Disconnecting WebSocket manually (logout)");
    try {
      driverLocationSubRef.current?.unsubscribe();
      bookingUpdateSubRef.current?.unsubscribe();
    } catch {}
    driverLocationSubRef.current = null;
    bookingUpdateSubRef.current = null;
    currentBookingIdRef.current = null;

    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }
    setConnected(false);
  }, []);

  const handleLogout = useCallback(() => {
    disconnectSocket();
    logout(); // from auth store
    navigate("/login");
  }, [disconnectSocket, logout, navigate]);

  return (
    <SocketContext.Provider
      value={{
        socketClient: stompClientRef.current,
        connected,
        disconnectSocket,
        handleLogout, // expose logout with socket cleanup
      }}
    >
      {children}
      <Toast ref={toastBottomRight} position="bottom-right" />
    </SocketContext.Provider>
  );
};
