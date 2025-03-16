import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6 px-10 text-sm text-gray-600">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center md:text-left">
                    <a href="#" className="hover:underline">
                        Terms
                    </a>
                    <a href="#" className="hover:underline">
                        Advertising
                    </a>
                    <a href="#" className="hover:underline">
                        Contact us
                    </a>
                    <a href="#" className="hover:underline">
                        MyWed logos
                    </a>
                    <a href="#" className="hover:underline">
                        About us
                    </a>
                    <a href="#" className="hover:underline">
                        Privacy policy
                    </a>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 mt-4 md:mt-0">
                    <select className="border px-4 py-1 rounded-md">
                        <option>🇬🇧 English</option>
                        <option>🇻🇳 Vietnamese</option>
                    </select>
                    <select className="border px-4 py-1 rounded-md">
                        <option>VND Vietnamese đồng</option>
                        <option>USD US Dollar</option>
                    </select>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
