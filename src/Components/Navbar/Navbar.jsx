import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa"; // Avatar Icon
import { auth } from "../../Pages/Firebase/firebaseConfig"; // Firebase config import karein
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom"; 
import img from "./logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // Firebase user state
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state for "Our Offering"
  const [loading, setLoading] = useState(true); // Loading state
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

  useEffect(() => {
    // Firebase authentication state track karein
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Agar user login hai to state update karein
      setLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe(); // Cleanup function jab component unmount ho
  }, []);

  const handleLogout = async () => {
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
    alert("You have successfully logged out!");
  };

  if (loading) {
    return null; // or a loading spinner
  }
  return (
    <nav className="bg-white shadow-lg rounded-lg sticky top-4 mx-auto w-[90%] lg:w-[80%] h-16 z-50">
      <div className="flex items-center justify-between px-4 lg:px-8 h-full">
        {/* Logo and Links */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex-shrink-0">
          <Link to="/"> {/* Use Link instead of <a> */}
            <img
              className="h-8 md:h-8 w-auto"
              src={img}
              alt="Logo"
              style={{ width: "100px" }}
            />
          </Link>
          </div>

          {/* Desktop Links */}
          <ul
            className="hidden md:flex space-x-4 text-purple-700"
            style={{ fontFamily: "Sans-Serif Noto-sans", fontSize: "15px" }}
          >
            {[
              { label: "Home", path: "/" },
              {
                label: "Our Offering",
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
                  <Link to={link.path}>{link.label}</Link>
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
                        <Link to={sublink.path}>{sublink.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* User Authentication (Right Corner) */}
        <div className="hidden md:flex space-x-4">
  {user ? (
    <div className="relative flex items-center">
      {/* Avatar Icon */}
      <FaUserCircle
        className="text-purple-700 text-2xl cursor-pointer"
        onClick={() => setAvatarDropdown(!avatarDropdown)}
      />
      
      {/* ✅ Show User Name */}
      <span className="text-purple-700 font-medium ml-2">{`Hello, ${user.displayName || "User"}`}</span>

      {/* Dropdown Menu (Appears Below Avatar) */}
      {avatarDropdown && (
        <ul className="absolute left-0 mt-28 bg-white shadow-md rounded-lg text-purple-700 p-2 z-10 w-36">
          <li className="hover:bg-purple-100 px-4 py-2 rounded cursor-pointer">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="hover:bg-purple-100 px-4 py-2 rounded cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      )}
    </div>
  ) : (
    <>
      <Link to="/login" className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-900 transition">
        Log In
      </Link>
      <Link to="/signup" className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition">
        Sign Up
      </Link>
    </>
  )}
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
                label: "Our Offering",
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
                  <Link to={link.path}>{link.label}</Link>
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
                        <Link to={sublink.path}>{sublink.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {user ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li onClick={handleLogout} className="cursor-pointer">Logout</li>
              </>
            ) : (
              <>
                <Link to="/signup" className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition">
                  Sign Up
                </Link>
                <Link to="/login" className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition">
                  Log In
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;