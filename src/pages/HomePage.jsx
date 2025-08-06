import React from 'react';

const HomePage = () => {
  return (
    <div className="text-white">
      {/* Banner Image */}
      <div className="relative w-full h-60 sm:h-80 lg:h-[400px] overflow-hidden">
        <img
          src="/page.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400">Welcome to HeavyDriver</h1>
        </div>
      </div>

      
    </div>
  );
};

export default HomePage;
