import React, { useState } from "react";
import { FaPhone, FaWhatsapp, FaUser, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishlistView = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const wishlist = [
    { 
      id: 1, 
      name: "Daniele Torella", 
      username: "@danieletorella", 
      location: "Rome, Italy", 
      description: "Documenting exclusive weddings around the world through cinematic, elegant and timeless photographs. As seen in Vogue, ELLE & Vanity Fair.", 
      avatar: "/public/images/navbar/avatar.jpg", 
      price: "9 700 000 VND / hour", 
      minHours: 2,
      images: [
        "/public/images/navbar/7c843a564a5e39502032cabcb0d4368b.jpg", 
        "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg", 
        "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
        "/public/images/navbar/b977b6d2d4dc6b888346f9e282771095.jpg"
      ]
    },
    { 
      id: 2, 
      name: "Daniele Torella", 
      username: "@danieletorella", 
      location: "Rome, Italy", 
      description: "Documenting exclusive weddings around the world through cinematic, elegant and timeless photographs. As seen in Vogue, ELLE & Vanity Fair.", 
      avatar: "/public/images/navbar/avatar.jpg", 
      price: "9 700 000 VND / hour", 
      minHours: 3,
      images: [
        "/public/images/navbar/7c843a564a5e39502032cabcb0d4368b.jpg", 
        "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg", 
        "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
        "/public/images/navbar/b977b6d2d4dc6b888346f9e282771095.jpg"
      ]
    },
    { 
      id: 3, 
      name: "Daniele Torella", 
      username: "@danieletorella", 
      location: "Rome, Italy", 
      description: "Documenting exclusive weddings around the world through cinematic, elegant and timeless photographs. As seen in Vogue, ELLE & Vanity Fair.", 
      avatar: "/public/images/navbar/avatar.jpg", 
      price: "9 700 000 VND / hour", 
      minHours: 4,
      images: [
        "/public/images/navbar/7c843a564a5e39502032cabcb0d4368b.jpg", 
        "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg", 
        "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
        "/public/images/navbar/b977b6d2d4dc6b888346f9e282771095.jpg"
      ]
    }
  ];

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white mt-10 p-6 rounded-lg shadow-lg space-y-8">
        {wishlist.map((item) => (
          <div key={item.id} className="p-6 border rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition">
            {/* Avatar + Tên + Địa điểm */}
            <div className="flex items-center space-x-4">
              <img 
                src={item.avatar} 
                alt={item.name} 
                className="w-16 h-16 rounded-full border border-gray-300 shadow-sm object-cover" 
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.username} PRO+</p>
                <p className="text-xs text-gray-500">{item.location}</p>
              </div>
            </div>

            {/* Hình ảnh */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Wishlist ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>

            {/* Mô tả */}
            <p className="mt-4 text-gray-700 text-sm">{item.description}</p>

            {/* Button Hiển thị thêm */}
            <button 
              className="mt-4 w-full bg-[#e5b378] text-white px-4 py-2 rounded-lg hover:bg-[#f27457] transition"
              onClick={() => toggleExpand(item.id)}
            >
              {expandedItem === item.id ? "Hide Details" : "View Details"}
            </button>

            {/* Thông tin thêm khi mở rộng */}
            {expandedItem === item.id && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg border">
                <p><strong>💰 Giá:</strong> {item.price}</p>
                <p><strong>⏳ Thời gian tối thiểu:</strong> {item.minHours} hours</p>

                <div className="mt-4 flex space-x-2">
                    <Link to={`/contactForm`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition">
                    <FaPhone className="mr-2" /> Contact
                  </button>
                    </Link>

                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition">
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-600 transition">
                    <FaUser className="mr-2" /> Visit Profile
                  </button>
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-800 transition">
                    <FaEnvelope className="mr-2" /> Send a Message
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistView;
