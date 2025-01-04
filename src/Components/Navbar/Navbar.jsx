import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import img from './logoai4fi.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  // let timeoutId;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="bg-white shadow-lg sticky top-0 h-20" style={{ zIndex: 50 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-10">
          {/* Logo */}
          <div className="flex-shrink-0">
           <a href="/"> <img className="h-20 w-auto md:h-20 w-20"
             src={img} alt="Logo"  
            style={{ width: "250px" }}/></a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <ul className="flex space-x-6" style={{ fontFamily: "Sans-Serif Noto-sans", fontSize: "16px" }}>
              <li className={`relative group ${currentPath === "/" ? "underline-active" : ""}`}>
                <a href="/" className="text-black-800 hover:text-purple-600">Home</a>
              </li>
              <li className={`relative group ${currentPath === "/products" ? "underline-active" : ""}`}>
                <a href="/products" className="text-purple-800 hover:text-black">Products</a>
              </li>
              <li className={`relative group ${currentPath === "/usecases" ? "underline-active" : ""}`}>
                <a href="/usecases" className="text-purple-800 hover:text-black">Use cases</a>
              </li>
              <li className={`relative group ${currentPath === "/about" ? "underline-active" : ""}`}>
                <a href="/about" className="text-purple-800 hover:text-black">About</a>
              </li>
              <li className={`relative group ${currentPath === "/contact" ? "underline-active" : ""}`}>
                <a href="/contact" className="text-purple-800 hover:text-black">Contact Us</a>
              </li>
            </ul>


            {/* Login and Signup Buttons */}
            <div className="flex space-x-4 ml-6">
              <a href="/login" className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-600 hover:text-white transition">
                Login
              </a>
              <a href="/signup" className="px-4 py-2 bg-purple-600 border border-purple-600 text-white rounded hover:bg-white hover:text-purple-600 transition">
                Signup
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center space-y-6 p-6 bg-white shadow-lg">
            <li><a href="/" className="text-gray-800 hover:text-gray-500">Home</a></li>
            <li><a href="/products" className="text-gray-800 hover:text-gray-500">Products</a></li>
            <li><a href="/usecases" className="text-gray-800 hover:text-gray-500">Use cases</a></li>
            <li><a href="/about" className="text-gray-800 hover:text-gray-500">About</a></li>
            <li><a href="/contact" className="text-gray-800 hover:text-gray-500">Contact Us</a></li>
            <a href="/login" className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-600 hover:text-white transition">
              Login
            </a>
            <a href="/signup" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              Signup
            </a>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;