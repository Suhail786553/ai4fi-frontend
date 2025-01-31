// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar"; // Adjust the path if your Navbar is in a different folder
// import Footer from "./Components/Footer/Footer";
// import Home from "./Pages/Home/Home";
// import Contact from "./Pages/Contact/Contact";
// import Model from "./Pages/Model/Model";
// import Signup from "./Pages/Credentials/Signup";
// import Login from "./Pages/Credentials/Login";
// import ModelGallery from "./Pages/ModelGallery/ModelGallery";
// import About from "./Pages/About/About";
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import SettingsPage from "./Pages/Dashboard/SettingPage";
// import VirtualTryon from "./Pages/Model/VirtualTryon";
// import Usecases from "./Pages/Usecases/Usecases";
// import ChooseModelOption from "./Pages/ChooseModelOpt/ChooseModelOpt";
// import ModelListPage from "./Pages/ModelListPage/ModelListPage";

// function App() {
//   const currentPath = window.location.pathname;

//   return (
//     <Router>
//       <div>
//         {currentPath !== "/choose-option" &&
//           currentPath !== "/model" &&
//           currentPath !== "/dashboard" &&
//           currentPath !== "/model-list" &&
//           currentPath !== "/virtualtryon" && <Navbar />}{" "}
//         {/* Show Navbar for all routes except /model */}
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/contact' element={<Contact />} />
//           <Route path='/model' element={<Model />} /> {/* Model Page Content */}
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/modelgallery' element={<ModelGallery />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/dashboard' element={<Dashboard />} />
//           <Route path='/settings' element={<SettingsPage />} />
//           <Route path='/virtualtryon' element={<VirtualTryon />} />
//           <Route path='/usecases' element={<Usecases />} />
//           <Route path='/choose-option' element={<ChooseModelOption />} />
//           <Route path='/model-list' element={<ModelListPage />} />
//         </Routes>
//         {currentPath !== "/choose-option" &&
//           currentPath !== "/model" &&
//           currentPath !== "/model-list" &&
//           currentPath !== "/modelgallery" &&
//           currentPath !== "/dashboard" &&
//           currentPath !== "/virtualtryon" && <Footer />}{" "}
//         {/* Show Footer for all routes except /model */}
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"; // Adjust the path if your Navbar is in a different folder
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import Model from "./Pages/Model/Model";
import Signup from "./Pages/Credentials/Signup";
import Login from "./Pages/Credentials/Login";
import ModelGallery from "./Pages/ModelGallery/ModelGallery";
import About from "./Pages/About/About";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SettingsPage from "./Pages/Dashboard/SettingPage";
import Usecases from "./Pages/Usecases/Usecases";
import ChooseModelOption from "./Pages/ChooseModelOpt/ChooseModelOpt";
import ModelListPage from "./Pages/ModelListPage/ModelListPage";
import VirtualTryon from "./Components/VirtualTryOn/VirtualTryOn";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();

  // Define restricted routes where Navbar and Footer should not appear
  const restrictedRoutes = ["/choose-option", "/model", "/dashboard", "/model-list", "/virtualtryon", "/modelgallery"];

  // Check if the current route is restricted
  const isRestricted = restrictedRoutes.includes(location.pathname);

  return (
    <div>
      {!isRestricted && <Navbar />} {/* Show Navbar only if not restricted */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/model' element={<Model />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/modelgallery' element={<ModelGallery />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/virtualtryon' element={<VirtualTryon />} />
        <Route path='/usecases' element={<Usecases />} />
        <Route path='/choose-option' element={<ChooseModelOption />} />
        <Route path='/model-list' element={<ModelListPage />} />
      </Routes>
      {!isRestricted && <Footer />} {/* Show Footer only if not restricted */}
    </div>
  );
};

export default App;
