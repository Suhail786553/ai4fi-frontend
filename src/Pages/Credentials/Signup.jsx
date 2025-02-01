import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "", // For OTP input
  });
  const [isOtpSent, setIsOtpSent] = useState(false); // To track OTP sent status
  const [isOtpVerified, setIsOtpVerified] = useState(false); // To track OTP verification 
  const [loading, setLoading] = useState(false);//status
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false); // Loading state for OTP button
  const [loadingSignup, setLoadingSignup] = useState(false); // Loading state for SignUp button
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingSignup(true); // Start loading when submitting the form

    // Simulate the sign-up process (e.g., sending data to server)
    setTimeout(() => {
      alert('Sign Up successful');
      setLoadingSignup(false); // Stop loading after sign-up
    }, 3000); // Simulating network delay (3 seconds)
    setLoading(true);
    // setError(""); // Clear previous errors
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!isOtpVerified) {
      alert("Please verify your email with the OTP!");
      return;
    }

    try {
      const baseURL = window.location.hostname === "localhost"
        ? "http://localhost:5000/api/auth/signup" // Local development URL
        : "https://ai4fi-backend.onrender.com/api/auth/signup"; // Hosted backend URL

      await axios.post(baseURL, { name, email, password });

      alert("Signup successful! Now, please login.");
      navigate("/login");
    } catch (error) {

      alert(error.response?.data?.message || "Signup failed!");
    }
  };


  const handleSendOtp = async () => {
    setLoadingOtp(true); // Start loading when sending OTP
    // Simulate OTP sending process
    setTimeout(() => {
      setIsOtpSent(true);
      setLoadingOtp(false); // Stop loading after OTP is sent
    }, 2000); // Simulating network delay (2 seconds)
    const { email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }
    try {
      const baseURL = window.location.hostname === "localhost"
        ? "http://localhost:5000/api/auth/sendOtp"
        : "https://ai4fi-backend.onrender.com/api/auth/sendOtp";

      // Make the POST request
      const response = await axios.post(baseURL, { email });

      if (response.data.success) {
        setIsOtpSent(true);
        alert("OTP sent to your email.");
      } else {
        alert("Failed to send OTP.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error sending OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    const { email, otp } = formData;
    console.log("Email:", email, "OTP:", otp);  // Debugging log to ensure correct data

    try {
      const baseURL = window.location.hostname === "localhost"
        ? "http://localhost:5000/api/auth/verifyOtp"
        : "https://ai4fi-backend.onrender.com/api/auth/verifyOtp"
      const response = await axios.post(baseURL, { email, otp });
      console.log("Response:", response);  // Check the full response from the backend

      if (response.data.message === 'OTP verified successfully.') {
        setIsOtpVerified(true);
        alert("OTP verified successfully!");
      } else {
        alert("Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response ? error.response.data : error);  // Log the error message for better debugging
      alert("Error verifying OTP. Please try again.");
    }
  };




  return (
    <div className="flex flex-col h-auto justify-center items-center bg-white pb-16">
      <div className="max-w-7xl w-full flex flex-col md:flex-row justify-center items-center">
        {/* Left Div */}
        <motion.div
          className="flex flex-col w-full md:w-1/2 justify-center items-center md:items-start text-center md:text-left px-4 py-8"
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h6 className="text-[#1D1E20] text-[25px] font-semibold mb-6">Join Us Today</h6>
          <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-10" style={{ color: "#904af2", fontFamily: "sans-serif" }}>
            Create your account with us!
          </h2>
          <div className="h-px w-3/4 bg-gray-800 mb-6"></div>
          <div className="flex justify-center md:justify-start items-center space-x-4">
            <MdOutlineEmail className="text-3xl" />
            <div>
              <p className="font-semibold">Email</p>
              <p>support@apricityts.com</p>
            </div>
          </div>
        </motion.div>

        {/* Right Div */}
        <motion.div
          className="flex flex-col w-full md:w-2/5 shadow-lg p-12 bg-white rounded-lg"
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h4 className="text-[#1D1E20] text-[30px] font-semibold mb-6" style={{ fontFamily: "Noto Sans, sans-serif", color: "#904af2" }}>
            Create your account
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <p className="mb-2">Name</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  required
                />
              </div>

              {/* Email Input Section */}
              {!isOtpSent && (
                <div>
                  <p className="mb-2">Email</p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md text-black"
                    required

                  />
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleSendOtp}
                    className={`w-full p-3 text-white rounded-md mt-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#904af2]"}`}
                    style={{ borderRadius: "40px", fontSize: 19 }}
                  >
                     {loadingOtp ? "Sending OTP..." : "Send OTP"}
                  </button>
                </div>
              )}

              {/* OTP Input Section */}
              {isOtpSent && !isOtpVerified && (
                <div>
                  <p className="mb-2">OTP</p>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="w-full p-3 border border-gray-300 rounded-md text-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full p-3 bg-[#904af2] text-white rounded-md mt-4"
                  >
                    Verify OTP
                  </button>
                </div>
              )}

             
{isOtpVerified && (
  <>
              {/* <div> */}
      {/* Password Input */}
      <div>
        <p className="mb-2">
          Password <span className="text-xs text-gray-500">(Must be at least 6 characters)</span>
        </p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
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
              </>
)}
              
              {isOtpVerified && (
                <>
             <div className="mt-4">
        <p className="mb-2">
          Confirm Password <span className="text-xs text-gray-500">(Must be at least 6 characters)</span>
        </p>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full p-3 border border-gray-300 rounded-md text-black pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

              </>
              )}
               {isOtpVerified && (
                <>
              <button
                type="submit"
                className="w-full p-3 bg-[#904af2] text-white rounded-md shadow-lg"
                style={{ borderRadius: "40px", fontSize: 19 }}
              >
                {loadingSignup ? "Signing Up..." : "Sign Up"}
              </button>
              </>
               )}
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#904af2] hover:text-[#7a3ccd] transition font-semibold"
            >
              Sigin
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpForm;