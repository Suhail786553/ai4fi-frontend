import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTachometerAlt, FaCogs, FaSignOutAlt } from "react-icons/fa";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white w-64 fixed h-full p-6 shadow-lg">
        <div className="text-lg font-bold mb-6">AI4FI Dashboard</div>
        <ul>
          <li className="mb-4 p-3 hover:bg-gray-700 rounded-lg transition">
            <FaTachometerAlt className="inline-block mr-2" />
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="mb-4 p-3 hover:bg-gray-700 rounded-lg transition">
            <FaCogs className="inline-block mr-2" />
            <Link to="/settings">Settings</Link>
          </li>
          <li className="p-3 hover:bg-gray-700 rounded-lg transition cursor-pointer" onClick={handleLogout}>
            <FaSignOutAlt className="inline-block mr-2" /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-auto p-6 bg-gray-100">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-md mb-6">
          <h1 className="text-xl font-bold text-gray-800">AI4FI Dashboard</h1>
          <button className="block md:hidden text-gray-800" onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>
        </header>

        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user.name}!</h2>
          <p className="text-gray-600">Explore AI-powered virtual try-on features and styling.</p>
        </div>

        {/* AI Features Section */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">AI Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Upload Your Look", "Virtual Try-On", "AI Styling"].map((feature, index) => (
              <div key={index} className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition">
                <h4 className="text-lg font-semibold text-gray-800">{feature}</h4>
                <p className="text-gray-600 mt-2">Experience AI-driven fashion intelligence.</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Explore</button>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["32 Photos Uploaded", "120 Styles Tried", "15 Favorites Saved"].map((stat, index) => (
              <div key={index} className="p-6 bg-white shadow-md rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800">{stat.split(" ")[1]}</h4>
                <p className="text-2xl font-bold text-blue-500 mt-2">{stat.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Redefine Your Style</h3>
          <p className="text-gray-600 mb-6">Experience AI-powered fashion intelligence.</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
            Get Started Now
          </button>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
