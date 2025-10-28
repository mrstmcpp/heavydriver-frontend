import React from "react";

const Logo = ({ onClick }) => (
  <div
    className="flex items-center gap-2 cursor-pointer"
    onClick={onClick}
  >
    <img
      src="/banner_logo_trans.png"
      alt="Heavy Driver Logo"
      className="h-10 drop-shadow-md"
    />
  </div>
);

export default Logo;
