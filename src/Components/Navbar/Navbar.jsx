import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import img from "./logoai.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg rounded-lg sticky top-4 mx-auto w-[90%] lg:w-[80%] h-16 z-50">
      <div className="flex items-center justify-between px-4 lg:px-8 h-full">
        {/* Logo and Links */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img
                className="h-10 md:h-12 w-auto"
                src={img}
                alt="Logo"
                style={{ width: "150px" }}
              />
            </a>
          </div>

          {/* Desktop Links */}
          <ul
            className="hidden md:flex space-x-4"
            style={{ fontFamily: "Sans-Serif Noto-sans", fontSize: "15px" }}
          >
            <li
              className={
                currentPath === "/"
                  ? "text-purple-600 font-semibold"
                  : "text-gray-800 hover:text-purple-600"
              }
            >
              <a href="/">Home</a>
            </li>
            <li
              className={
                currentPath === "/products"
                  ? "text-purple-600 font-semibold"
                  : "text-gray-800 hover:text-purple-600"
              }
            >
              <a href="/products">Products</a>
            </li>
            <li
              className={
                currentPath === "/modelgallery"
                  ? "text-purple-600 font-semibold"
                  : "text-gray-800 hover:text-purple-600"
              }
            >
              <a href="/modelgallery">Model Gallery</a>
            </li>
            <li
              className={
                currentPath === "/usecases"
                  ? "text-purple-600 font-semibold"
                  : "text-gray-800 hover:text-purple-600"
              }
            >
              <a href="/usecases">Use Cases</a>
            </li>
            <li
              className={
                currentPath === "/about"
                  ? "text-purple-600 font-semibold"
                  : "text-gray-800 hover:text-purple-600"
              }
            >
              <a href="/about">About</a>
            </li>
            <li
              className={
                currentPath === "/contact"
                  ? "text-purple-600 font-semibold"
                  : "text-gray-800 hover:text-purple-600"
              }
            >
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <a
            href="/signup"
            className="px-3 py-1 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Log In
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-2">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <a href="/" className="text-gray-800 hover:text-purple-600">
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="text-gray-800 hover:text-purple-600"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/modelgallery"
                className="text-gray-800 hover:text-purple-600"
              >
                Model Gallery
              </a>
            </li>
            <li>
              <a href="/usecases" className="text-gray-800 hover:text-purple-600">
                Use Cases
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-800 hover:text-purple-600">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-800 hover:text-purple-600">
                Contact Us
              </a>
            </li>
            <a
              href="/login"
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition"
            >
              Login 
            </a>
            <a
              href="/signup"
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition"
            >
              Sign Up
            </a>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
