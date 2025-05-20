import React, { useState } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

const logoStyle = {
    height: '40px',
    margin: '0 auto',
};

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand */}
          <div className="flex items-center">
             <img
                src="/logo.png"
                alt="Trimly Logo"
                style={logoStyle}
              />
            <Link to="/" className="text-2xl font-bold text-blue-400 ml-2">
              Trimly
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-200 hover:text-blue-400 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-gray-200 hover:text-blue-400 px-3 py-2 text-sm font-medium"
            >
              Features
            </Link>
            <Link
              to="/auth"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
          <Link
            to="/"
            className="block text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
          >
            Features
          </Link>
          <Link
            to="/auth"
            className="block bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium shadow"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
