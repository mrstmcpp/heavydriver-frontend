import React, { createContext, useContext, useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!userId || loading) return;

    const socket = new SockJS("http://localhost:3004/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected");

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
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [userId, loading]);

  return (
    <SocketContext.Provider value={stompClientRef.current}>
      {children}
      <Toast ref={toastBottomRight} position="bottom-right" />
    </SocketContext.Provider>
  );
};
