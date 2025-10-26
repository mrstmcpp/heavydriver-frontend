import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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

  const [connected, setConnected] = useState(false);

  /** Establish WebSocket + STOMP connection */
  const connectSocket = useCallback(() => {
    if (!userId || loadingAuth) return;
    if (stompClientRef.current) return; // Prevent duplicate connections

    const socket = new SockJS("http://localhost:3004/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 0, // manual retry handled separately
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);

        // Subscribe to user notifications
        stompClient.subscribe(`/topic/user/${userId}`, (data) => {
          const msg = JSON.parse(data.body);
          console.log("User notification:", msg);

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
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
        setConnected(false);
        attemptReconnect();
      },
      onWebSocketClose: () => {
        console.warn("WebSocket closed.");
        setConnected(false);
        stompClientRef.current = null;
        driverLocationSubRef.current = null;
        attemptReconnect();
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;
  }, [userId, loadingAuth]);

  /** Manual reconnect logic */
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
    };
  }, [userId, loadingAuth, connectSocket]);

  /** Manage driver-location subscription */
  useEffect(() => {
    const stompClient = stompClientRef.current;
    const bookingId = activeBooking?.bookingId;
    console.log("Active booking ID:", bookingId);
    // Skip if any required data still loading or missing
    if (loadingBooking || !connected || !stompClient || !bookingId) {
      if (driverLocationSubRef.current) {
        // unsubscribe from previous if exists
        try {
          driverLocationSubRef.current.unsubscribe();
          console.log("Unsubscribed from old driver-location topic");
        } catch (err) {
          console.warn("Error unsubscribing driver-location:", err);
        } finally {
          driverLocationSubRef.current = null;
        }
      }
      return;
    }

    // Subscribe to new booking’s driver-location
    console.log(`Subscribing to /topic/booking/${bookingId}/driver-location`);
    driverLocationSubRef.current = stompClient.subscribe(
      `/topic/booking/${bookingId}/driver-location`,
      (payload) => {
        const data = JSON.parse(payload.body); 

        //TODO: 
        const location = {
          lat: data.latitude,
          lng: data.longitude,
        };
        useBookingStore.getState().setDriverLocation(location);
        console.log("SOCKET : Driver location update:", location);
      }
    );

    return () => {
      // cleanup on dependency change
      if (driverLocationSubRef.current) {
        try {
          driverLocationSubRef.current.unsubscribe();
          console.log("Unsubscribed from driver-location topic (cleanup)");
        } catch (err) {
          console.warn("Error unsubscribing driver-location:", err);
        } finally {
          driverLocationSubRef.current = null;
        }
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
