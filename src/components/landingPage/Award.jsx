import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

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
        <div className="bg-black text-center">
            <p className="text-white text-4xl text-center font-bold">
                MY FRAMEMATE AWARD
            </p>
            <div className="flex items-center space-x-4 bg-black p-4 justify-center">
                {years.map((year, index) => (
                    <span
                        key={index}
                        onClick={() => setSelectedYear(year)}
                        className={`align-middle font-bold cursor-pointer transition-all duration-300 ${
                            year === selectedYear
                                ? "text-white text-2xl"
                                : "text-gray-500 hover:text-white hover:text-xl"
                        }`}
                    >
                        {year}
                    </span>
                ))}
            </div>

            <div className="bg-black text-white py-10 px-4">
                <div className="w-7xl mx-auto">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={2}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full"
                    >
                        {winners.map((winner, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-center">
                                    <img
                                        src={winner.images[0]}
                                        alt={winner.name}
                                        className="w-fit h-80 object-cover rounded-lg"
                                    />
                                    <div className="grid grid-cols-4 gap-5 mt-2">
                                        {winner.images
                                            .slice(1)
                                            .map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt=""
                                                    className="w-26 h-30 object-cover rounded-md"
                                                />
                                            ))}
                                    </div>
                                    <div className="text-center mt-6">
                                        <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden ">
                                            <img
                                                src={winner.avatar}
                                                alt={winner.name}
                                                className="w-full h-full object-cover clip-hexagon"
                                            />
                                        </div>
                                        <p className="text-sm mt-2 opacity-80">
                                            {winner.position}
                                        </p>
                                        <h3 className="text-lg font-bold">
                                            {winner.name}
                                        </h3>
                                        <p className="text-sm opacity-70">
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
