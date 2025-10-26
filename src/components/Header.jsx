import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMenuItems } from "../content/items";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Menubar } from "primereact/menubar";
import useAuthStore from "../hooks/useAuthStore";
import useBookingStore from "../hooks/useBookingStore";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const menuItems = getMenuItems(navigate);
  const [menuVisible, setMenuVisible] = useState(false);
  const authUser = useAuthStore((state) => state.authUser);
  const userId = useAuthStore((state) => state.userId);
  const loading = useAuthStore((state) => state.loading);
  const activeBooking = useBookingStore((state) => state.activeBooking);
  const loadingBooking = useBookingStore((state) => state.loadingBooking);
  const fetchActiveBooking = useBookingStore(
    (state) => state.fetchActiveBooking
  );

  useEffect(() => {
    if (loading || loadingBooking) return;
    if (!userId || activeBooking) return;
    fetchActiveBooking();
  }, [userId]);

  const onHandleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_AUTH_BACKEND_URL}/signout`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b0b0b]/70 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
        {/* --- Left: Logo --- */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/banner_logo_trans.png"
            alt="Heavy Driver Logo"
            className="h-10 drop-shadow-md"
          />
          {/* <h1 className="text-2xl font-bold text-yellow-400 hidden sm:block tracking-wide">
            HEAVY <span className="text-white">Driver</span>
          </h1> */}
        </div>

        {/* --- Center: Menu (Desktop) --- */}
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

        {/* --- Right: Buttons (Desktop) --- */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            label="Engineering"
            icon="pi pi-cog"
            className="p-button-sm p-button-rounded font-semibold"
            style={{
              background: "#38bdf8",
              color: "#000",
              border: "none",
              boxShadow: "0 0 10px rgba(56,189,248,0.5)",
            }}
            onClick={() => navigate("/engineering")}
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
                onClick={() => navigate(`/rides/${activeBooking.bookingId}`)}
              />
              
          ) : (
            <Button
              label="Book a Ride"
              icon="pi pi-send"
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
            <Button
              icon="pi pi-sign-out"
              className="p-button-sm p-button-rounded"
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                boxShadow: "0 0 10px rgba(239,68,68,0.5)",
              }}
              onClick={onHandleLogout}
            />
          )}
        </div>

        {/* --- Mobile Menu Toggle --- */}
        <div className="md:hidden">
          <Button
            icon="pi pi-bars"
            className="p-button-rounded p-button-text text-yellow-400 hover:text-yellow-300"
            onClick={() => setMenuVisible(true)}
          />
        </div>
      </div>

      {/* --- Mobile Menu Dialog --- */}
      <Dialog
        visible={menuVisible}
        onHide={() => setMenuVisible(false)}
        header="Menu"
        className="md:hidden"
        draggable={false}
        closable
        dismissableMask
        style={{
          width: "90%",
          background: "rgba(15,15,15,0.9)",
          color: "white",
          borderRadius: "12px",
        }}
      >
        <div className="flex flex-col gap-3">
          {menuItems.map((item, idx) => {
            if (item.items) {
              return (
                <div key={idx} className="flex flex-col gap-1 pl-2">
                  <span className="font-semibold text-yellow-500">
                    {item.label}
                  </span>
                  {item.items.map((subItem, subIdx) => (
                    <Button
                      key={subIdx}
                      label={subItem.label}
                      icon={subItem.icon}
                      className="p-button-text justify-start text-yellow-400"
                      onClick={() => {
                        subItem.command();
                        setMenuVisible(false);
                      }}
                    />
                  ))}
                </div>
              );
            } else {
              return (
                <Button
                  key={idx}
                  label={item.label}
                  icon={item.icon}
                  className="p-button-text justify-start text-yellow-400"
                  onClick={() => {
                    item.command();
                    setMenuVisible(false);
                  }}
                />
              );
            }
          })}

          <div className="flex flex-col gap-2 mt-4">
            <Button
              label="Engineering"
              icon="pi pi-cog"
              className="p-button-sm p-button-rounded"
              style={{ background: "#38bdf8", color: "#000" }}
              onClick={() => {
                navigate("/engineering");
                setMenuVisible(false);
              }}
            />
            <Button
              label={activeBooking ? "Ongoing Ride" : "Book a Ride"}
              icon={activeBooking ? "pi pi-map-marker" : "pi pi-send"}
              className="p-button-sm p-button-rounded"
              style={{
                background: activeBooking ? "#22c55e" : "#facc15",
                color: "#000",
              }}
              onClick={() => {
                navigate(activeBooking ? `/rides/${activeBooking}` : "/rides/new");
                setMenuVisible(false);
              }}
            />
            {authUser && (
              <Button
                label="Logout"
                icon="pi pi-sign-out"
                className="p-button-sm p-button-rounded"
                style={{ background: "#ef4444", color: "#fff" }}
                onClick={() => {
                  onHandleLogout();
                  setMenuVisible(false);
                }}
              />
            )}
          </div>
        </div>
      </Dialog>
    </header>
  );
};

export default React.memo(Header);
