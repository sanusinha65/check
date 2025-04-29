import React, { useEffect, useRef, useState } from 'react';
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";
import Cookies from 'js-cookie';  // Add this import at the top
import MixpanelService from '../utils/mixpanel';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';

function DashboardHeader() {
  const { initials, email,  name, plugin_installed_at } = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      MixpanelService.trackLogout(email);

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Remove cookies
      Cookies.remove('outx_session', { path: '/' });
      
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  return (
    <>
    {isAuthenticated && plugin_installed_at  === false &&
          <div className="bg-gray-50">
            <p className="text-center py-2 text-gray-500 text-sm">
              Please install Chrome Extension to use OutX.
            </p>
          </div>
    }

      <nav className="flex items-center justify-between bg-white py-4 border-b-2 border-gray-100 w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center space-x-6">
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <div className="flex items-center">
              <img src={Logo} alt="logo" className="lg:w-10 w-8 h-auto" />
              <span className="font-bold lg:text-2xl text-xl text-[#6241D3]">OUTX</span>
              </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-600">
            <Link to="/lists">
              <li className="cursor-pointer text-[15px] flex gap-x-1">
              <svg data-v-fd5b2a41="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-500"><path d="M12 10.75L5.75 7.75V7.5L12 4.5L18.25 7.5L18.25 7.75L12 10.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.25 11L18.25 11.75L12 15L5.75 11.75V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.25 15V15.75L12 19L5.75 15.75V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <span>Lists</span>
              </li>
            </Link>
            <Link to="/tracking">
              <li className="cursor-pointer text-[15px] flex gap-x-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12H9M15 12H21M12 3V9M12 15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="grey" strokeWidth="2" fill="none" />
                </svg>
                <span>Tracking</span>
              </li>
            </Link>
            <Link to="/teams">
              <li className="cursor-pointer text-[15px] flex gap-x-1">
              <svg data-v-fd5b2a41="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-neutral-500"><circle cx="10.5" cy="8.5" r="2.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M5.75 19V16.25C5.75 15.1454 6.64543 14.25 7.75 14.25H13.25C14.3546 14.25 15.25 15.1454 15.25 16.25V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.25 19V16.25C19.25 15.1454 18.3546 14.25 17.25 14.25H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 11.25C16.0188 11.25 17.25 10.0188 17.25 8.5C17.25 6.98122 16.0188 5.75 14.5 5.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <span>Teams</span>
              </li>
            </Link>
          </ul>
  
        </div>

        {/* Mobile Dropdown Menu */}
        {isDropdownOpen && (
          <div ref={mobileMenuRef} className="absolute right-2 mt-50 z-10 w-56 bg-white border border-gray-300 rounded-lg shadow-md md:hidden">
            <ul className="p-2 text-sm text-gray-700">
              <Link to="/lists">
                <li className="p-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Lists</li>
              </Link>
              <Link to="/tracking">
                <li className="p-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Tracking</li>
              </Link>
              <Link to="/teams">
                <li className="p-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Teams</li>
              </Link>
            </ul>
          </div>
        )}

        <div className="relative flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 rounded-full bg-[#f2f0f8] flex items-center justify-center font-semibold cursor-pointer">
            {initials}
          </button>

          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            ☰
          </button>
        </div>

        {isOpen && (
          <div ref={dropdownRef} className="absolute right-2 mt-90 w-56 bg-white border border-gray-300 rounded-xl shadow-xl z-10">
            <div className="p-3 border-b border-gray-300 flex items-center gap-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold cursor-pointer">
                {initials}
              </div>
              <span>{name}</span>
            </div>

            <ul className="p-2">
              <Link to="/dashboard/settings/profile">
                <li 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <i className="fas fa-user"></i>
                  <span>Profile</span>
                </li>
              </Link>
              <Link to="/dashboard/settings/account">
                <li
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <i className="fas fa-building"></i>
                  <span>Account</span>
                </li>
              </Link>
              <Link to="/dashboard/settings/billing">
                <li 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <i className="fas fa-credit-card"></i>
                  <span>Billing</span>
                </li>
              </Link>
              <Link to="/dashboard/settings">
                <li 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <i className="fa-solid fa-gear"></i>
                  <span>Settings</span>
                </li>
              </Link>
              <li 
              className="flex items-center space-x-2 p-2 text-red-600 rounded-lg hover:bg-gray-100 cursor-pointer" 
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default DashboardHeader;
