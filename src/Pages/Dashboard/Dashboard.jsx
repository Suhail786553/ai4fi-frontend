import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTachometerAlt, FaCogs, FaSignOutAlt, FaCode } from "react-icons/fa";
const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    // Fetch user data from query params or localStorage
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");
    const token = params.get("token");

    if (token && name && email) {
      const userData = { name, email };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block transition duration-300`}
      >
        <div className="p-4 text-lg font-bold">OCR Dashboard</div>
        <ul className="mt-4">
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaTachometerAlt className="mr-2" />
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaCode className="mr-2" />
            <Link to="/api">API</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaCogs className="mr-2" />
            <Link to="/settings">Settings</Link>
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4">
  {/* Header */}
  <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
    <h1 className="text-xl font-bold text-gray-800">AI4FI Dashboard</h1>
    <button
      className="block md:hidden text-gray-800"
      onClick={toggleSidebar}
    >
      <FaBars size={24} />
    </button>
  </header>

  {/* Welcome Section */}
  <div className="mt-6">
    <h2 className="text-2xl font-semibold text-gray-800">
      Welcome, {user.name}!
    </h2>
    <p className="text-gray-800">Email: {user.email}</p>
    <p className="text-gray-600 mt-2">
      Explore AI-powered virtual try-on features and personalized styling.
    </p>
  </div>

  {/* Fashion AI Features Section */}
  <section className="mt-8">
    <h3 className="text-xl font-bold text-gray-800 mb-4">AI Features</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Feature Card: Upload Your Look */}
      <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300">
        <h4 className="text-lg font-semibold text-gray-800">Upload Your Look</h4>
        <p className="text-gray-600 mt-2">
          Upload a photo and let AI suggest the perfect outfits that suit your style.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Upload Now
        </button>
      </div>

      {/* Feature Card: Virtual Try-On */}
      <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300">
        <h4 className="text-lg font-semibold text-gray-800">Virtual Try-On</h4>
        <p className="text-gray-600 mt-2">
          Experiment with different styles and outfits virtually before you buy.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Try Now
        </button>
      </div>

      {/* Feature Card: AI Styling Recommendations */}
      <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300">
        <h4 className="text-lg font-semibold text-gray-800">AI Styling</h4>
        <p className="text-gray-600 mt-2">
          Get AI-powered recommendations tailored to your preferences and occasions.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Get Recommendations
        </button>
      </div>
    </div>
  </section>

  {/* Statistics Section */}
  <section className="mt-8">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Your Activity</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800">Photos Uploaded</h4>
        <p className="text-2xl font-bold text-blue-500 mt-2">32</p>
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800">Styles Tried</h4>
        <p className="text-2xl font-bold text-green-500 mt-2">120</p>
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800">Favorites Saved</h4>
        <p className="text-2xl font-bold text-red-500 mt-2">15</p>
      </div>
    </div>
  </section>

  {/* Call-to-Action Section */}
  <section className="mt-12 text-center">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
      Ready to Redefine Your Style?
    </h3>
    <p className="text-gray-600 mb-6">
      Experience the power of Fashion AI and discover your best look.
    </p>
    <button className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-500 transition duration-300">
      Get Started Now
    </button>
  </section>
</main>

    </div>
  );
};

export default DashboardPage;