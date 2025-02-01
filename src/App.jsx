import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
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
import VirtualTryon from "./Pages/Model/VirtualTryon";
import Usecases from "./Pages/Usecases/Usecases";
import ChooseModelOption from "./Pages/ChooseModelOpt/ChooseModelOpt";
import ModelListPage from "./Pages/ModelListPage/ModelListPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();

  // Routes where Navbar should NOT appear
  const restrictedNavbarRoutes = [
    "/choose-option",
    "/model",
    "/dashboard",
    "/model-list",
    "/virtualtryon",
  ];

  // Routes where Footer should NOT appear
  const restrictedFooterRoutes = [
    "/choose-option",
    "/model",
    "/dashboard",
    "/model-list",
    "/virtualtryon",
    "/modelgallery",  // Footer will not appear on this page
  ];

  const isNavbarRestricted = restrictedNavbarRoutes.includes(location.pathname);
  const isFooterRestricted = restrictedFooterRoutes.includes(location.pathname);

  return (
    <div>
      {!isNavbarRestricted && <Navbar />} {/* Show Navbar if not restricted */}
      
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
        {/* <Route path='/choose-option' element={<ChooseModelOption />} />
         {/* Protect this route */}
         <Route element={<ProtectedRoute />}>
          <Route path="/choose-option" element={<ChooseModelOption />} />
        </Route>
        <Route path='/model-list' element={<ModelListPage />} />
      </Routes>

      {!isFooterRestricted && <Footer />} {/* Show Footer if not restricted */}
    </div>
  );
};

export default App;
