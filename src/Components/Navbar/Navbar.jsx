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
    <nav className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 shadow-lg rounded-lg sticky top-4 mx-auto w-[90%] lg:w-[80%] h-16 z-50 text-white">
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
            {[
              { label: "Home", path: "/" },
              { label: "Products", path: "/products" },
              { label: "Model Gallery", path: "/modelgallery" },
              { label: "Use Cases", path: "/usecases" },
              { label: "About", path: "/about" },
              { label: "Contact Us", path: "/contact" },
            ].map((link, index) => (
              <li
                key={index}
                className={`${
                  currentPath === link.path
                    ? "font-semibold underline"
                    : "hover:opacity-80"
                }`}
              >
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <a
            href="/signup"
            className="px-3 py-1 border border-white text-white rounded-lg hover:bg-white hover:text-indigo-700 transition"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="px-3 py-1 bg-white text-indigo-700 rounded-lg hover:bg-gray-200 transition"
          >
            Log In
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 to-purple-800 shadow-lg rounded-lg mt-2">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {[
              { label: "Home", path: "/" },
              { label: "Products", path: "/products" },
              { label: "Model Gallery", path: "/modelgallery" },
              { label: "Use Cases", path: "/usecases" },
              { label: "About", path: "/about" },
              { label: "Contact Us", path: "/contact" },
            ].map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  className="hover:opacity-80"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <a
              href="/login"
              className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-indigo-700 transition"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-indigo-700 transition"
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
