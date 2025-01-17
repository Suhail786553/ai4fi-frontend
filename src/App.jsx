import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'; // Adjust the path if your Navbar is in a different folder
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import Model from './Pages/Model/Model';
import Signup from './Pages/Credentials/Signup';
import Login from './Pages/Credentials/Login';
import ModelGallery from './Pages/ModelGallery/ModelGallery';
import About from './Pages/About/About';
import Dashboard from './Pages/Dashboard/Dashboard';
import SettingsPage from './Pages/Dashboard/SettingPage';
import VirtualTryon from './Pages/Model/VirtualTryon';

function App() {
  const currentPath = window.location.pathname;

  return (
    <Router>
      <div>
        {currentPath !== '/model' && currentPath !== '/dashboard' && currentPath !== '/virtualtryon' &&<Navbar />} {/* Show Navbar for all routes except /model */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/model" element={<Model />} /> {/* Model Page Content */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/modelgallery" element={<ModelGallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/virtualtryon" element={<VirtualTryon />} />
        </Routes>

        {currentPath !== '/model' && currentPath !== '/modelgallery'&& currentPath !== '/dashboard'&& currentPath !== '/virtualtryon'&& <Footer />} {/* Show Footer for all routes except /model */}
      </div>
    </Router>
  );
}

export default App;
