import React from 'react';
import Slider from '../components/slider/Slider';
import Features from '../components/homepage/Features';
import WhyRideWithUs from '../components/homepage/WhyUs';
import Testimonials from '../components/homepage/Testomonials';
import MeetDrivers from '../components/homepage/MeetDrivers';
import MeetTheFounder from '../components/homepage/MeetTheFounder';

const HomePage = () => {
  return (
    <div className="text-white">
      {/* Banner Image */}
      {/* <div className="relative w-full h-60 sm:h-80 lg:h-[400px] overflow-hidden"> */}
        <Slider />
      {/* </div> */}
      <Features />
      <WhyRideWithUs />
      <Testimonials />
      <MeetDrivers />
      <MeetTheFounder />
    </div>
  );
};

export default HomePage;
