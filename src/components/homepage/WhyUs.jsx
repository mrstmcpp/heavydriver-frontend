import OutlinedButton from "../../resusables/OutlinedButton";
import evCar from "../../assets/svgs/ev.svg"
import { Link } from "react-router-dom";

const WhyRideWithUs = () => {
  return (
    <section className="relative bg-black py-20 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Text */}
        <div className="max-w-lg space-y-4 text-center md:text-left">
          <h4 className="text-yellow-400 tracking-widest font-semibold">WHY RIDE WITH US</h4>
          <h2 className="text-4xl font-bold">Comfort, Speed & Safety</h2>

          <p className="text-gray-300">
            We ensure fast driver matching with real-time ride updates,
            transparent distance-based pricing, and complete peace of mind as
            every driver goes through strict verification. Enjoy smooth pickups,
            secure rides, and a premium EV-first experience.
          </p>

          <OutlinedButton><Link to={"/rides/new"}>Explore Services</Link></OutlinedButton>
        </div>

        {/* Right Section: EV Image + Feature Cards */}
        <div className="flex flex-col items-center gap-6">

          {/* Main EV Image */}
          <img
            src={evCar}
            alt="Electric Vehicle"
            className="w-full h-[200px] object-contain rounded-xl shadow-xl"
          />

          {/* Features */}
          <div className="grid grid-cols-3 gap-5">

            {/* Verified Drivers */}
            <div className="flex flex-col text-center items-center gap-2 bg-neutral-900 p-5 rounded-xl">
              <i className="pi pi-bolt text-yellow-400 text-3xl"></i>
              <span className="text-lg font-semibold text-yellow-400">Electronic Vehicles</span>
            </div>
            <div className="flex flex-col text-center items-center gap-2 bg-neutral-900 p-5 rounded-xl">
              <i className="pi pi-check-circle text-yellow-400 text-3xl"></i>
              <span className="text-lg font-semibold text-yellow-400">Verified & Trusted Drivers</span>
            </div>

            {/* Real-time Tracking */}
            <div className="flex flex-col text-center items-center gap-2 bg-neutral-900 p-5 rounded-xl">
              <i className="pi pi-map-marker text-yellow-400 text-3xl"></i>
              <span className="text-lg font-semibold text-yellow-400">Real-time Tracking & Matching</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyRideWithUs;
