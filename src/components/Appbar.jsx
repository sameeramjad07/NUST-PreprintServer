import React, {useState} from 'react'
import nustLogo from '../assets/nustLogo.png'

const Appbar = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 shadow-md">
      {/* Top Navbar */}
      <div className="container mx-auto py-4 flex justify-between items-center px-4">
        {/* University Logo and Name */}
        <div className="flex items-center">
          <img src={nustLogo} alt="University Logo" className="h-10 w-10 mr-2 rounded-full" />
          <span className="text-white text-lg font-poppins">National University of Sciences and Technology</span>
        </div>
        {/* Social Media Icons or Other Links */}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/nustofficial/" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Facebook</a>
          <a href="https://twitter.com/officialnust" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Twitter</a>
          <a href="https://www.linkedin.com/school/nustofficial/" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">LinkedIn</a>
        </div>
      </div>
      {/* Bottom Navbar */}
      <div className="bg-gray-700 p-6">
        <div className="container mx-auto py-4 flex justify-between items-center">
          {/* Preprint Server Name */}
          <span className="text-white text-2xl font-semibold font-poppins">NUST Preprint Server</span>
          {/* Search Bar */}
          <div className="relative">
            <input type="text" placeholder="Search..." className="py-2 pl-8 pr-4 rounded-full bg-gray-600 text-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out" />
            <svg className="absolute top-1/2 left-2 transform -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appbar