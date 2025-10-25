import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { Toast } from "primereact/toast";
import useAuthStore from "../hooks/useAuthStore";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { userId, loading } = useAuthStore();
  const stompClientRef = useRef(null);
  const toastBottomRight = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const [connected, setConnected] = useState(false);

  const connectSocket = useCallback(() => {
    if (!userId || loading) return;
    if (stompClientRef.current) return; // Avoid duplicate connections

    const socket = new SockJS("http://localhost:3004/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 0, // We'll handle retry manually
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);

        stompClient.subscribe(`/topic/user/${userId}`, (data) => {
          const msg = JSON.parse(data.body);
          console.log("Received notification:", msg);

          toastBottomRight.current.show({
            severity: "info",
            summary: `Your ride is scheduled with ${msg.fullName}`,
            detail: (
              <a
                href={`/ride/${msg.bookingId}`}
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                View Ride Details
              </a>
            ),
            life: 5000,
          });
        });
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
        console.error("Details:", frame.body);
        setConnected(false);
        attemptReconnect();
      },
      onWebSocketClose: () => {
        console.warn("WebSocket closed.");
        setConnected(false);
        stompClientRef.current = null;
        attemptReconnect();
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;
  }, [userId, loading]);

  const attemptReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) return; 

    reconnectTimeoutRef.current = setTimeout(() => {
      console.log("Attempting to reconnect WebSocket...");
      reconnectTimeoutRef.current = null;
      connectSocket();
    }, 5000);
  }, [connectSocket]);

  useEffect(() => {
    if (!userId || loading) return;

    connectSocket();

    return () => {
      console.log("🧹 Cleaning up socket connection");
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [userId, loading, connectSocket]);

  return (
    <SocketContext.Provider value={stompClientRef.current}>
      {children}
      <Toast ref={toastBottomRight} position="bottom-right" />
    </SocketContext.Provider>
  );
};