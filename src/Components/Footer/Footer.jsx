// import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div>
            <h5 className="text-2xl font-semibold mb-4">About AI4FI</h5>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Transforming the fashion industry with AI-powered solutions. We
              help brands innovate with virtual models, immersive try-ons, and
              sustainable practices.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-300 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/apricity_ts/profilecard/?igsh=cHY2bjBrd2k3MHdi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-300 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/apricity-ts/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-300 transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Center Section */}
          <div>
            <h5 className="text-2xl font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <li>
                <a href="#about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h5 className="text-2xl font-semibold mb-4">Contact Us</h5>
            <ul className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <li>📞 +91-7887016676</li>
              <li>📧 query@apricityts.com</li>
            </ul>
            <h5 className="text-2xl font-semibold mt-6 mb-4">
              Featured AI Services
            </h5>
            <ul className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <li>AI-driven Business Analytics</li>
              <li>Custom AI Development</li>
              <li>AI-powered Automation Tools</li>
              <li>AI-driven Customer Insights</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-500 mt-8 pt-4">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} AI4FI. All rights reserved. Crafted
            with ❤️ by ApricityTS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
