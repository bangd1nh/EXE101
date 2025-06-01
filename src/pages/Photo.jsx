import React, { useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import MiniNavBar from "../components/partials/MiniNavBar";
import { photos } from "../constants/data";

const BookmarkFlags = ({ colors }) => (
  <div className="absolute top-0 right-3 sm:right-6 flex gap-1">
    {colors.map((color, index) => (
      <div
        key={index}
        className="w-3 h-4 sm:w-4 sm:h-6 rounded-sm"
        style={{
          backgroundColor: color,
          clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
        }}
      />
    ))}
  </div>
);

function Photo() {
  const categories = ["Couples", "Weddings", "Portraits", "Family", "Students"];
  const [category, setCategory] = useState(categories[0]);
  const [gallery, setGallery] = useState(photos);

  const handleCallBack = (data) => {
    setCategory(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MiniNavBar categories={categories} callback={handleCallBack} />
      <div className="text-center mt-4 sm:mt-5">
        <p className="text-2xl sm:text-3xl font-semibold text-[#f27457]">
          {category}
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {gallery.map((p, index) => (
            <div key={index} className="relative group">
              <img
                className="w-full aspect-square object-cover rounded-2xl"
                src={p.src}
                alt={`Gallery ${index + 1}`}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-center rounded-2xl">
                <img
                  src="ava.jpg"
                  className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover"
                />
                <p className="font-semibold text-sm sm:text-base mt-1 sm:mt-2">
                  {p.author}
                </p>
                <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2 text-xs sm:text-sm">
                  <span>❤️ {p.likes}</span>
                  <span>💬 {p.comments}</span>
                  <span>🔖 {p.saves}</span>
                </div>
              </div>
              {p.bookmark.length > 0 && <BookmarkFlags colors={p.bookmark} />}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6 sm:mt-8 mb-12 sm:mb-20">
        <button className="text-base sm:text-lg p-1 sm:p-2 hover:text-gray-600 transition">
          <ArrowLeftOutlined />
        </button>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <button
              key={index}
              className={`text-sm sm:text-base px-2 sm:px-3 py-1 rounded border hover:border-black transition duration-300 ${
                index === 0 ? "border-black" : "border-gray-300"
              }`}>
              {index + 1}
            </button>
          ))}
        <button className="text-base sm:text-lg p-1 sm:p-2 hover:text-gray-600 transition">
          <ArrowRightOutlined />
        </button>
      </div>
    </div>
  );
}

export default Photo;
