import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { getMenuItems } from "./MenuItems";
import ProfileMenu from "./ProfileMenu";
import useBookingStore from "../hooks/useBookingStore";

const MobileMenu = ({ visible, setVisible, navigate, authUser, onLogout }) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const menuItems = getMenuItems(navigate);
  const activeBooking = useBookingStore((state) => state.activeBooking);

  return (
    <Dialog
      visible={visible}
      onHide={() => {
        setVisible(false);
        setProfileVisible(false);
      }}
      header="Menu"
      className="md:hidden"
      draggable={false}
      closable
      dismissableMask
      style={{
        width: "90%",
        background: "rgba(15,15,15,0.95)",
        color: "white",
        borderRadius: "16px",
        paddingBottom: "1rem",
      }}
    >
      <div className="flex flex-col gap-4">
        {/* Profile Section */}
        {authUser && (
          <div
            onClick={() => setProfileVisible((v) => !v)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") &&
              setProfileVisible((v) => !v)
            }
            className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl border border-gray-700 w-full cursor-pointer"
          >
            <ProfileMenu
              authUser={authUser}
              onLogout={onLogout}
              setMenuVisible={setVisible}
              navigate={navigate}
              visible={profileVisible}
              onHide={() => setProfileVisible(false)}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-yellow-400">
                {authUser.name || "User"}
              </span>
              <span className="text-xs text-gray-400">
                {authUser.email || ""}
              </span>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item, idx) => (
            <div key={idx}>
              {item.items ? (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-yellow-500 text-sm pl-1">
                    {item.label}
                  </span>
                  {item.items.map((sub, subIdx) => (
                    <Button
                      key={subIdx}
                      label={sub.label}
                      icon={sub.icon}
                      className="w-full justify-start text-left !bg-yellow-400 hover:bg-gray-700 !border-none text-gray-200 py-3 rounded-lg"
                      onClick={() => {
                        sub.command();
                        setVisible(false);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Button
                  label={item.label}
                  icon={item.icon}
                  className="w-full justify-start text-left !bg-yellow-400 hover:bg-gray-700 !border-none text-gray-200 py-3 rounded-lg"
                  onClick={() => {
                    item.command();
                    setVisible(false);
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-3 mt-4">
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
            onClick={() =>
              window.open("https://heavydriver.app/engineering", "_blank")
            }
          />
          <Button
            label={activeBooking ? "Ongoing Ride" : "Book a Ride"}
            icon={activeBooking ? "pi pi-map-marker" : "pi pi-car"}
            className="w-full font-semibold text-black !bg-yellow-400 hover:bg-yellow-300 py-3 rounded-full !border-none"
            onClick={() => {
              navigate(
                activeBooking
                  ? `/rides/active/${activeBooking.bookingId}`
                  : "/rides/new"
              );
              setVisible(false);
            }}
          />
          {authUser && (
            <Button
              label="Logout"
              icon="pi pi-sign-out"
              className="w-full font-semibold text-white !bg-red-500 hover:bg-red-600 py-3 rounded-full !border-none"
              onClick={() => {
                onLogout();
                setVisible(false);
              }}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default MobileMenu;
