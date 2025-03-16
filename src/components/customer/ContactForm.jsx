import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ContactForm = () => {
  const { photographerId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thông tin đã được gửi!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Liên Hệ Nhiếp Ảnh Gia
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Bạn đang liên hệ với nhiếp ảnh gia ID: {photographerId}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
          />
          <input
            type="text"
            name="location"
            placeholder="Địa điểm chụp"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
          />
          <textarea
            name="message"
            placeholder="Nội dung cần gửi..."
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#1E293B] text-white py-3 rounded-lg hover:bg-[#3B475B] transition-all duration-300 shadow-md"
          >
            Gửi Yêu Cầu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
