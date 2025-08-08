import React from 'react';
import Slider from '../components/slider/Slider';
import Features from '../components/homepage/Features';
import WhyRideWithUs from '../components/homepage/WhyUs';

const HomePage = () => {
  return (
    <div className="text-white">
      {/* Banner Image */}
      {/* <div className="relative w-full h-60 sm:h-80 lg:h-[400px] overflow-hidden"> */}
        <Slider />
      {/* </div> */}
      <Features />
      <WhyRideWithUs />
      
    </div>
  );
};

export default HomePage;
