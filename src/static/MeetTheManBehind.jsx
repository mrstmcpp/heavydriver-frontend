import React from "react";
import { motion } from "framer-motion";
import { PageTopBanner } from "../components/PageTopBanner";

const MeetTheManBehind = () => {
  return (
    <div className="bg-black text-yellow-400 min-h-screen">
      {/* Top Banner */}
      <PageTopBanner section="Meet the Man Behind" />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <motion.img
          src="/mrstm.jpg" 
          alt="Founder"
          className="rounded-2xl shadow-lg border-2 border-yellow-400"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-300">
            Satyam Prajapati
          </h2>
          <h3 className="text-lg mb-6 italic text-yellow-200">
            Founder & Lead Developer
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Driven by a passion for clean code, scalable systems, and
            user-centric design, I built this platform to redefine convenience
            and efficiency in modern ride-hailing.  
            My journey started with solving small community transport issues, 
            and today, it’s grown into a robust, real-time solution connecting drivers and riders seamlessly.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Every feature in this app is backed by hours of brainstorming,
            problem-solving, and coffee.  
            I believe in creating technology that not only works — but works for people.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MeetTheManBehind;
