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
    <nav className="bg-white shadow-lg sticky top-0 h-20 z-50">
      <div className="flex items-center justify-between w-full px-4 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0 pl-4 lg:pl-0">
          <a href="/">
            <img
              className="h-16 md:h-20 w-auto"
              src={img}
              alt="Logo"
              style={{ width: "250px" }}
            />
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <ul className="flex space-x-6" style={{ fontFamily: "Sans-Serif Noto-sans", fontSize: "16px" }}>
            <li className={currentPath === "/" ? "text-purple-600 font-semibold" : "text-gray-800"}>
              <a href="/" className="hover:text-purple-600 transition">Home</a>
            </li>
            <li className={currentPath === "/products" ? "text-purple-600 font-semibold" : "text-gray-800"}>
              <a href="/products" className="hover:text-purple-600 transition">Products</a>
            </li>
            <li className={currentPath === "/modelshub" ? "text-purple-600 font-semibold" : "text-gray-800"}>
              <a href="/modelshub" className="hover:text-purple-600 transition">Models Hub</a>
            </li>
            <li className={currentPath === "/usecases" ? "text-purple-600 font-semibold" : "text-gray-800"}>
              <a href="/usecases" className="hover:text-purple-600 transition">Use Cases</a>
            </li>
            <li className={currentPath === "/about" ? "text-purple-600 font-semibold" : "text-gray-800"}>
              <a href="/about" className="hover:text-purple-600 transition">About</a>
            </li>
            <li className={currentPath === "/contact" ? "text-purple-600 font-semibold" : "text-gray-800"}>
              <a href="/contact" className="hover:text-purple-600 transition">Contact Us</a>
            </li>
          </ul>

          {/* Login and Signup Buttons */}
          <div className="flex space-x-4">
            <a
              href="/login"
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-600 hover:text-white transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Signup
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden pr-4">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center space-y-6 py-6">
            <li><a href="/" className="text-gray-800 hover:text-purple-600">Home</a></li>
            <li><a href="/products" className="text-gray-800 hover:text-purple-600">Products</a></li>
            <li><a href="/modelshub" className="text-gray-800 hover:text-purple-600">Models Hub</a></li>
            <li><a href="/usecases" className="text-gray-800 hover:text-purple-600">Use Cases</a></li>
            <li><a href="/about" className="text-gray-800 hover:text-purple-600">About</a></li>
            <li><a href="/contact" className="text-gray-800 hover:text-purple-600">Contact Us</a></li>
            <a
              href="/login"
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-600 hover:text-white transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Signup
            </a>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
