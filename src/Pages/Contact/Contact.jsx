import { useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import { MdOutlineEmail } from "react-icons/md";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const baseURL = window.location.hostname === "localhost"
        ? "http://localhost:5000/api/about"
        : "https://ai4fi-backend.onrender.com/api/about";
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully");
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Error sending message");
      }
    } catch (error) {
      console.error("Error:", error);
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
          <h6
            className="text-[#1D1E20] text-[25px] font-semibold mb-6"
            style={{ fontFamily: "sans-serif", color: "black" }}
          >
            Get in Touch
          </h6>
          <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-10" style={{ color: "#904af2", fontFamily: "sans-serif" }}>
            Are you ready to talk to <br />
            us?
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

        {/* Right Div with Form and Animation */}
        <motion.div
          className="flex flex-col w-full md:w-2/5 shadow-lg p-12 bg-white rounded-lg"
          initial="hidden"
          animate="visible"
          variants={animationRight}
        >
          <h4
            className="text-[#1D1E20] text-[30px] font-semibold mb-6"
            style={{ fontFamily: "Noto Sans, sans-serif", color: "#904af2" }}
          >
            Send us a message
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name and Company */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full">
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
                <div className="w-full mt-4 md:mt-0">
                  <p className="mb-2">Company</p>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className="w-full p-3 border border-gray-300 rounded-md text-black"
                  />
                </div>
              </div>

              {/* Phone and Email */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full">
                  <p className="mb-2">Phone</p>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full p-3 border border-gray-300 rounded-md text-black"
                    required
                  />
                </div>
                <div className="w-full mt-4 md:mt-0">
                  <p className="mb-2">Email</p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full p-3 border border-gray-300 rounded-md text-black"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <p className="mb-2">Subject</p>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <p className="mb-2">Message</p>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="w-full p-3 border border-gray-300 rounded-md text-black"
                  rows="4"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 bg-[#904af2] text-white rounded-md shadow-lg"
                style={{ borderRadius: "40px", fontSize: 19 }}
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;