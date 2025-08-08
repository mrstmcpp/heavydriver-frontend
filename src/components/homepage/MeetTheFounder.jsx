import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MeetTheFounder = () => {
  return (
    <div className="bg-black text-yellow-400 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image with tilt & hover border animation */}
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/mrstm.jpg" // Replace with actual image
            alt="Founder"
            className="rounded-2xl shadow-lg border-2 border-yellow-400 w-full max-w-sm aspect-[3/4] object-cover 
                       transition-all duration-500 hover:rotate-0 hover:scale-105 hover:shadow-[0_0_20px_#facc15]"
            style={{ rotate: "-3deg" }} // slight tilt
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-300">
            Meet the Man Behind
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Hi, I’m <span className="text-yellow-200 font-semibold">Satyam Prajapati</span>, 
            the mind and heart behind this platform.  
            What started as a small vision to improve daily travel has grown into 
            a modern ride-hailing solution built with passion, precision, and purpose.
          </p>

          <Link
            to="/meet-the-man-behind"
            className="inline-block px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
          >
            Read My Story →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MeetTheFounder;
