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
  const { userId, loading: loadingAuth } = useAuthStore();
  const { activeBooking, loadingBooking } = useBookingStore();

  const stompClientRef = useRef(null);
  const toastBottomRight = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const driverLocationSubRef = useRef(null);
  const bookingUpdateSubRef = useRef(null);

  const [connected, setConnected] = useState(false);

  const connectSocket = useCallback(() => {
    if (!userId || loadingAuth) return;
    if (stompClientRef.current) return;

    const socket = new SockJS("http://localhost:3004/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 0,
      onConnect: () => {
        console.log("Connected to WebSocket for user:", userId);
        setConnected(true);
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
          navigate(`/rides/${msg.bookingId}`);
        });
      },
      onStompError: () => {
        console.error("Broker/STOMP error occurred");
        setConnected(false);
        attemptReconnect();
      },
      onWebSocketClose: () => {
        console.warn("WebSocket connection closed.");
        setConnected(false);
        stompClientRef.current = null;
        driverLocationSubRef.current = null;
        bookingUpdateSubRef.current = null;
        attemptReconnect();
      },
    });

    console.log("Attempting to connect WebSocket...");
    stompClient.activate();
    stompClientRef.current = stompClient;
  }, [userId, loadingAuth]);

  const attemptReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) return;
    reconnectTimeoutRef.current = setTimeout(() => {
      console.log("Attempting to reconnect WebSocket...");
      reconnectTimeoutRef.current = null;
      connectSocket();
    }, 5000);
  }, [connectSocket]);

  useEffect(() => {
    if (!userId || loadingAuth) return;
    connectSocket();

    return () => {
      console.log("Cleaning up socket connection");
      stompClientRef.current?.deactivate();
      stompClientRef.current = null;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      driverLocationSubRef.current = null;
      bookingUpdateSubRef.current = null;
    };
  }, [userId, loadingAuth, connectSocket]);

  useEffect(() => {
    const stompClient = stompClientRef.current;
    const bookingId = activeBooking?.bookingId;
    if (loadingBooking || !connected || !stompClient || !bookingId) {
      if (driverLocationSubRef.current) {
        try {
          driverLocationSubRef.current.unsubscribe();
        } catch {}
        driverLocationSubRef.current = null;
      }
      return;
    }

    console.log(`Subscribing to driver-location: /topic/booking/${bookingId}/driver-location`);
    driverLocationSubRef.current = stompClient.subscribe(
      `/topic/booking/${bookingId}/driver-location`,
      (payload) => {
        const data = JSON.parse(payload.body);
        const location = { lat: data.latitude, lng: data.longitude };
        console.log("Driver location update received:", location);
        useBookingStore.getState().setDriverLocation(location);
      }
    );

    return () => {
      if (driverLocationSubRef.current) {
        try {
          driverLocationSubRef.current.unsubscribe();
          console.log("Unsubscribed from driver-location topic");
        } catch {}
        driverLocationSubRef.current = null;
      }
    };
  }, [activeBooking, connected]);

  useEffect(() => {
    const stompClient = stompClientRef.current;
    const bookingId = activeBooking?.bookingId;
    if (loadingBooking || !connected || !stompClient || !bookingId) {
      if (bookingUpdateSubRef.current) {
        try {
          bookingUpdateSubRef.current.unsubscribe();
        } catch {}
        bookingUpdateSubRef.current = null;
      }
      return;
    }

    console.log(`Subscribing to booking-updates: /topic/booking/${bookingId}/updates`);
    bookingUpdateSubRef.current = stompClient.subscribe(
      `/topic/booking/${bookingId}/updates`,
      (payload) => {
        const data = JSON.parse(payload.body);
        console.log("Booking update received:", data);
        toastBottomRight.current?.show({
          severity: "info",
          summary: "Ride Update",
          detail: `Booking status changed to ${data.status}`,
          life: 4000,
        });
        useBookingStore.getState().updateBookingStatus(data.status);
      }
    );

    return () => {
      if (bookingUpdateSubRef.current) {
        try {
          bookingUpdateSubRef.current.unsubscribe();
          console.log("Unsubscribed from booking-updates topic");
        } catch {}
        bookingUpdateSubRef.current = null;
      }
    };
  }, [activeBooking, connected]);

  return (
    <SocketContext.Provider value={stompClientRef.current}>
      {children}
      <Toast ref={toastBottomRight} position="bottom-right" />
    </SocketContext.Provider>
  );
};
