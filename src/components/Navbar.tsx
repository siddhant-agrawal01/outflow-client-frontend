import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 mb bg-blue-100 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.15)] sticky top-4 z-50 max-w-lg mx-auto flex justify-center space-x-4 transition-all duration-300 hover:bg-white/50">
      <NavLink
        to="/campaigns"
        className={({ isActive }: { isActive: boolean }) =>
          `px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out flex items-center ${
            isActive
              ? 'bg-gradient-to-br from-white/30 to-white/10 text-gray-800 shadow-inner border border-white/30'
              : 'text-gray-600 hover:bg-white/10 hover:text-gray-800 hover:scale-105'
          }`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
        Campaigns
      </NavLink>
      <NavLink
        to="/"
        end 
        className={({ isActive }: { isActive: boolean }) =>
          `px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out flex items-center ${
            isActive
              ? 'bg-gradient-to-br from-white/30 to-white/10 text-gray-800 shadow-inner border border-white/30'
              : 'text-gray-600 hover:bg-white/10 hover:text-gray-800 hover:scale-105'
          }`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Leads
      </NavLink>
    </nav>
  );
};

export default Navbar;
