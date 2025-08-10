import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ThemeToggle from '../ThemeToggle';

const Layout = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

     useEffect(() => {
    const saved = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : system;
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

    return (
        <div className={
        isDarkMode
          ? "dark:bg-gray-900 dark:text-gray-100"
          : "bg-green-100 text-gray-800"
      }>
            <div className='w-8/12 mx-auto'>
                <Navbar></Navbar>
            </div>
                <Outlet context={{ isDarkMode, toggleDarkMode }}></Outlet>
            <Footer></Footer>
            <button
        onClick={toggleDarkMode}
        className='fixed bottom-10 right-10 p-3 rounded-full bg-gray-800 text-white shadow-lg
                   dark:bg-gray-200 dark:text-black'
      >
        {isDarkMode ? "🌞 Light" : "🌙 Dark"}
      </button>
        </div>
    );
};

export default Layout;