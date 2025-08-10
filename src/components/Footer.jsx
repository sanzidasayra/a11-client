import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Added the icons for contact
import logo from '../assets/logo.webp';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#4F7942] to-[#808000] text-white mt-10 px-4 sm:px-6 lg:px-16 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        
        {/* Logo & Intro */}
        <div className="flex items-start gap-4">
          <img src={logo} alt="StoryMint Logo" className="h-14 w-14 object-contain" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">StoryMint</h2>
            <p className="text-sm mt-1 text-white/80">Unfold your next favorite book with us.</p>
          </div>
        </div>

        {/* Contact Info with Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <div className="flex items-center space-x-2 mb-2 text-white/90">
            <FaEnvelope size={18} />
            <p className="text-sm">support@storymint.com</p>
          </div>
          <div className="flex items-center space-x-2 mb-2 text-white/90">
            <FaPhone size={18} />
            <p className="text-sm">+880 1234-567890</p>
          </div>
          <div className="flex items-center space-x-2 text-white/90">
            <FaMapMarkerAlt size={18} />
            <p className="text-sm">Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Quick Links + Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline text-white/90">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline text-white/90">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline text-white/90">Support</a></li>
          </ul>
          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://www.facebook.com" className="hover:text-green-300 transition"><FaFacebookF /></a>
            <a href="https://twitter.com" className="hover:text-green-300 transition"><FaTwitter /></a>
            <a href="https://www.instagram.com" className="hover:text-green-300 transition"><FaInstagram /></a>
            <a href="https://www.linkedin.com" className="hover:text-green-300 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs sm:text-sm mt-10 border-t border-white/20 pt-4 text-white/70">
        &copy; {new Date().getFullYear()} <span className="font-medium">StoryMint</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
