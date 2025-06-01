import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function Award() {
  const years = [2017, 2018, 2019, 2020, 2022, 2023, 2024];
  const [selectedYear, setSelectedYear] = useState(2024);
  const winners = [
    {
      name: "Laura Eksarenko",
      country: "France",
      position: "WINNER",
      images: ["a.webp", "b.jpg", "c.jpg", "d.webp", "e.jpg"],
      avatar: "a.webp",
    },
    {
      name: "Mait Jüriado",
      country: "Iceland",
      position: "2 PLACE",
      images: ["a.webp", "b.jpg", "c.jpg", "d.webp", "e.jpg"],
      avatar: "b.jpg",
    },
    {
      name: "Roman Korolkov",
      country: "Russia",
      position: "3 PLACE",
      images: ["a.webp", "b.jpg", "c.jpg", "d.webp", "e.jpg"],
      avatar: "c.jpg",
    },
  ];

  return (
    <div className="bg-white text-center mt-5">
      <p className="text-[#f27457] text-3xl sm:text-4xl font-bold capitalize">
        Nhiếp ảnh gia có thể bạn yêu thích
      </p>
      <div className="flex flex-wrap justify-center items-center space-x-2 sm:space-x-4 bg-white p-4">
        {years.map((year, index) => (
          <span
            key={index}
            onClick={() => setSelectedYear(year)}
            className={`font-bold cursor-pointer transition-all duration-300 px-2 py-1 ${
              year === selectedYear
                ? "text-[#f27457] text-lg sm:text-2xl"
                : "text-gray-500 hover:text-black hover:text-base sm:hover:text-xl"
            }`}>
            {year}
          </span>
        ))}
      </div>

      <div className="bg-white text-black py-6 sm:py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            className="w-full">
            {winners.map((winner, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  <img
                    src="/images/navbar/b977b6d2d4dc6b888346f9e282771095.jpg"
                    alt={winner.name}
                    className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[480px] h-[300px] sm:h-[400px] md:h-[480px] object-cover rounded-lg"
                  />
                  {/* Uncomment and adjust grid for responsive display if needed */}
                  {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-5 mt-2">
                                        {winner.images.slice(1).map((img, idx) => (
                                            <img
                                                key={idx}
                                                src="/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg"
                                                alt=""
                                                className="w-20 sm:w-26 h-24 sm:h-30 object-cover rounded-md"
                                            />
                                        ))}
                                    </div> */}
                  <div className="text-center mt-4 sm:mt-6">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto rounded-2xl overflow-hidden">
                      <img
                        src="/images/navbar/avatar.jpg"
                        alt={winner.name}
                        className="w-full h-full object-cover clip-hexagon"
                      />
                    </div>
                    <p className="text-xs sm:text-sm mt-2 opacity-80">
                      {winner.position}
                    </p>
                    <h3 className="text-base sm:text-lg font-bold">
                      {winner.name}
                    </h3>
                    <p className="text-xs sm:text-sm opacity-70">
                      {winner.country}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Award;
