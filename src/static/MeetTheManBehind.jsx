import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTopBanner } from "../components/PageTopBanner";

const MeetTheFounder = () => {
  return (
    <>
      <PageTopBanner section={"Meet The Man Behind"} />
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
          

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Hi, I’m <span className="text-yellow-200 font-semibold">Satyam Prajapati</span>.
            What began as a simple idea to make daily travel smoother has grown
            into a modern ride-hailing ecosystem — built with passion,
            technology, and a commitment to a cleaner EV-first future.
          </p>

          <p className="text-gray-400 mb-8 text-base">
            From system design to deep tech architecture, I’ve poured knowledge
            into creating a platform that balances <b>speed</b>, <b>safety</b>, and
            <b> innovation</b> for drivers and riders alike.
          </p>

          {/* Contact Info */}
          <div className="mb-10">
            <p className="text-yellow-300 font-semibold text-lg">Contact</p>
            <p className="text-gray-300 mt-1">
              📞 <a href="tel:+919452549006" className="hover:text-yellow-400">+91 94525 49006</a>
            </p>
            <p className="text-gray-300">
              📧 <a
                href="mailto:satyamprajapati2k3@gmail.com"
                className="hover:text-yellow-400"
              >
                satyamprajapati2k3@gmail.com
              </a>
            </p>
          </div>

          {/* Social Links / Connect With Me */}
          <div className="mb-10">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-3 text-yellow-400">
              Connect With Me
            </h4>

            <p className="text-sm text-gray-400 mb-6">
              Follow my work, updates, music, and tech content.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <a
                href="https://mrstm.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-yellow-400 hover:bg-[#1f1f1f] transition-all duration-300 group"
              >
                <i className="pi pi-globe text-yellow-400 text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-300 group-hover:text-yellow-400 font-medium">Portfolio</span>
              </a>

              <a
                href="https://github.com/mrstmcpp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-yellow-400 hover:bg-[#1f1f1f] transition-all duration-300 group"
              >
                <i className="pi pi-github text-yellow-400 text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-300 group-hover:text-yellow-400 font-medium">GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/mrstmcpp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-yellow-400 hover:bg-[#1f1f1f] transition-all duration-300 group"
              >
                <i className="pi pi-linkedin text-yellow-400 text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-300 group-hover:text-yellow-400 font-medium">LinkedIn</span>
              </a>

              <a
                href="https://medium.com/@mrstmcpp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-yellow-400 hover:bg-[#1f1f1f] transition-all duration-300 group"
              >
                <i className="pi pi-clipboard text-yellow-400 text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-300 group-hover:text-yellow-400 font-medium">Medium</span>
              </a>

              <a
                href="https://youtube.com/@mrstm_music"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-yellow-400 hover:bg-[#1f1f1f] transition-all duration-300 group"
              >
                <i className="pi pi-youtube text-yellow-400 text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-300 group-hover:text-yellow-400 font-medium">YouTube</span>
              </a>

              <a
                href="https://push.fm/fl/w1nzo0xy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-yellow-400 hover:bg-[#1f1f1f] transition-all duration-300 group"
              >
                <i className="pi pi-headphones text-yellow-400 text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-300 group-hover:text-yellow-400 font-medium">Music</span>
              </a>

              <a
                href="https://instagram.com/mrstmcpp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-yellow-400 hover:bg-[#1f1f1f] transition-all duration-300 group"
              >
                <i className="pi pi-instagram text-yellow-400 text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-300 group-hover:text-yellow-400 font-medium">Instagram</span>
              </a>
            </div>
          </div>

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
    </>

  );
};

export default MeetTheFounder;
