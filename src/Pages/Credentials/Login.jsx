import  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig'; // Adjust path if needed
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors
  
    try {
      // 1️⃣ Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
  
      // 2️⃣ Get Firebase User Data
      const user = userCredential.user;
      const idToken = await user.getIdToken(); // Get Firebase auth token
  
      // 3️⃣ Send Token to Your Backend for Verification & Session Handling
      const baseURL = window.location.hostname === "localhost"
        ? "http://localhost:5000/api/auth/login"
        : "https://ai4fi-backend.onrender.com/api/auth/login";
  
      const response = await axios.post(baseURL, {
        email: loginData.email,
        firebaseToken: idToken, // Send Firebase token for validation
      });
  
      const { token, user: backendUser } = response.data;
  
      // 4️⃣ Store Data in LocalStorage for Multi-Device Login
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(backendUser));
      alert(`Hello, ${backendUser.name}! You have successfully logged in.`);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        // Specific Firebase error for invalid credentials
        setError("The credentials you entered are invalid. Please sign up first.");
      } else if (err.response) {
        // Server responded with an error
        if (err.response.status === 401) {
          setError("Invalid credentials. Please check your email and password.");
        } else {
          setError("An error occurred while logging in. Please try again later.");
        }
      } else if (err.request) {
        // No response from the server
        setError("Unable to reach the server. Please check your internet connection.");
      } else {
        // Firebase or other errors
        if (err.code === "auth/invalid-email") {
          setError("The email address is not valid.");
        } else if (err.code === "auth/user-not-found") {
          setError("No user found with this email.");
        } else if (err.code === "auth/wrong-password") {
          setError("The password you entered is incorrect.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
  
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const animationLeft = {
    hidden: { x: "-100vw", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  const animationRight = {
    hidden: { x: "100vw", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col h-auto justify-center items-center bg-white pb-16">
      <div className="max-w-7xl w-full flex flex-col md:flex-row justify-center items-center">
        {/* Left Div with Animation */}
        <motion.div
          className="flex flex-col w-full md:w-1/2 justify-center items-center md:items-start text-center md:text-left px-4 py-8"
          initial="hidden"
          animate="visible"
          variants={animationLeft}
        >
          <h6 className="text-[#1D1E20] text-[25px] font-semibold mb-6">
            Welcome Back
          </h6>
          <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-10 text-[#904af2]">
            Please login to continue
          </h2>
          <div className="h-px w-3/4 bg-gray-800 mb-6"></div>
          <div className="flex justify-center md:justify-start items-center space-x-4">
            <MdOutlineEmail className="text-3xl" />
            <div>
              <p className="font-semibold">Email</p>
              <p>query@apricityts.com</p>
            </div>
          </div>
        </motion.div>

        {/* Right Div with Login Form and Animation */}
        <motion.div
          className="flex flex-col w-full md:w-2/5 shadow-lg p-12 bg-white rounded-lg"
          initial="hidden"
          animate="visible"
          variants={animationRight}
        >
          <h4 className="text-[#1D1E20] text-[30px] font-semibold mb-6 text-[#904af2]">
            Login to your account
          </h4>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email */}
              <div>
                <p className="mb-2">Email</p>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  required
                />
              </div>

              {/* Password */}
              <div>
      <p className="mb-2">
        Password <span className="text-xs text-gray-500">(Must be at least 6 characters)</span>
      </p>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-md text-black pr-10"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 text-white rounded-md shadow-lg ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#904af2]"
                }`}
                style={{ borderRadius: "40px", fontSize: 19 }}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-[#904af2] hover:text-[#7a3ccd] transition font-semibold"
            >
              Signup
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;