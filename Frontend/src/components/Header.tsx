import React, { useState, KeyboardEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from '../context/AuthProvider'; // Using context instead of utils

const SkillNLogo: React.FC = () => {
  const handleKeyDown = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.location.href = '/';
    }
  };

  return (
    <img
      src="/skilln-logo.png"
      alt="Logo"
      className="w-24 h-24 object-contain cursor-pointer"
      tabIndex={0}
      aria-label="Go to homepage"
      onClick={() => (window.location.href = '/')}
      onKeyDown={handleKeyDown}
      draggable={false}
    />
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState<boolean>(false);

  const { authUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Normalize path for active check (remove trailing slash)
  const currentPath = location.pathname.replace(/\/$/, '');

  // Services list for reuse
  const services = [
    { label: 'Courses', path: '/courses' },
    { label: 'Resume Scan', path: '/analyzer' },
    { label: 'Interview Coach', path: '/interview' },
    { label: 'LinkedIn Boost', path: '/linkedin-boost' },
    { label: 'Smart Prep', path: '/smart-prep' },
  ];

  // Helper: Check if service is active page
  const isServiceActive = (path: string) => {
    return currentPath === path;
  };

  // Helper: Check if main menu item is active
  const isMenuActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 transition-all duration-300 w-full">
      <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-10">
        {/* Logo */}
        <SkillNLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium relative">
          <button
            onClick={() => navigate('/')}
            className={`hover:text-primary-400 transition duration-200 ${isMenuActive('/') ? 'text-primary-400 font-semibold' : ''
              }`}
          >
            HOME
          </button>
          <button
            onClick={() => navigate('/about')}
            className={`hover:text-primary-400 transition duration-200 ${isMenuActive('/about') ? 'text-primary-400 font-semibold' : ''
              }`}
          >
            ABOUT
          </button>
          <button
            onClick={() => navigate('/blog')}
            className={`hover:text-primary-400 transition duration-200 ${isMenuActive('/blog') ? 'text-primary-400 font-semibold' : ''
              }`}
          >
            BLOG
          </button>

          {/* SERVICES Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              className={`flex items-center hover:text-primary-400 transition duration-200 select-none ${services.some((s) => isServiceActive(s.path)) ? 'text-primary-400 font-semibold' : ''
                }`}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
            >
              PRODUCTS
              <span className="ml-1 text-xs">
                {isServicesOpen ? (
                  <ArrowDropUpIcon style={{ fontSize: 32 }} />
                ) : (
                  <ArrowDropDownIcon style={{ fontSize: 32 }} />
                )}
              </span>
            </button>

            {isServicesOpen && (
              <div
                className="
                  fixed top-[50px] left-1/2 -translate-x-1/2
                  bg-neutral-950 border border-gray-700 rounded-md shadow-lg
                  w-[600px] h-[180px]
                  flex flex-col items-center z-50
                  transition-all duration-300 ease-in-out
                "
              >
                {/* Heading */}
                <div className="text-white font-semibold text-md py-2 border-b border-gray-700 w-full text-center">
                  Our Products
                </div>

                {/* Buttons Section */}
                <div className="flex justify-between items-top w-full h-full px-2 py-2">
                  {services.map(({ label, path }, index, arr) => (
                    <React.Fragment key={label}>
                      <button
                        onClick={() => {
                          navigate(path);
                          setIsServicesOpen(false);
                        }}
                        className={`
                          flex-grow px-4 py-3 text-sm text-center
                          hover:text-primary-400 bg-transparent
                          hover:bg-gray-900 transition-all duration-300
                          h-full focus:outline-none relative group
                          ${isServiceActive(path)
                            ? 'text-primary-400 font-semibold'
                            : 'text-white'
                          }
                        `}
                        tabIndex={0}
                      >
                        <span className="relative z-10">{label}</span>
                        <div
                          className="
                            absolute bottom-0 left-1/2 -translate-x-1/2
                            w-0 h-0.5 bg-primary-400 opacity-0
                            group-hover:w-4/5 group-hover:opacity-100 transition-all duration-300
                          "
                        ></div>
                      </button>

                      {/* Vertical Divider */}
                      {index !== arr.length - 1 && (
                        <div className="h-[70%] w-px bg-gray-700 my-auto" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {authUser ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/mylearning")}
                className="text-gray-300 hover:text-white transition"
              >
                My Learning
              </button>
              <div
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-white text-xs font-bold">{authUser?.fullname ? authUser.fullname.charAt(0).toUpperCase() : 'U'}</span>
                </div>
                <span className="text-sm font-medium">{authUser?.fullname || authUser?.name || 'User'}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-white text-white rounded hover:bg-red-600 hover:text-white transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm border border-white text-white rounded hover:bg-white hover:text-black transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-6 py-4 divide-y divide-gray-700 bg-black border-t border-gray-800 space-y-3">
          {/* Main Links */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/');
            }}
            className={`block py-2 text-left text-sm font-medium hover:text-primary-400 transition w-full ${isMenuActive('/') ? 'text-primary-400 font-semibold' : ''
              }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/about');
            }}
            className={`block py-2 text-left text-sm font-medium hover:text-primary-400 transition w-full ${isMenuActive('/about') ? 'text-primary-400 font-semibold' : ''
              }`}
          >
            About
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/blog');
            }}
            className={`block py-2 text-left text-sm font-medium hover:text-primary-400 transition w-full ${isMenuActive('/blog') ? 'text-primary-400 font-semibold' : ''
              }`}
          >
            Blog
          </button>

          {/* Services with toggle */}
          <div>
            <button
              onClick={() => setIsMobileServicesOpen((prev) => !prev)}
              className={`flex justify-between items-center w-full py-2 text-left text-sm font-medium hover:text-primary-400 transition ${services.some((s) => isServiceActive(s.path)) ? 'text-primary-400 font-semibold' : ''
                }`}
              aria-expanded={isMobileServicesOpen}
              aria-controls="mobile-services-submenu"
            >
              Products
              <span className="ml-2">
                {isMobileServicesOpen ? (
                  <ArrowDropUpIcon style={{ fontSize: 28 }} />
                ) : (
                  <ArrowDropDownIcon style={{ fontSize: 28 }} />
                )}
              </span>
            </button>
            {isMobileServicesOpen && (
              <div
                id="mobile-services-submenu"
                className="pl-4 mt-2"
              >
                {services.map(({ label, path }, index, arr) => (
                  <React.Fragment key={label}>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate(path);
                      }}
                      className={`block w-full py-2 text-left text-sm font-medium hover:text-primary-400 transition ${isServiceActive(path) ? 'text-primary-400 font-semibold' : ''
                        }`}
                    >
                      {label}
                    </button>
                    {/* Horizontal Divider */}
                    {index !== arr.length - 1 && (
                      <hr className="border-gray-700 my-1" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 flex flex-col space-y-2">
            {authUser ? (
              <>
                <div className="flex items-center space-x-2 text-gray-300 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-black to-neutral-800 rounded-full flex items-center justify-center">
                    <UserIcon size={16} className="text-white" />
                  </div>
                  <span className="text-sm">{authUser?.fullname || authUser?.name || 'User'}</span>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/mylearning");
                  }}
                  className="w-full text-center px-4 py-2 text-sm text-white bg-gray-800 rounded hover:bg-gray-700 transition"
                >
                  My Learning
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm border border-white text-white rounded hover:bg-red-600 hover:text-white transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full px-4 py-2 text-sm border border-white text-white rounded hover:bg-white hover:text-black transition"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                  className="w-full px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;