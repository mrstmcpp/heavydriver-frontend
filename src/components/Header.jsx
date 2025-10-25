import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMenuItems } from "../content/items";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Menubar } from "primereact/menubar";
import useAuthStore from "../hooks/useAuthStore";
import useBookingStore from "../hooks/useBookingStore";
import axios from "axios";
import CarLoader from "../resusables/CarLoader";

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
    if (!loading && userId && !activeBooking && !loadingBooking) {
      fetchActiveBooking();
    }
  }, [loading, userId, activeBooking, loadingBooking, fetchActiveBooking]);

  useEffect(() => {
    if (activeBooking) {
      console.log("Active booking updated:", activeBooking);
    }
  }, [activeBooking]);


  if (loading || loadingBooking) {
    return <CarLoader message="Loading your profile..." />;
  }

  const onHandleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_AUTH_BACKEND_URL}/signout`,
        {},
        { withCredentials: true }
      );
      // Clear auth data from store (uncomment if you have a clearAuthData function)
      // useAuthStore.getState().clearAuthData();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };



  return (
    <header className="sticky top-0 z-50 bg-black/5 backdrop-blur-md text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center gap-4 py-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1
            className="text-2xl font-bold text-yellow-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/banner_logo_trans.png"
              alt="HeavyDriver Logo"
              className="h-12"
            />
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow justify-center">
          <Menubar
            model={menuItems}
            className="bg-transparent border-none text-yellow-400"
            pt={{
              menuitem: {
                className: "hover:text-yellow-300 text-sm",
              },
              submenuHeader: {
                className: "text-yellow-300 font-semibold text-sm",
              },
            }}
          />
        </div>

        {/* Right Side Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            label="Engineering"
            icon="pi pi-spin pi-cog"
            className="p-button-sm p-button-rounded"
            style={{ backgroundColor: "#38bdf8", color: "#000" }}
            onClick={() => navigate("/engineering")}
          />

          {activeBooking ? (
            <Button
              label="Ongoing Ride"
              icon="pi pi-map-marker"
              className="p-button-sm p-button-rounded"
              style={{ backgroundColor: "#22c55e", color: "#000" }}
              onClick={() => navigate(`/ride/${activeBooking}`)}
            />
          ) : (
            <Button
              label="Book a Ride"
              icon="pi pi-send"
              className="p-button-sm p-button-rounded"
              style={{ backgroundColor: "#facc15", color: "#000" }}
              onClick={() => navigate("/book")}
            />
          )}

          {/* ✅ Logout Button */}
          {authUser && (
            <Button
              label="Logout"
              icon="pi pi-sign-out"
              className="p-button-sm p-button-rounded"
              style={{ backgroundColor: "#ef4444", color: "#fff" }}
              onClick={onHandleLogout}
            />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            icon="pi pi-bars"
            className="p-button-text text-yellow-400"
            onClick={() => setMenuVisible(true)}
          />
        </div>
      </div>

      {/* Mobile Menu Dialog */}
      <Dialog
        visible={menuVisible}
        onHide={() => setMenuVisible(false)}
        header="Menu"
        style={{ width: "90%" }}
        className="md:hidden"
        draggable={false}
        closable
        dismissableMask
      >
        <div className="flex flex-col gap-3">
          {menuItems.map((item, idx) => {
            if (item.items) {
              return (
                <div key={idx} className="flex flex-col gap-1 pl-2">
                  <span className="font-bold text-yellow-700">
                    {item.label}
                  </span>
                  {item.items.map((subItem, subIdx) => (
                    <Button
                      key={subIdx}
                      label={subItem.label}
                      icon={subItem.icon}
                      className="p-button-text justify-start text-yellow-600"
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
                  className="p-button-text justify-start text-yellow-600"
                  onClick={() => {
                    item.command();
                    setMenuVisible(false);
                  }}
                />
              );
            }
          })}

          <Button
            label="Engineering"
            icon="pi pi-cog"
            className="p-button-sm p-button-rounded"
            style={{ backgroundColor: "#38bdf8", color: "#000" }}
            onClick={() => {
              navigate("/engineering");
              setMenuVisible(false);
            }}
          />

          {activeBooking ? (
            <Button
              label="Ongoing Ride"
              icon="pi pi-map-marker"
              className="p-button-sm p-button-rounded"
              style={{ backgroundColor: "#22c55e", color: "#000" }}
              onClick={() => navigate(`/ride/${activeBooking}`)}
            />
          ) : (
            <Button
              label="Book a Ride"
              icon="pi pi-send"
              className="p-button-sm p-button-rounded"
              style={{ backgroundColor: "#facc15", color: "#000" }}
              onClick={() => navigate("/book")}
            />
          )}

          {authUser && (
            <Button
              label="Logout"
              icon="pi pi-sign-out"
              className="p-button-sm p-button-rounded"
              style={{ backgroundColor: "#ef4444", color: "#fff" }}
              onClick={() => {
                onHandleLogout();
                setMenuVisible(false);
              }}
            />
          )}
        </div>
      </Dialog>
    </header>
  );
};

export default React.memo(Header);
