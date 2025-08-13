import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import YellowButton from "../resusables/YellowButton";

const Footer = () => {
  return (
    <footer className="bg-black text-white relative z-10">
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/taxi_1693240769.jpg')" }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700">
        {/* Info */}
        <div>
          <h4 className="text-lg font-bold uppercase tracking-wide mb-2 border-b-2 border-yellow-400 w-max">
            Information
          </h4>

            <img src="/large_logo.png" alt="Logo" className="h-40 m-2 " />
            <div className="text-sm text-gray-300">
              HeavyDriver is a modern ride-hailing platform by Mr Stm,
              built with scalable microservices, real-time tracking, and secure
              communication—offering seamless transport for drivers and riders.
            </div>

        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold uppercase tracking-wide mb-2 border-b-2 border-yellow-400 w-max">
            Contact Info
          </h4>
          <div className="mt-4 space-y-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-400 text-black p-2 rounded-sm">
                <i className="pi pi-map-marker text-lg" />
              </div>
              <span>
                0, NBH-C, MNNIT Campus, Prayagraj, Uttar Pradesh, India
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-yellow-400 text-black p-2 rounded-sm">
                <i className="pi pi-phone text-lg" />
              </div>
              <span>+91 00000 00000</span>{" "}
              {/* Replace with your real/contact number if you'd like */}
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-yellow-400 text-black p-2 rounded-sm">
                <i className="pi pi-envelope text-lg" />
              </div>
              <span>mrstmmusic@gmail.com</span> {/* Replace with your email */}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-bold uppercase tracking-wide mb-2 border-b-2 border-yellow-400 w-max">
            Newsletter
          </h4>
          <p className="text-sm text-gray-300 mb-4">
            Signup for our weekly newsletter or updates.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-600 bg-black text-white placeholder-gray-400 outline-none"
            />
            <YellowButton onClick={() => console.log("Subscribed!")}>
              Subscribe
            </YellowButton>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4 border-t border-gray-700 text-xs text-gray-400">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-2 md:mb-0">
            © Copyright Mr Stm Inc. All rights reserved.
          </p>
          <div className="flex gap-2">
            Made By :
            <a href="https://github.com/mrstmcpp" className="hover:text-white">
              Mr Stm
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
