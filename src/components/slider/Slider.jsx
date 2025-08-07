import React, { useState, useEffect, useRef } from "react";
import "./slider.css";

const initialImages = [
  {
    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "DriveEase",
    description: "Book your next ride in seconds. <br /> Safe. Fast. Reliable.",
    rideInfo: {
      type: "Sports Car",
      time: "On Demand",
      fare: "₹400 - ₹750",
    },
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Lykan_HyperSport.jpg/960px-Lykan_HyperSport.jpg",
    title: "Night Owl",
    description: "Your ride is available 24/7. <br /> Travel anytime, anywhere.",
    rideInfo: {
      type: "Sedan",
      time: "Instant",
      fare: "₹120 - ₹250",
    },
  },
  {
    url: "https://caronphone.com/_next/image?url=https%3A%2F%2Fstatic.caronphone.com%2Fpublic%2Fbrands%2F24%2F278%2F278.webp&w=3840&q=75",
    title: "City Cruiser",
    description: "Navigate the city with comfort. <br /> Professional drivers, premium service.",
    rideInfo: {
      type: "SUV",
      time: "Scheduled",
      fare: "₹200 - ₹400",
    },
  },
];

const Slider = () => {
  const [slides, setSlides] = useState(initialImages);
  
  // NEW: Use a ref to hold the interval ID
  const intervalRef = useRef(null);

  const handleNext = () => {
    setSlides((prevSlides) => [...prevSlides.slice(1), prevSlides[0]]);
  };

  const handlePrev = () => {
    setSlides((prevSlides) => [
      prevSlides[prevSlides.length - 1],
      ...prevSlides.slice(0, prevSlides.length - 1),
    ]);
  };
  
  // NEW: useEffect hook to manage the interval for auto-sliding
  useEffect(() => {
    // Start the interval when the component mounts
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds (5000ms)

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalRef.current);
  }, []); // The empty dependency array ensures this runs only once on mount

  // NEW: Functions to pause and resume the slider on hover
  const pauseAutoSlide = () => {
    clearInterval(intervalRef.current);
  };
  
  const resumeAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  return (
    // NEW: Added onMouseEnter and onMouseLeave to the main container
    <div 
      className="slider-container" 
      onMouseEnter={pauseAutoSlide} 
      onMouseLeave={resumeAutoSlide}
    >
      <div id="slide">
        {slides.map((slide) => (
          <div
            className="item"
            key={slide.url}
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="content-overlay">
              <div className="content">
                <div className="left">
                  <h1 className="title">{slide.title}</h1>
                  <div
                    className="des"
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  />
                  <button>
                    Learn More
                    <i className="fa-solid fa-angle-right ml-2"></i>
                    <i className="fa-solid fa-angle-right"></i>
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                </div>
                <div className="right">
                  <h2>Ride Info</h2>
                  <ul>
                    <li>
                      <p>Vehicle Type</p>
                      <p>{slide.rideInfo.type}</p>
                    </li>
                    <li>
                      <p>Booking Time</p>
                      <p>{slide.rideInfo.time}</p>
                    </li>
                    <li>
                      <p>Fare Estimation</p>
                      <p>{slide.rideInfo.fare}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="directional">
        <button onClick={handlePrev}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <button onClick={handleNext}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Slider;