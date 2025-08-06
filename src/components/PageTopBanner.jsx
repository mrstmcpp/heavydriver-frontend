import React from "react";
import Image from "../assets/page2.jpg";

export const PageTopBanner = ({section}) => {
  return (
    <div className="relative w-full h-60 sm:h-80 lg:h-[400px] overflow-hidden">
      <img
        src={Image}
        alt="Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-opacity-60 flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400">
            {section}
        </h1>
      </div>
    </div>
  );
}