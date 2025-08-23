import React, { useEffect, useRef } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";

const Socket = () => {
  const stompClientRef = useRef(null);
  const toastBottomRight = useRef(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:3004/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected");

        // Subscribe to notifications topic
        stompClient.subscribe("/topic/notify", (data) => {
          const msg = JSON.parse(data.body);
          console.log("Received notification:", msg);

          // Show toast notification with link
          toastBottomRight.current.show({
            severity: "info",
            summary: "Your ride is scheduled with " + msg.fullName,
            detail: (
              <Link
                to={`/ride/${msg.bookingId || "123"}`} // dynamic rideId if available
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                View Ride Details
              </Link>
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
  }, []);

  return (
    <div>
      {/* Toast for bottom-right notifications */}
      <Toast ref={toastBottomRight} position="bottom-right" />
    </div>
  );
};

export default Socket;
