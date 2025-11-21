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
            HeavyDriver is a modern ride-hailing platform by Mr Stm, built with
            scalable microservices, real-time tracking, and secure
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
              <span>+91 94525 49006</span>{" "}
              {/* Replace with your real/contact number if you'd like */}
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-yellow-400 text-black p-2 rounded-sm">
                <i className="pi pi-envelope text-lg" />
              </div>
              <span>support@heavydriver.app</span>{" "}
              {/* Replace with your email */}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-bold uppercase tracking-wide mb-2 border-b-2 border-yellow-400 w-max">
            Connect With Me
          </h4>

          <p className="text-sm text-gray-300 mb-4">
            Follow my work, updates, music, and tech content.
          </p>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            {/* Portfolio */}
            <a
              href="https://mrstm.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              <i className="pi pi-globe text-yellow-400 text-lg"></i>
              Portfolio
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/mrstmcpp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              <i className="pi pi-github text-yellow-400 text-lg"></i>
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/mrstmcpp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              <i className="pi pi-linkedin text-yellow-400 text-lg"></i>
              LinkedIn
            </a>

            {/* Medium */}
            <a
              href="https://medium.com/@mrstmcpp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              <i className="pi pi-clipboard text-yellow-400 text-lg"></i>
              Medium
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@mrstm_music"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              <i className="pi pi-youtube text-yellow-400 text-lg"></i>
              YouTube
            </a>

            {/* Music Page */}
            <a
              href="https://push.fm/fl/w1nzo0xy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              <i className="pi pi-headphones text-yellow-400 text-lg"></i>
              Music Page
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/mrstmcpp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              <i className="pi pi-instagram text-yellow-400 text-lg"></i>
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4 border-t border-gray-700 text-xs text-gray-400">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-2 md:mb-0">
            © Copyright HeavyDriver Inc. All rights reserved.
          </p>
          <div className="flex gap-2">
            Made By :
            <a href="https://mrstm.vercel.app" className="hover:text-white">
              Satyam Prajapati
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
