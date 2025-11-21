import React, { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { getMenuItems } from "./MenuItems";
import ProfileMenu from "./ProfileMenu";
import useBookingStore from "../hooks/useBookingStore";

const DesktopMenu = ({ navigate, authUser, onLogout }) => {
  const menuItems = getMenuItems(navigate);

  const activeBooking = useBookingStore((state) => state.activeBooking);
  return (
    <>
      <div className="hidden lg:flex flex-1 justify-center">
        <Menubar
          model={menuItems}
          className="bg-transparent border-none text-gray-200 font-medium"
          pt={{
            menuitem: {
              className:
                "hover:text-yellow-400 transition-colors duration-200 text-sm",
            },
            submenuHeader: {
              className: "text-yellow-300 font-semibold text-sm",
            },
          }}
        />
      </div>

      <div className="hidden md:flex items-center gap-3">
        <Button
          label="Engineering"
          icon="pi pi-cog animate-spin"
          className="p-button-sm p-button-rounded font-semibold"
          style={{
            background: "#38bdf8",
            color: "#000",
            border: "none",
            boxShadow: "0 0 10px rgba(56,189,248,0.5)",
          }}
          onClick={() =>
            window.open("https://heavydriver.app/engineering", "_blank")
          }
        />

        {activeBooking ? (
          <Button
            label="Ongoing Ride"
            icon="pi pi-map-marker"
            className="p-button-sm p-button-rounded font-semibold"
            style={{
              background: "#22c55e",
              color: "#000",
              border: "none",
              boxShadow: "0 0 10px rgba(34,197,94,0.4)",
            }}
            onClick={() => navigate(`/rides/active/${activeBooking.bookingId}`)}
          />
        ) : (
          <Button
            label="Book a Ride"
            icon="pi pi-car"
            className="p-button-sm p-button-rounded font-semibold"
            style={{
              background: "#facc15",
              color: "#000",
              border: "none",
              boxShadow: "0 0 10px rgba(250,204,21,0.4)",
            }}
            onClick={() => navigate("/rides/new")}
          />
        )}

        {authUser && (
          <ProfileMenu
            authUser={authUser}
            onLogout={onLogout}
            navigate={navigate}
          />
        )}
      </div>
    </>
  );
};

export default DesktopMenu;
