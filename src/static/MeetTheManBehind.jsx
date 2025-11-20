import React from "react";
import { motion } from "framer-motion";
import { PageTopBanner } from "../components/PageTopBanner";
import PageMeta from "../components/common/PageMeta";

const MeetTheManBehind = () => {
  return (
    <div className="bg-[#0f0f0f] text-yellow-400 min-h-screen">
      <PageMeta page={"meetFounder"} />
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
            Founder • Developer • Music Producer
          </h3>

          <p className="text-gray-300 leading-relaxed mb-6">
            I’m a developer focused on clean architecture, real-time systems,
            and seamless user experiences. Alongside tech, I create music and
            produce digital content that fuels my creativity.
          </p>

          <p className="text-gray-300 leading-relaxed mb-8">
            Building this platform is the blend of my passion for engineering,
            creativity, and simple, effective solutions.
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            <a
              href="https://mrstm.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              Portfolio ↗
            </a>

            <a
              href="https://push.fm/fl/w1nzo0xy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              Music ↗
            </a>

            <a
              href="https://www.youtube.com/@mrstm_music"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              YouTube ↗
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MeetTheManBehind;
