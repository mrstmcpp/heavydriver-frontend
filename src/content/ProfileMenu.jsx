import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import user from "../assets/user64.png";

const ProfileMenu = ({ authUser, onLogout, navigate }) => {
  const menuRef = useRef(null);

  const items = [
    {
      label: "My Profile",
      icon: "pi pi-user",
      command: () => navigate("/profile"),
    },
    { label: "My Rides", icon: "pi pi-car", command: () => navigate("/rides/all") },
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => navigate("/settings"),
    },
    { separator: true },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: onLogout,
        className: "text-red"
    },
  ];

  return (
    <div className="relative" onClick={(e) => menuRef.current.toggle(e)}>
      <img
        src={authUser.profilePic || user}
        alt="User Avatar"
        className="h-10 w-10 rounded-full border-2 border-yellow-400 cursor-pointer hover:scale-105 transition-transform"
        
      />
      <Menu
        model={items}
        popup
        ref={menuRef}
        className="text-gray-200 border rounded-lg shadow-lg"
        pt={{
          menuitem: {
            className: "hover:text-yellow-400 text-sm py-1",
          },
        }}
      />
    </div>
  );
};

export default ProfileMenu;
