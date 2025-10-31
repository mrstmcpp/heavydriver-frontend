import React from "react";
import Slider from "../components/slider/Slider";
import Features from "../components/homepage/Features";
import WhyRideWithUs from "../components/homepage/WhyUs";
import Testimonials from "../components/homepage/Testomonials";
import MeetDrivers from "../components/homepage/MeetDrivers";
import MeetTheFounder from "../components/homepage/MeetTheFounder";
import PageMeta from "../components/common/PageMeta";

const HomePage = () => {
  return (
    <div className="text-white">
      <PageMeta page={"homepage"} />
      <Slider />
      <Features />
      <WhyRideWithUs />
      <Testimonials />
      <MeetDrivers />
      <MeetTheFounder />
    </div>
  );
};

export default HomePage;
