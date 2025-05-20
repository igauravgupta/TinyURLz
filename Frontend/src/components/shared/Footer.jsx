import React from 'react';

const Footer = () => (
  <footer className="w-full bg-gray-900 border-t border-gray-800 py-6">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} TinyURLz. All rights reserved.</span>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="/about" className="text-gray-400 hover:text-blue-400 text-sm transition">About</a>
        <a href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition">Privacy</a>
        <a href="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
