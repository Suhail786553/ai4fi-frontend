import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie, Line } from "react-chartjs-2";
import { FaHome } from "react-icons/fa";
import 'chart.js/auto';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleBackToHome = () => {
    navigate("/");
  };

  // Data for Virtual Try-On
  const tryOnBarChartData = {
    labels: ['Tops', 'Bottoms', 'Shoes', 'Accessories'],
    datasets: [
      {
        label: 'Items Tried On',
        data: [120, 95, 80, 60],
        backgroundColor: '#3B82F6',
        borderRadius: 10,
      },
      {
        label: 'Items Purchased',
        data: [30, 25, 20, 15],
        backgroundColor: '#10B981',
        borderRadius: 10,
      },
    ],
  };

  // Data for Model Generator (All Months)
  const modelLineChartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Models Generated',
        data: [50, 60, 80, 120, 150, 200, 220, 250, 270, 300, 320, 350],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Successful Models',
        data: [45, 55, 75, 110, 140, 190, 210, 240, 260, 290, 310, 340],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // User Engagement (Combined)
  const pieChartData = {
    labels: ['Models Generated', 'Virtual Try-Ons', 'Items Purchased'],
    datasets: [
      {
        data: [180, 120, 90],
        backgroundColor: ['#4F46E5', '#3B82F6', '#10B981'],
      },
    ],
  };

  if (!user) return <p className="text-center text-gray-300">Loading...</p>;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-800 p-4 shadow-md rounded-md mb-6">
        <h1 className="text-xl font-bold text-gray-100">AI4FI Dashboard</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 flex items-center"
          onClick={handleBackToHome}
        >
          <FaHome className="mr-2" /> Back to Home
        </button>
      </header>

      {/* Welcome Section */}
      <div className="mb-6 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-100">
          Welcome, {user.name}!
        </h2>
        <p className="text-gray-400">
          Explore AI-powered model generation and virtual try-on features.
        </p>
      </div>

      {/* Virtual Try-On Statistics */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-gray-100 mb-4">
          Virtual Try-On Statistics
        </h3>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <Bar data={tryOnBarChartData} options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top', labels: { color: '#ffffff' } },
            },
            scales: {
              x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
              y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
            },
          }} />
        </div>
      </section>

      {/* Model Generator Statistics */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-black mb-4">
          Model Generator Statistics
        </h3>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <Line data={modelLineChartData} options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top', labels: { color: '#ffffff' } },
            },
            scales: {
              x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
              y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
            },
          }} />
        </div>
      </section>

      {/* User Engagement Section */}
      <section className="mb-8 bg-grey">
        <h3 className="text-xl font-bold text-black mb-4">
          User Engagement Overview
        </h3>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <Pie data={pieChartData} options={{
            plugins: { legend: { display: true, labels: { color: '#ffffff' } } },
          }} />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;


