import React, { useContext } from 'react';
import { NavLink } from 'react-router'; 
import logo from '../assets/logo.webp';
import { AuthContext } from '../context/AuthContext';
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    logOutUser()
      .then(() => console.log('Logout successful'))
      .catch(error => console.error('Error logging out:', error));
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-[#4F7942] text-white font-semibold px-3 py-2 rounded"
      : "hover:text-green-700 px-3 py-2";

  return (
   <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
  <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto px-2 sm:px-4">
    <div className="flex items-center h-16 w-full">

      <div className="flex items-center gap-2">
        <img src={logo} alt="StoryMint Logo" className="h-10 hidden sm:block" />
        <span className="text-xl font-bold text-green-900">StoryMint</span>
      </div>

<div className="hidden lg:flex flex-1 justify-center space-x-4 text-sm items-center">
  <NavLink to="/" className={navLinkClass}>Home</NavLink>

  {!user && (
    <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
  )}

  <NavLink to="/bookshelf" className={navLinkClass}>Bookshelf</NavLink>

  {user ? (
    <>
      <NavLink to="/add-book" className={navLinkClass}>Add Book</NavLink>
      <NavLink to="/my-books" className={navLinkClass}>My Books</NavLink>
      <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
    </>
  ) : null}
</div>


      <div className="hidden lg:flex items-center gap-2">
        {user ? (
          <button
            onClick={handleLogOut}
            className="btn bg-red-800 text-white text-sm px-4 py-2 rounded flex items-center gap-2 hover:brightness-110 transition"
          >
            <LuLogOut size={18} />
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className="btn bg-gradient-to-r from-[#4F7942] to-[#808000] text-white text-sm px-4 py-2 hover:brightness-110 transition rounded"
            >
              LogIn
            </NavLink>
            <NavLink
              to="/register"
              className="btn bg-gradient-to-r from-[#4F7942] to-[#808000] text-white text-sm px-4 py-2 hover:brightness-110 transition rounded"
            >
              Register
            </NavLink>
          </>
        )}
      </div>

      <div className="lg:hidden dropdown dropdown-end ml-auto">
        <button tabIndex={0} className="btn btn-ghost">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-sm z-[999]"
        >
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/bookshelf" className={navLinkClass}>Bookshelf</NavLink></li>
          {user ? (
            <>
              <li><NavLink to="/add-book" className={navLinkClass}>Add Book</NavLink></li>
              <li><NavLink to="/my-books" className={navLinkClass}>My Books</NavLink></li>
              <li><NavLink to="/profile" className={navLinkClass}>Profile</NavLink></li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-left w-full px-3 py-2 hover:text-red-700"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" className={navLinkClass}>LogIn</NavLink></li>
              <li><NavLink to="/register" className={navLinkClass}>Register</NavLink></li>
            </>
          )}
        </ul>
      </div>

    </div>
  </div>
</nav>

  );
};

export default Navbar;
