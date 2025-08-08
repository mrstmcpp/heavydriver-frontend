import { motion } from "framer-motion";
import OutlinedButton from "../../resusables/OutlinedButton";
const WhyRideWithUs = () => {
  return (
    <section className="relative bg-black py-20 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Text Content */}
        <div className="max-w-lg space-y-4 text-center md:text-left">
          <h4 className="text-yellow-400 tracking-widest font-semibold">
            WHY RIDE WITH US
          </h4>
          <h2 className="text-4xl font-bold">Comfort, Speed & Safety</h2>
          <p className="text-gray-300">
            Enjoy a premium experience with our well-trained drivers, timely pickups,
            and seamless online bookings. We care about your journey.
          </p>
          <OutlinedButton children={"Explore Services"} />
        </div>

        {/* Image Stack */}
        <div className="relative w-[320px] h-[400px] hidden md:block">
          {/* Yellow background block */}
          <div className="absolute top-0 left-0 w-[320px] h-[400px] bg-yellow-400 rotate-3 -z-10 rounded-xl " />

          {/* Main Taxi Image */}
          <motion.img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
            alt="Main Taxi"
            className="absolute top-0 left-0 w-[250px] h-[320px] object-cover rounded-xl shadow-xl hover:scale-105 hover:brightness-110 transition duration-300"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />

          {/* Top-right smaller image */}
          <motion.img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
            alt="Booking"
            className="absolute top-[-20px] right-[-50px] w-[130px] h-[130px] object-cover rounded-xl shadow-lg hover:scale-105 hover:brightness-110 transition duration-300"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          />

          {/* Bottom-left smaller image */}
          <motion.img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
            alt="Driver"
            className="absolute bottom-[-20px] left-[80px] w-[180px] h-[140px] object-cover rounded-xl shadow-lg hover:scale-105 hover:brightness-110 transition duration-300"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyRideWithUs;
