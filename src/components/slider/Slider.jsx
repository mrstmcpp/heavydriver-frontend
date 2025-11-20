import React, { useState, useEffect, useRef } from "react";
import "./slider.css";

import car1 from "../../assets/svgs/car1.svg";
import car2 from "../../assets/svgs/car2.svg";
import car3 from "../../assets/svgs/car3.svg";
import electricCar from "../../assets/svgs/electricCar.svg";


const initialImages = [
  {
    url: car1,
    text: {
      highlight: "Ride Booking Made Easy",
      headline: "Book a Ride in Seconds.",
      subtext:
        "Your everyday travel simplified with a smooth and fast booking flow.",
      cta: {
        label: "Book Now",
        link: "/rides/new",
      },
    },
  },
  {
    url: car2,
    text: {
      highlight: "Faster Driver Matching",
      headline: "Get a Driver Instantly.",
      subtext: "Near real-time matching with drivers closest to your pickup.",
      cta: {
        label: "Learn More",
        link: "https://heavydriver.app/engineering",
      }, // No button here
    },
  },
  {
    url: car3,
    text: {
      highlight: "Low Cost Rides",
      headline: "Affordable Pricing for Everyone.",
      subtext: "Transparent fare system with no hidden charges.",
      cta: null, // No button here
    },
  },
  {
    url: electricCar,
    text: {
      highlight: "Eco-Friendly EV Rides",
      headline: "Move Smart. Move Green.",
      subtext: "Enjoy comfortable rides with our all-electric fleet.",
      cta: null,
    },
  },
];

const Slider = () => {
  const [slides, setSlides] = useState(initialImages);
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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const pauseAutoSlide = () => clearInterval(intervalRef.current);
  const resumeAutoSlide = () =>
    (intervalRef.current = setInterval(() => handleNext(), 7000));

  return (
    <div
      className="slider-container"
      onMouseEnter={pauseAutoSlide}
      onMouseLeave={resumeAutoSlide}
    >
      <div id="slide">
        {slides.map((slide) => (
          <div className="item" key={slide.url}>
            <div className="content-overlay">
              <div className="content">
                {/* LEFT — Ride Info (glass panel) */}
                <div className="left slide-text">
                  <p className="slide-highlight">{slide.text.highlight}</p>

                  <h2 className="slide-headline">{slide.text.headline}</h2>

                  <p className="slide-subtext">{slide.text.subtext}</p>

                  {slide.text.cta && (
                    <a href={slide.text.cta.link} className="slide-cta">
                      {slide.text.cta.label}
                    </a>
                  )}
                </div>

                {/* RIGHT — SVG */}
                <div className="right">
                  <img src={slide.url} className="slide-svg text-center" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
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
