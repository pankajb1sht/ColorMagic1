import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Heart, Wrench, ImageDown, Shuffle, LogIn, Eraser } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export function Navbar() {
  const [showTools, setShowTools] = useState(false);
  const location = useLocation();
  const { user, signInWithGoogle, signOut } = useAuthStore();
  let toolsTimeout: NodeJS.Timeout;

  const handleToolsEnter = () => {
    clearTimeout(toolsTimeout);
    setShowTools(true);
  };

  const handleToolsLeave = () => {
    toolsTimeout = setTimeout(() => {
      setShowTools(false);
    }, 300); // Delay before hiding the dropdown
  };

  const handleDropdownEnter = () => {
    clearTimeout(toolsTimeout);
  };

  const handleDropdownLeave = () => {
    setShowTools(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Palette className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold">ColorMagic</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link
                to="/"
                className={`${
                  location.pathname === '/'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Explore
              </Link>
              <Link 
                to="/liked"
                className={`${
                  location.pathname === '/liked'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Heart className="w-4 h-4 mr-1" />
                Liked
              </Link>
              <div 
                className="relative"
                onMouseEnter={handleToolsEnter}
                onMouseLeave={handleToolsLeave}
              >
                <button 
                  className={`${
                    ['/random-palette', '/image-extractor', '/background-removal'].includes(location.pathname)
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Wrench className="w-4 h-4 mr-1" />
                  Tools
                </button>
                
                {/* Tools Dropdown */}
                {showTools && (
                  <div 
                    className="absolute z-10 left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="py-1" role="menu">
                      <Link
                        to="/random-palette"
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        <Shuffle className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                        Random Generator
                      </Link>
                      <Link
                        to="/image-extractor"
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        <ImageDown className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                        AI Color Extractor
                      </Link>
                      <Link
                        to="/background-removal"
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        <Eraser className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                        Remove Background
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={`/profile/${user.uid}`}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => signInWithGoogle()}
                  className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 transition-colors"
                >
                  <img src="/google.svg" alt="Google" className="w-4 h-4" />
                  Sign in with Google
                </button>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}