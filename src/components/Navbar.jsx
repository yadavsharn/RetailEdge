import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ exclude = [], isLoggedIn, isAdmin }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (exclude.includes(location.pathname)) return null;

  return (
    <nav className="sticky top-4 mx-auto z-50 w-[90%] rounded-2xl bg-white/30 backdrop-blur-md border border-white/20 shadow-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link className="flex items-center space-x-2" to="/">
          <img src="/favicon.ico" alt="Logo" className="h-9 w-9" />
          <h1 className="text-[#050315] text-xl md:text-2xl font-extrabold tracking-wide">
            RetailEdge
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 font-semibold">
          {isLoggedIn ? (
            <>
              <NavLink to="/">Home</NavLink>
              {isAdmin && <NavLink to="/admin">Admin</NavLink>}
              <NavLink to="/cart">Cart</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <Link
                to="/logout"
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition-transform"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r from-[#4e8eea] to-[#3576d4] text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition-transform"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition-transform"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#050315] focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/50 backdrop-blur-lg border-t border-white/30 shadow-inner rounded-b-2xl animate-slideDown">
          <div className="flex flex-col px-6 py-4 space-y-3 font-semibold text-[#050315]">
            {isLoggedIn ? (
              <>
                <NavLink to="/" mobile>
                  Home
                </NavLink>
                {isAdmin && (
                  <NavLink to="/admin" mobile>
                    Admin
                  </NavLink>
                )}
                <NavLink to="/cart" mobile>
                  Cart
                </NavLink>
                <NavLink to="/profile" mobile>
                  Profile
                </NavLink>
                <Link
                  to="/logout"
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow text-center"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-[#4e8eea] to-[#3576d4] text-white px-4 py-2 rounded-lg shadow text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// 🔥 Custom NavLink Component for Gradient Hover
const NavLink = ({ to, children, mobile = false }) => (
  <Link
    to={to}
    className={`relative ${
      mobile ? "block" : "inline-block"
    } text-[#050315] hover:text-[#4e8eea] transition group`}
  >
    {children}
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-[#4e8eea] to-[#3576d4] transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

export default Navbar;
