import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; 
import logo from '../assets/logo.webp';
import { NavLink } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#4F7942] to-[#808000] dark:from-gray-900 dark:to-gray-800 text-white dark:text-gray-300 px-4 sm:px-6 lg:px-16 py-10 lg:mt-15 md:mt-10 mt-5">
      <div className='w-11/12 sm:w-10/12 md:w-10/12 lg:w-8/12 mx-auto'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          <div className="flex items-start gap-4">
            <img src={logo} alt="StoryMint Logo" className="h-14 w-14 object-contain" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-gray-100">StoryMint</h2>
              <p className="text-sm mt-1 text-white/80 dark:text-gray-400">Unfold your next favorite book with us.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white dark:text-gray-100">Contact Us</h3>
            <div className="flex items-center space-x-2 mb-2 text-white/90 dark:text-gray-400">
              <FaEnvelope size={18} />
              <p className="text-sm">support@storymint.com</p>
            </div>
            <div className="flex items-center space-x-2 mb-2 text-white/90 dark:text-gray-400">
              <FaPhone size={18} />
              <p className="text-sm">+880 1234-567890</p>
            </div>
            <div className="flex items-center space-x-2 text-white/90 dark:text-gray-400">
              <FaMapMarkerAlt size={18} />
              <p className="text-sm">Dhaka, Bangladesh</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <NavLink to="/terms" className="hover:underline text-white/90 dark:text-gray-400">
                  Terms & Conditions
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy" className="hover:underline text-white/90 dark:text-gray-400">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/support" className="hover:underline text-white/90 dark:text-gray-400">
                  Support
                </NavLink>
              </li>
            </ul>
            <div className="flex gap-4 mt-4 text-xl text-white dark:text-gray-400">
              <a href="https://www.facebook.com" className="hover:text-green-300 transition"><FaFacebookF /></a>
              <a href="https://twitter.com" className="hover:text-green-300 transition"><FaTwitter /></a>
              <a href="https://www.instagram.com" className="hover:text-green-300 transition"><FaInstagram /></a>
              <a href="https://www.linkedin.com" className="hover:text-green-300 transition"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm mt-10 border-t border-white/20 dark:border-gray-700 pt-4 text-white/70 dark:text-gray-400">
        &copy; {new Date().getFullYear()} <span className="font-medium">StoryMint</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
