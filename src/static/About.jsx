import React from "react";
import pageImg from '../assets/page2.jpg';
import { PageTopBanner } from "../components/PageTopBanner";
const About = () => {
  return (
    <div className="">
      {/* Banner Image */}
      <PageTopBanner section="About Us" />

      {/* Content */}
      <div className="max-w-screen-lg mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
          Who We Are
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Welcome to HeavyDriver – your trusted companion in secure and reliable
          heavy vehicle transport. We are a team of passionate engineers,
          developers, and transportation professionals with the goal of
          revolutionizing logistics with the power of modern web technologies.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-yellow-300">
          Our Mission
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          To simplify heavy transportation bookings and real-time driver
          coordination through intuitive web solutions.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-yellow-300">
          Why Choose Us
        </h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm sm:text-base">
          <li>Live vehicle tracking</li>
          <li>Verified and experienced drivers</li>
          <li>Instant booking and transparent pricing</li>
          <li>Dedicated customer support</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
