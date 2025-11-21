import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const cardVariants = {
  initial: { opacity: 0, transform: "translateY(40px)" },
  animate: (i) => ({
    opacity: 1,
    transform: "translateY(0)",
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      easing: "ease-out",
      fill: "forwards",
    },
  }),
};

const features = [
  {
    title: "Online Booking",
    description:
      "Book your ride online anytime, anywhere in just a few clicks.",
    image: "/booking.jpg",
  },
  {
    title: "Multiple Vehicle Support",
    description:
      "Choose from a variety of EV models—from compact to premium—based on your comfort and travel needs.",
    image: "/multiple-vehicles.webp",
  },
  {
    title: "Electric Vehicles Only",
    description:
      "Ride sustainably with our 100% electric fleet designed for cleaner transportation.",
    image: "/go-green.jpg",
  },
];


const Features = () => {
  return (
    <div className="bg-[#0f0f0f] text-white py-16 px-4">
      <div className="text-center mb-12">
        <h4 className="text-yellow-400 tracking-widest text-sm font-medium">
          RIDE SERVICE
        </h4>
        <h2 className="text-4xl font-bold mt-2">Best Ride Booking Service For You</h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            custom={i}
            className="bg-neutral-900 rounded-xl shadow-lg overflow-hidden border border-neutral-800"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover hover:scale-105 hover:brightness-110 transition duration-300"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
              <div className="mt-4">
                <button className="text-yellow-400 font-medium cursor-pointer hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
