import React, { useState, useRef, useEffect } from "react";
import ButtonWishList from "./ButtonWishList";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    // Toggle Dropdown
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-lg p-4 relative z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to={"/"}>
                    <div className="flex items-center space-x-3">
                        <img
                            src="/public/images/navbar/logo.png"
                            alt="Logo"
                            className="w-12 h-12 rounded-full border-2 border-gray-600"
                        />
                        <span className="text-2xl font-bold tracking-wide text-[#f27457]">
                            FrameMate
                        </span>
                    </div>
                </Link>

                {/* Menu */}
                <ul className="flex space-x-8 text-lg font-medium">
                    {/* Photographers Dropdown */}
                    <li className="relative group">
                        <button
                            onClick={() => {
                                toggleDropdown("photographers");
                            }}
                            className="hover:text-gray-300 transition duration-300"
                        >
                            Các nhiếp ảnh gia
                        </button>
                        {openDropdown === "photographers" && (
                            <ul
                                ref={dropdownRef}
                                className="absolute left-0 bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-xl mt-2 rounded-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <li className="hover:bg-gray-700 px-4 py-3 rounded-t-lg text-white">
                                    <Link to="/photographer">
                                        {" "}
                                        <a href="/photographer" >Top</a>
                                    </Link>
                                </li>
                                <li className="hover:bg-gray-700 px-4 py-3 text-white">
                                    <a href="#">Newcomers</a>
                                </li>
                                <li className="hover:bg-gray-700 px-4 py-3 rounded-b-lg text-white">
                                    <a href="#">Best Awards</a>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Customer Dropdown */}
                    <li className="relative group">
                        <button
                            onClick={() => {
                                toggleDropdown("customer");
                            }}
                            className="hover:text-gray-300 transition duration-300"
                        >
                            Khách Hàng
                        </button>
                        {openDropdown === "customer" && (
                            <ul
                                ref={dropdownRef}
                                className="absolute left-0 bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-xl mt-2 rounded-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <li className="hover:bg-gray-700 px-4 py-3 text-white rounded-t-lg">
                                    <Link to="/waiting-list">Waiting List</Link>
                                </li>
                                <li className="hover:bg-gray-700 text-white px-4 py-3">
                                    <Link to="/accepted-list">
                                        Accepted List
                                    </Link>
                                </li>
                                <li className="hover:bg-gray-700 text-white px-4 py-3 rounded-b-lg">
                                    <Link to="/finish-list">Finish List</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to={"/photos"}>
                            {" "}
                            <a className="hover:text-gray-300 transition duration-300">
                                Thư viện Ảnh
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:text-gray-300 transition duration-300"
                        >
                            Đặt lịch
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:text-gray-300 transition duration-300"
                        >
                            Sự kiện
                        </a>
                    </li>
                    <li>
                        <a
                            href="/about"
                            className="hover:text-gray-300 transition duration-300"
                        >
                            Về Framemate
                        </a>
                    </li>
                </ul>

                {/* Profile + Icons */}
                <div className="flex items-center space-x-6">
                    {/* User Avatar Dropdown */}
                    <div className="relative group">
                        <button
                            onClick={() => toggleDropdown("user")}
                            className="focus:outline-none"
                        >
                            <img
                                src="/public/images/navbar/avatar.jpg"
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full border-2 border-gray-600"
                            />
                        </button>
                        {openDropdown === "user" && (
                            <ul
                                ref={dropdownRef}
                                className="absolute right-0 bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-xl mt-2 rounded-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <li className="hover:bg-gray-700 px-4 py-3 text-white rounded-t-lg">
                                    <a href="#">Profile</a>
                                </li>
                                <li className="hover:bg-gray-700 text-white px-4 py-3">
                                    <a href="#">Balance</a>
                                </li>
                                <li className="hover:bg-gray-700 text-white px-4 py-3">
                                    <a href="#">Settings</a>
                                </li>
                                <li className="hover:bg-gray-700 text-white px-4 py-3 rounded-b-lg">
                                    <Link to={"/login"}>
                                        <a>Login</a>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Import ButtonWishlist */}
                    <ButtonWishList />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
