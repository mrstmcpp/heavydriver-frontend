import React from "react";
import Image from "../assets/page2.jpg";

export const PageTopBanner = ({ section }) => {
  return (
    <div className="relative w-full h-60 sm:h-80 lg:h-[300px] overflow-hidden">
      {/* Blurred background image */}
      <img
        src={Image}
        alt="Banner"
        className="w-full h-full object-cover filter blur-sm scale-105"
      />
      
      {/* Overlay with dark tint */}
      <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 z-10">
          {section}
        </h1>
      </div>
    </div>
  );
};
