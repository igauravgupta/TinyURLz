import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slice/authSlice';
import { logoutUser } from '../../features/auth/services/auth.api';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen === 'user') setIsOpen(false);
      }
    }
    if (isOpen === 'user') {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

const logoStyle = {
    height: '40px',
    margin: '0 auto',
};

  const handleLogout = async() => {
    const data = await logoutUser();
    dispatch(logout(data.user))
    navigate('/');
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
            {!isAuthenticated ? (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
              >
                Get Started
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(isOpen === 'user' ? false : 'user')}
                  className="flex items-center px-4 py-2 bg-gray-800 text-gray-200 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="mr-2">{user?.name || user?.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen === 'user' && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        navigate('/profile');
                      }}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
      {isOpen && isOpen !== 'user' && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
          <Link
            to="/"
            className="block text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          {!isAuthenticated ? (
            <Link
              to="/auth"
              className="block bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium shadow"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          ) : null}
        </div>
      )}
      {/* Mobile User Dropdown */}
      {isAuthenticated && isOpen === 'user' && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
          <div className="block text-gray-200 px-3 py-2 rounded-md text-base font-medium cursor-pointer bg-gray-800 border border-gray-700" onClick={() => setIsOpen(false)}>
            {user?.name || user?.email}
          </div>
          <Link
            to="/profile"
            className="block text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              navigate('/profile');
            }}
          >
            Profile
          </Link>
          <button
            onClick={() => { handleLogout(); setIsOpen(false); }}
            className="block w-full text-left text-red-600 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
