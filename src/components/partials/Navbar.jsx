import React, { useState, useRef, useEffect } from "react";
import ButtonWishList from "./ButtonWishList";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../../services/user";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Toggle Dropdown
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle sub-menu item click
  const handleSubMenuClick = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to parent
    setOpenDropdown(null); // Close dropdown
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  return (
    <nav className="bg-white shadow-lg px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src="/images/navbar/logo.png"
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-600"
            />
            <span className="text-xl sm:text-2xl font-bold tracking-wide text-[#f27457]">
              FrameMate
            </span>
          </div>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Menu for Desktop */}
        <ul className="hidden md:flex space-x-6 text-base font-medium">
          {/* Photographers Dropdown */}
          <li className="relative group">
            <button
              onClick={() => toggleDropdown("photographers")}
              className="text-gray-700 hover:text-[#f27457] transition duration-300">
              Photographers
            </button>
            {openDropdown === "photographers" && (
              <ul
                ref={dropdownRef}
                className="absolute left-0 bg-white bg-opacity-95 shadow-lg mt-2 rounded-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <li
                  className="hover:bg-gray-100 px-4 py-2 rounded-t-lg"
                  onClick={handleSubMenuClick}>
                  <Link to="/photographer">Top</Link>
                </li>
                <li
                  className="hover:bg-gray-100 px-4 py-2"
                  onClick={handleSubMenuClick}>
                  <Link to="/photographers/newcomers">Newcomers</Link>
                </li>
                <li
                  className="hover:bg-gray-100 px-4 py-2 rounded-b-lg"
                  onClick={handleSubMenuClick}>
                  <Link to="/photographers/awards">Best Awards</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Customer Dropdown */}
          {getUserRole() === "PHOTOGRAPHER" && (
            <li className="relative group">
              <button
                onClick={() => toggleDropdown("customer")}
                className="text-gray-700 hover:text-[#f27457] transition duration-300">
                Customers
              </button>
              {openDropdown === "customer" && (
                <ul
                  ref={dropdownRef}
                  className="absolute left-0 bg-white bg-opacity-95 shadow-lg mt-2 rounded-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <li
                    className="hover:bg-gray-100 px-4 py-2 rounded-t-lg"
                    onClick={handleSubMenuClick}>
                    <Link to="/waiting-list">Waiting List</Link>
                  </li>
                  <li
                    className="hover:bg-gray-100 px-4 py-2"
                    onClick={handleSubMenuClick}>
                    <Link to="/accepted-list">Accepted List</Link>
                  </li>
                  <li
                    className="hover:bg-gray-100 px-4 py-2 rounded-b-lg"
                    onClick={handleSubMenuClick}>
                    <Link to="/finish-list">Finish List</Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          <li>
            <Link
              to="/photos"
              className="text-gray-700 hover:text-[#f27457] transition duration-300">
              Photo Gallery
            </Link>
          </li>
          {getUserRole() === "CUSTOMER" && (
            <li>
              <Link
                to="/customerBook"
                className="text-gray-700 hover:text-[#f27457] transition duration-300">
                Book Now
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/events"
              className="text-gray-700 hover:text-[#f27457] transition duration-300">
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 hover:text-[#f27457] transition duration-300">
              About FrameMate
            </Link>
          </li>
        </ul>

        {/* User and Wishlist for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("user")}
              className="focus:outline-none">
              <img
                src="/images/navbar/avatar.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-600"
              />
            </button>
            {openDropdown === "user" && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 bg-white bg-opacity-95 shadow-lg mt-2 rounded-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {localStorage.getItem("token") ? (
                  <>
                    <li
                      className="hover:bg-gray-100 px-4 py-2 rounded-t-lg"
                      onClick={handleSubMenuClick}>
                      <Link to="/user">Profile</Link>
                    </li>
                    <li
                      className="hover:bg-gray-100 px-4 py-2 rounded-b-lg"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}>
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="hover:bg-gray-100 px-4 py-2 rounded-t-lg"
                      onClick={handleSubMenuClick}>
                      <Link to="/login">Login</Link>
                    </li>
                    <li
                      className="hover:bg-gray-100 px-4 py-2 rounded-b-lg"
                      onClick={handleSubMenuClick}>
                      <Link to="/signup">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
          <ButtonWishList />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-95 shadow-lg mt-4 rounded-lg px-4 py-3">
          <ul className="flex flex-col space-y-3 text-base font-medium">
            {/* Photographers Dropdown */}
            <li className="relative">
              <button
                onClick={() => {
                  toggleDropdown("photographers");
                  navigate("/photographer");
                }}
                className="w-full text-left text-gray-700 hover:text-[#f27457] transition duration-300">
                Photographers
              </button>
              {openDropdown === "photographers" && (
                <ul className="mt-2 bg-white bg-opacity-95 shadow-lg rounded-lg w-full">
                  <li
                    className="hover:bg-gray-100 px-4 py-2 rounded-t-lg"
                    onClick={handleSubMenuClick}>
                    <Link to="/photographer">Top</Link>
                  </li>
                  <li
                    className="hover:bg-gray-100 px-4 py-2"
                    onClick={handleSubMenuClick}>
                    <Link to="/photographers/newcomers">Newcomers</Link>
                  </li>
                  <li
                    className="hover:bg-gray-100 px-4 py-2 rounded-b-lg"
                    onClick={handleSubMenuClick}>
                    <Link to="/photographers/awards">Best Awards</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Customer Dropdown */}
            {getUserRole() === "PHOTOGRAPHER" && (
              <li className="relative">
                <button
                  onClick={() => {
                    toggleDropdown("customer");
                    navigate("/waiting-list");
                  }}
                  className="w-full text-left text-gray-700 hover:text-[#f27457] transition duration-300">
                  Customers
                </button>
                {openDropdown === "customer" && (
                  <ul className="mt-2 bg-white bg-opacity-95 shadow-lg rounded-lg w-full">
                    <li
                      className="hover:bg-gray-100 px-4 py-2 rounded-t-lg"
                      onClick={handleSubMenuClick}>
                      <Link to="/waiting-list">Waiting List</Link>
                    </li>
                    <li
                      className="hover:bg-gray-100 px-4 py-2"
                      onClick={handleSubMenuClick}>
                      <Link to="/accepted-list">Accepted List</Link>
                    </li>
                    <li
                      className="hover:bg-gray-100 px-4 py-2 rounded-b-lg"
                      onClick={handleSubMenuClick}>
                      <Link to="/finish-list">Finish List</Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            <li>
              <Link
                to="/photos"
                className="text-gray-700 hover:text-[#f27457] transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}>
                Photo Gallery
              </Link>
            </li>
            {getUserRole() === "CUSTOMER" && (
              <li>
                <Link
                  to="/customerBook"
                  className="text-gray-700 hover:text-[#f27457] transition duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  Book Now
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/events"
                className="text-gray-700 hover:text-[#f27457] transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}>
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-[#f27457] transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}>
                About FrameMate
              </Link>
            </li>

            {/* User Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("user")}
                className="w-full text-left text-gray-700 hover:text-[#f27457] transition duration-300">
                Account
              </button>
              {openDropdown === "user" && (
                <ul className="mt-2 bg-white bg-opacity-95 shadow-lg rounded-lg w-full">
                  {localStorage.getItem("token") ? (
                    <>
                      <li
                        className="hover:bg-gray-100 px-4 py-2 rounded-t-lg"
                        onClick={handleSubMenuClick}>
                        <Link to="/user">Profile</Link>
                      </li>
                      <li
                        className="hover:bg-gray-100 px-4 py-2 rounded-b-lg"
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate("/login");
                        }}>
                        Logout
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className="hover:bg-gray-100 px-4 py-2 rounded-t-lg"
                        onClick={handleSubMenuClick}>
                        <Link to="/login">Login</Link>
                      </li>
                      <li
                        className="hover:bg-gray-100 px-4 py-2 rounded-b-lg"
                        onClick={handleSubMenuClick}>
                        <Link to="/signup">Sign Up</Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>

            {/* Wishlist Button */}
            <li>
              <ButtonWishList />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
