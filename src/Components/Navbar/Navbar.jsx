import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
// import { useLocation } from "react-router-dom";
import img from "./logoai.png";
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const location = useLocation();
  // const currentPath = location.pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let timeoutId;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleDropdownMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    timeoutId = setTimeout(() => setIsDropdownOpen(false), 300);
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
      className="hidden md:flex space-x-4 text-purple-700"
      style={{ fontFamily: "Sans-Serif Noto-sans", fontSize: "15px" }}
    >
      {[
        { label: "Home", path: "/" },
        {
          label: "Offspring",
          path: "#",
          submenu: [
            { label: "Model Generator", path: "/model" },
            { label: "TryOn Room", path: "/virtualtryon" },
          ],
        },
        { label: "Model Gallery", path: "/modelgallery" },
        { label: "About", path: "/about" },
        { label: "Contact Us", path: "/contact" },
      ].map((link, index) => (
        <li
          key={index}
          className="relative group"
          onMouseEnter={link.submenu ? handleDropdownMouseEnter : null}
          onMouseLeave={link.submenu ? handleDropdownMouseLeave : null}
        >
          <div
            className={`flex items-center ${
              link.submenu ? "cursor-pointer" : ""
            } hover:opacity-80`}
          >
            <a href={link.path}>{link.label}</a>
            {link.submenu && (
              <FiChevronDown
                className={`ml-1 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
          {link.submenu && isDropdownOpen && (
            <ul className="absolute left-0 mt-2 bg-white shadow-md rounded-lg space-y-2 text-purple-700 p-2 z-10">
              {link.submenu.map((sublink, subIndex) => (
                <li
                  key={subIndex}
                  className="hover:opacity-80 hover:bg-purple-100 px-2 py-1 rounded"
                >
                  <a href={sublink.path}>{sublink.label}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <a
            href="/signup"
            className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-900 transition"
          >
            Log In
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-purple-700 focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-2">
          <ul className="flex flex-col items-center space-y-4 py-4 text-purple-700">
            {[
              { label: "Home", path: "/" },
              {
                label: "Offspring",
                path: "#",
                submenu: [
                  { label: "Model Generator", path: "/model" },
                  { label: "TryOn Room", path: "/virtualtryon" },
                ],
              },
              { label: "Model Gallery", path: "/modelgallery" },
              // { label: "Use Cases", path: "/usecases" },
              { label: "About", path: "/about" },
              { label: "Contact Us", path: "/contact" },
            ].map((link, index) => (
              <li
              key={index}
              className="relative group"
              onMouseEnter={link.submenu ? handleDropdownMouseEnter : null}
              onMouseLeave={link.submenu ? handleDropdownMouseLeave : null}
            >
              <div
                className={`flex items-center ${
                  link.submenu ? "cursor-pointer" : ""
                } hover:opacity-80`}
              >
                <a href={link.path}>{link.label}</a>
                {link.submenu && (
                  <FiChevronDown
                    className={`ml-1 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
              {link.submenu && isDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white shadow-md rounded-lg space-y-2 text-purple-700 p-2 z-10">
                  {link.submenu.map((sublink, subIndex) => (
                    <li
                      key={subIndex}
                      className="hover:opacity-80 hover:bg-purple-100 px-2 py-1 rounded"
                    >
                      <a href={sublink.path}>{sublink.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            ))}
            <a
              href="/login"
              className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition"
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
