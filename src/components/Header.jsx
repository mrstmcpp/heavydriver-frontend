import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import useAuthStore from "../hooks/useAuthStore";
import useBookingStore from "../hooks/useBookingStore"
import axios from "axios";

import Logo from "../content/Logo";
import DesktopMenu from "../content/DesktopMenu";

import MobileMenu from "../content/MobileMenu";

const Header = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const authUser = useAuthStore((state) => state.authUser);
  const userId = useAuthStore((state) => state.userId);
  const loading = useAuthStore((state) => state.loading);
  const activeBooking = useBookingStore((state) => state.activeBooking);
  const loadingBooking = useBookingStore((state) => state.loadingBooking);
  const fetchActiveBooking = useBookingStore((state) => state.fetchActiveBooking);

  useEffect(() => {
    if (loading || loadingBooking) return;
    if (!userId || activeBooking) return;
    fetchActiveBooking();
  }, [userId]);

  const handleLogout = async () => {
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
    <header className="sticky top-0 z-50 bg-[#0b0b0b] border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <Logo onClick={() => navigate("/")} />

        <DesktopMenu
          navigate={navigate}
          activeBooking={activeBooking}
          authUser={authUser}
          onLogout={handleLogout}
        />

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button
            icon="pi pi-bars"
            className="p-button-rounded p-button-text text-yellow-400 hover:text-yellow-300"
            onClick={() => setMenuVisible(true)}
          />
        </div>
      </div>

      <MobileMenu
        visible={menuVisible}
        setVisible={setMenuVisible}
        activeBooking={activeBooking}
        navigate={navigate}
        authUser={authUser}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default React.memo(Header);
