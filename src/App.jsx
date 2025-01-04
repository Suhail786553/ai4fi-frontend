import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'; // Adjust the path if your Navbar is in a different folder
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import Model from './Pages/Model/Model';

function App() {
  const currentPath = window.location.pathname;

  return (
    <Router>
      <div>
        {currentPath !== '/model' && <Navbar />} {/* Show Navbar for all routes except /model */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/model" element={<Model />} /> {/* Model Page Content */}
        </Routes>

        {currentPath !== '/model' && <Footer />} {/* Show Footer for all routes except /model */}
      </div>
    </Router>
  );
}

export default App;
