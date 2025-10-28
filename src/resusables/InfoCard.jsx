export const InfoCard = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/60 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
    <div className="text-yellow-400 text-lg">
      <i className={icon}></i>
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold text-lg">{value}</p>
    </div>
  </div>
);
