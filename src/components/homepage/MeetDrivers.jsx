import React from "react";
import { motion } from "framer-motion";
import YellowButton from "../../resusables/YellowButton";

const drivers = [
  {
    name: "Rajesh Kumar",
    role: "Luxury Ride Specialist",
    bio: "Over 12 years of experience in providing premium rides with utmost comfort and safety.",
    image: "/drivers/driver.png",
    profileUrl: "#"
  },
  {
    name: "Priya Sharma",
    role: "City Ride Expert",
    bio: "Specializes in quick and efficient city travel, ensuring timely pickups and drop-offs.",
    image: "/drivers/driver.png",
    profileUrl: "#"
  },
  {
    name: "Amit Verma",
    role: "Outstation Ride Pro",
    bio: "Experienced in long-distance routes with a focus on comfort and reliability.",
    image: "/drivers/driver.png",
    profileUrl: "#"
  }
];

export default function DriverCards() {
  return (
    <div className="bg-black py-16">
      {/* Section Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-white">
          Our <span className="text-yellow-400">Drivers</span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          Meet our professional and friendly drivers who ensure every journey is safe, comfortable, and memorable.
        </p>
      </motion.div>

      {/* Driver Cards */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {drivers.map((driver, index) => (
          <motion.div
            key={index}
            className="relative bg-[#1a1a1a] rounded-xl overflow-visible border border-gray-800 shadow-lg pt-12 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255, 215, 0, 0.4)",
            }}
          >
            {/* Floating Image */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-14">
              <motion.img
                src={driver.image}
                alt={driver.name}
                className="w-36 h-36 rounded-full border-4 border-yellow-400 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Card Content */}
            <div className="px-6 pb-6 mt-16 flex flex-col flex-grow">
              <motion.h3
                className="text-xl font-bold text-white text-center"
                whileHover={{ color: "#FFD700" }}
              >
                {driver.name}
              </motion.h3>
              <p className="text-yellow-400 text-sm text-center mb-4">
                {driver.role}
              </p>

              <p className="text-gray-400 text-sm mb-6 text-center flex-grow">
                {driver.bio}
              </p>

              {/* Fixed Button Position */}
              <div className="flex justify-center mt-auto">
                <YellowButton
                  children="View Profile"
                  onClick={() => (window.location.href = driver.profileUrl)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
