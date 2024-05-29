import React, { useEffect, useState, useContext } from 'react';
import { useTheme } from '../ThemeContext';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    const { isDarkMode } = useTheme();
    return (
        <>
          <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-r from-[#121212] via-[#04101A] to-[#1a1625]' : 'bg-gradient-to-r from-blue-800 via-indigo-600 to-violet-900'}`}>
            <div className={`w-full min-h-screen rounded-xl max-w-6xl mx-auto p-8 ${isDarkMode ? 'bg-[#18181b]' : 'bg-white'}`}>
              <div className='flex items-center justify-center mt-16 flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-8'>
              <h1 className={`text-9xl font-extrabold tracking-widest ${isDarkMode ? 'text-white' : '' }`}>404</h1>
                <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                    Page Not Found
                </div>
                <button class="mt-5">
                <a
                    class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                >
                    <span
                    class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>

                    <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                    <Link to="/">Go Home</Link>
                    </span>
                </a>
                </button>
              </div>
            </div>
          </div>
         
        </>
      );
    };
    
    export default ErrorPage;