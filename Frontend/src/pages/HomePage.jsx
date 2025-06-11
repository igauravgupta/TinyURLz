import React from 'react';
import HomePageImage from '../assets/HomePageImage.png';

const HomePage = () => {
  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between py-20 gap-10">
        {/* Text Section */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-sky-400 mb-4 leading-tight">
            Trim Your URLs. <br /> Expand Your Impact.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Turn long links into clean, branded URLs in seconds — with TinyURLz
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/auth"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 text-center">
          <img
            src={HomePageImage}
            alt="Trimly Hero"
            className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
