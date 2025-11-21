import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MeetTheFounder = () => {
  return (
    <div className="bg-[#0f0f0f] text-yellow-400 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* Founder Image */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/mrstm.jpg"
            alt="Founder"
            className="rounded-full shadow-xl border-4 border-yellow-400 w-32 h-32 md:w-40 md:h-40 object-cover 
                       transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_#facc15]"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>

        {/* Founder Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-yellow-300">
            Meet the Mind Behind the Mission
          </h2>

          <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-5 max-w-3xl mx-auto">
            Hi, I’m <span className="text-yellow-200 font-semibold">Satyam Prajapati</span>.
            What began as a simple idea to make daily travel smoother has grown
            into a modern ride-hailing ecosystem — built with passion, 
            technology, and a commitment to a cleaner EV-first future.
          </p>

          <p className="text-gray-400 mb-8 text-sm md:text-base max-w-2xl mx-auto">
            From system design to deep tech architecture, I’ve poured knowledge
             into creating a platform that balances **speed**, **safety**, and 
            **innovation** for drivers and riders alike.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/meet-the-man-behind"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 hover:shadow-lg"
            >
              Read My Story →
            </Link>

            <a
              href="https://mrstm.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              Visit Portfolio ↗
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MeetTheFounder;
