import React, { useState, useRef, useEffect } from "react";
import ButtonWishList from "./ButtonWishList";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { getUserId, getUserRole } from "../../services/user";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const naviagate = useNavigate();
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

  return (
    <nav className="bg-white shadow-lg p-4 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center space-x-3">
            <img
              src="/images/navbar/logo.png"
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-gray-600"
            />
            <span className="text-2xl font-bold tracking-wide text-[#f27457]">
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
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {/* Photographers Dropdown */}
          <li className="relative group">
            <button
              onClick={() => toggleDropdown("photographers")}
              className="hover:text-gray-300 transition duration-300">
              Các nhiếp ảnh gia
            </button>
            {openDropdown === "photographers" && (
              <ul
                ref={dropdownRef}
                className="absolute left-0 bg-white bg-opacity-90 backdrop-blur-lg shadow-xl mt-2 rounded-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <li className="hover:bg-gray-200 px-4 py-3 rounded-t-lg">
                  <Link to="/photographer">Top</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-3">
                  <a href="#">Newcomers</a>
                </li>
                <li className="hover:bg-gray-200 px-4 py-3 rounded-b-lg">
                  <a href="#">Best Awards</a>
                </li>
              </ul>
            )}
          </li>

          {/* Customer Dropdown */}
          {getUserRole() === "PHOTOGRAPHER" && (
            <li className="relative group">
              <button
                onClick={() => toggleDropdown("customer")}
                className="hover:text-gray-300 transition duration-300">
                Khách Hàng
              </button>
              {openDropdown === "customer" && (
                <ul
                  ref={dropdownRef}
                  className="absolute left-0 bg-white bg-opacity-90 backdrop-blur-lg shadow-xl mt-2 rounded-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <li className="hover:bg-gray-200 px-4 py-3 rounded-t-lg">
                    <Link to="/waiting-list">Waiting List</Link>
                  </li>
                  <li className="hover:bg-gray-200 px-4 py-3">
                    <Link to="/accepted-list">Accepted List</Link>
                  </li>
                  <li className="hover:bg-gray-200 px-4 py-3">
                    <Link to="/finish-list">Finish List</Link>
                  </li>
                  <li className="hover:bg-gray-200 px-4 py-3 rounded-b-lg"></li>
                </ul>
              )}
            </li>
          )}

          <li>
            <Link
              to="/photos"
              className="hover:text-gray-300 transition duration-300">
              Thư viện Ảnh
            </Link>
          </li>
          {getUserRole() === "CUSTOMER" && (
            <li>
              <a
                href="/customerBook"
                className="hover:text-gray-300 transition duration-300">
                Đặt lịch
              </a>
            </li>
          )}
          <li>
            <a href="#" className="hover:text-gray-300 transition duration-300">
              Sự kiện
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:text-gray-300 transition duration-300">
              Về Framemate
            </a>
          </li>
        </ul>

        {/* User and Wishlist for Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("user")}
              className="focus:outline-none">
              <img
                src="/images/navbar/avatar.jpg"
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-600"
              />
            </button>
            {openDropdown === "user" && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 bg-white bg-opacity-90 backdrop-blur-lg shadow-xl mt-2 rounded-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {localStorage.getItem("token") ? (
                  <>
                    <li className="hover:bg-gray-200 px-4 py-3 rounded-t-lg">
                      <a href="/user">Profile</a>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-3 rounded-b-lg">
                      <Link
                        to="/login"
                        onClick={() => localStorage.removeItem("token")}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="hover:bg-gray-200 px-4 py-3 rounded-t-lg">
                      <a href="#">Profile</a>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-3">
                      <a href="#">Balance</a>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-3">
                      <a href="#">Settings</a>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-3 rounded-b-lg">
                      <Link to="/login">Login</Link>
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
        <div className="md:hidden bg-white bg-opacity-90 backdrop-blur-lg shadow-xl mt-4 rounded-lg">
          <ul className="flex flex-col space-y-4 p-4 text-lg font-medium">
            {/* Photographers Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("photographers")}
                className="w-full text-left hover:text-gray-300 transition duration-300">
                Các nhiếp ảnh gia
              </button>
              {openDropdown === "photographers" && (
                <ul className="mt-2 bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-lg w-full">
                  <li
                    onClick={() => naviagate("/photographer")}
                    className="hover:bg-gray-200 px-4 py-3 rounded-t-lg">
                    <Link to="/photographer">Top</Link>
                  </li>
                  <li className="hover:bg-gray-200 px-4 py-3">
                    <a href="#">Newcomers</a>
                  </li>
                  <li className="hover:bg-gray-200 px-4 py-3 rounded-b-lg">
                    <a href="#">Best Awards</a>
                  </li>
                </ul>
              )}
            </li>

            {/* Customer Dropdown */}
            {getUserRole() === "PHOTOGRAPHER" && (
              <li className="relative">
                <button
                  onClick={() => toggleDropdown("customer")}
                  className="w-full text-left hover:text-gray-300 transition duration-300">
                  Khách Hàng
                </button>
                {openDropdown === "customer" && (
                  <ul className="mt-2 bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-lg w-full">
                    <li className="hover:bg-gray-200 px-4 py-3 rounded-t-lg">
                      <Link to="/waiting-list">Waiting List</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-3">
                      <Link to="/accepted-list">Accepted List</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-3">
                      <Link to="/finish-list">Finish List</Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            <li>
              <Link
                to="/photos"
                className="hover:text-gray-300 transition duration-300">
                Thư viện Ảnh
              </Link>
            </li>
            {getUserRole() === "CUSTOMER" && (
              <li>
                <a
                  href="/customerBook"
                  className="hover:text-gray-300 transition duration-300">
                  Đặt lịch
                </a>
              </li>
            )}
            <li>
              <a
                href="#"
                className="hover:text-gray-300 transition duration-300">
                Sự kiện
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-gray-300 transition duration-300">
                Về Framemate
              </a>
            </li>

            {/* User Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("user")}
                className="w-full text-left hover:text-gray-300 transition duration-300">
                Tài khoản
              </button>
              {openDropdown === "user" && (
                <ul className="mt-2 bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-lg w-full">
                  {localStorage.getItem("token") ? (
                    <>
                      <li className="hover:bg-gray-200 px-4 py-3 rounded-t-lg">
                        <a href="/user">Profile</a>
                      </li>
                      <li className="hover:bg-gray-200 px-4 py-3 rounded-b-lg">
                        <Link
                          to="/login"
                          onClick={() => localStorage.removeItem("token")}>
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="hover:bg-gray-200 px-4 py-3 rounded-t-lg">
                        <a href="#">Profile</a>
                      </li>
                      <li className="hover:bg-gray-200 px-4 py-3">
                        <a href="#">Balance</a>
                      </li>
                      <li className="hover:bg-gray-200 px-4 py-3">
                        <a href="#">Settings</a>
                      </li>
                      <li className="hover:bg-gray-200 px-4 py-3 rounded-b-lg">
                        <Link to="/login">Login</Link>
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
