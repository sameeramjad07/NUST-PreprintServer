import React, {useState} from 'react'
import nustLogo from '../assets/nustLogo.png'
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Appbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
      };

  return (
    <div className="bg-gray-800 shadow-md">
      {/* Top Navbar */}
      <div className="container mx-auto py-4 flex justify-between items-center px-4">
        {/* University Logo and Name */}
        <a href="/">
            <div className="flex items-center justify-center md:justify-start">
              <img src={nustLogo} alt="University Logo" className="h-10 w-10 md:h-12 md:w-12 mr-2 rounded-full md:rounded-none" />
              <span className="text-white text-lg font-semibold md:block hidden">National University of Sciences and Technology</span>
            </div>
        </a>
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Social Media Icons or Other Links */}
        <div className="hidden md:flex space-x-4">
            <a href="https://www.facebook.com/ResearchNUST" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Facebook</a>
            <a href="https://twitter.com/Research_NUST" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Twitter</a>
            <a href="https://www.linkedin.com/company/research-nust/" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">LinkedIn</a> 
            <a href="https://www.youtube.com/@Research_NUST" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Youtube</a>        
        </div>
      </div>
      {/* Bottom Navbar */}
      <div className="bg-gray-700 p-6">
        <div className="container mx-auto py-4 flex justify-between items-center">
          {/* Preprint Server Name */}
          <span className="text-white text-lg font-semibold md:text-2xl">NUST Preprint Server</span>
          {/* Search Icon and Search Bar */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none w-4" onClick={toggleSearch}>
                <FiSearch />
            </button>
            {isSearchOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center" onClick={closeSearch}>
                <div className="w-4/5 md:w-1/2 bg-gray-700 rounded-lg p-4" onClick={(e) => e.stopPropagation()}>
                  <input type="text" placeholder="Search..." className="py-2 px-4 w-full rounded-md bg-gray-600 text-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out" />
                </div>
              </div>
            )}
          </div>
          {/* Search Bar and Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input type="text" placeholder="Search..." className="py-2 pl-8 pr-4 rounded-full bg-gray-600 text-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out" />
              <svg className="absolute top-1/2 left-2 transform -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            {/* Login Button */}
            <Link to="/login"  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out">Login</Link>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="bg-gray-800">
            <a href="/login" className="block py-2 px-4 text-white hover:bg-gray-700">Login</a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appbar