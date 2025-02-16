// src/components/common/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("name"); // Retrieve using "name"

    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      setUsername(storedUsername || "Guest"); // Set username or 'Guest' if null
      // console.log(localStorage.getItem("name"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setUsername("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">
          BookStore
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/books" className="hover:text-gray-400">
            Books
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center">
          <SearchBar />
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="hover:text-gray-400">Welcome, {username}!</span>
              <button onClick={handleLogout} className="hover:text-gray-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-400">
                Signup
              </Link>
            </>
          )}
        </div>

        <Link
          to="/cart"
          className="hidden md:flex relative hover:text-gray-400"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="container mx-auto px-4 flex flex-col">
            <div className="mb-4">
              <SearchBar />
            </div>

            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
              <Link to="/books" className="hover:text-gray-400">
                Books
              </Link>
              <Link to="/about" className="hover:text-gray-400">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </nav>

            <div className="mt-4 flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <span className="hover:text-gray-400">
                     {username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-gray-400">
                    Login
                  </Link>
                  <Link to="/signup" className="hover:text-gray-400">
                    Signup
                  </Link>
                </>
              )}
            </div>

            <Link
              to="/cart"
              className="mt-4 flex items-center hover:text-gray-400"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
