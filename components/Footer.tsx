import React from "react";
import { FaTwitter, FaLinkedin, FaHeart, FaYoutube, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="https://x.com/VaishnoSatyam" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/vaishno-prakash-tiwari-989033252/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors duration-200">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com/VaishnoSatyam" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/vaishno_satyam/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com/channel/UCz1kz1n1rj3X9X8kQ4zj9Zg" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors duration-200">
              <FaYoutube className="w-6 h-6" />
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaHeart className="w-4 h-4 text-red-500" />
            <p className="font-medium">Made by Vaishno Tiwari</p>
          </div>
          <p className="text-sm font-medium text-gray-500">&copy; 2025 Tourvisto</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
