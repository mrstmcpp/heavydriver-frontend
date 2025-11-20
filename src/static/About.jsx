import React from "react";
import { PageTopBanner } from "../components/PageTopBanner";
import PageMeta from "../components/common/PageMeta";

const About = () => {
  return (
    <div className="bg-[#0f0f0f] text-gray-300">
      <PageMeta page={"about"} />

      {/* Banner */}
      <PageTopBanner section="About Us" />

      {/* Content */}
      <div className="max-w-screen-lg mx-auto px-4 py-10">

        {/* Who We Are */}
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
          Who We Are
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-6">
          Welcome to our EV-first ride-hailing platform — built to make everyday
          travel cleaner, smarter, and more reliable. We are a team of engineers,
          creators, and problem-solvers passionate about modern mobility and
          real-time technology.
        </p>

        {/* Our Mission */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-yellow-300">
          Our Mission
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-6">
          To build a sustainable transportation ecosystem using electric
          vehicles, efficient routing, and seamless digital experiences — giving
          riders a fast, safe, and eco-friendly way to move.
        </p>

        {/* What We Offer */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-yellow-300">
          What We Offer
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-4">
          Whether you need a quick city ride, an affordable auto, or a smooth
          two-wheeler pickup, our platform supports multiple EV ride options built
          around your comfort and convenience.
        </p>

        {/* Why Choose Us */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-yellow-300">
          Why Choose Us
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li>100% electric vehicle rides — car, auto, and bike options</li>
          <li>Real-time driver matching and live tracking</li>
          <li>Verified and trusted drivers</li>
          <li>Transparent distance-based pricing</li>
          <li>Fast, safe, and eco-friendly travel experiences</li>
          <li>24/7 customer support for instant assistance</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
