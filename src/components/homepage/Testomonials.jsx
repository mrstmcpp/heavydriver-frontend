import React from "react";

const testimonials = [
  {
    name: "Rohit S.",
    feedback:
      "Very smooth experience. The driver was polite and the ride was on time. Highly recommended!",
    location: "Prayagraj, India",
  },
  {
    name: "Anjali P.",
    feedback:
      "Easy to book and very affordable. Loved the dark-themed app and the real-time tracking feature!",
    location: "Lucknow, India",
  },
  {
    name: "Mohit R.",
    feedback:
      "Booked a ride for my parents and the driver was super helpful. Safe and reliable!",
    location: "Kanpur, India",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#0f0f0f] py-16 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">What Riders Say</h2>
        <p className="text-gray-400 mb-12">
          Real feedback from real people. We love making your journey better.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 shadow hover:shadow-yellow-400/20 transition"
            >
              <p className="text-yellow-400 text-lg font-semibold mb-2">
                {testimonial.name}
              </p>
              <p className="text-sm text-gray-300 italic mb-4">
                “{testimonial.feedback}”
              </p>
              <p className="text-xs text-gray-500">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
