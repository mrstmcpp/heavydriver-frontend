import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MeetTheFounder = () => {
  return (
    <div className="bg-[#0f0f0f] text-yellow-400 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* Founder Image */}
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/mrstm.jpg"
            alt="Founder"
            className="rounded-2xl shadow-lg border-[3px] border-yellow-400 w-full max-w-sm aspect-[3/4] object-cover 
                       transition-all duration-500 hover:rotate-0 hover:scale-105 hover:shadow-[0_0_35px_#facc15]"
            style={{ rotate: "-4deg" }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Founder Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-yellow-300">
            Meet the Mind Behind the Mission
          </h2>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Hi, I’m <span className="text-yellow-200 font-semibold">Satyam Prajapati</span>.
            What began as a simple idea to make daily travel smoother has grown
            into a modern ride-hailing ecosystem — built with passion, 
            technology, and a commitment to a cleaner EV-first future.
          </p>

          <p className="text-gray-400 mb-8 text-base">
            From system design to deep tech architecture, I’ve poured knowledge
             into creating a platform that balances **speed**, **safety**, and 
            **innovation** for drivers and riders alike.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/meet-the-man-behind"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              Read My Story →
            </Link>

            <a
              href="https://mrstm.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition"
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
