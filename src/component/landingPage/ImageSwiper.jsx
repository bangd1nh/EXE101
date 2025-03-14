import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { TextField } from "@mui/material";

function ImageSwiper() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="w-full h-lvh"
                allowTouchMove={false}
            >
                <SwiperSlide>
                    <img src="a.webp" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="c.jpg" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="a.webp" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="a.webp" className="w-full h-full object-cover" />
                </SwiperSlide>
            </Swiper>
            <div className="absolute z-10 text-center text-gray-700 flex-row">
                <p className="text-5xl mb-10">
                    More than 45 000 wedding and family photographers in the
                    entire world
                </p>
                <p className="text-4xl mb-10">
                    Find the best photographers near me:
                </p>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Contry Or City"
                        variant="outlined"
                        className="w-md"
                        // fullWidth
                    />
                </div>
                <button className="bg-indigo-500 rounded-2xl px-10 py-5 mt-10 text-white text-xl font-semibold hover:bg-indigo-800 duration-300">
                    Find a photographer
                </button>
            </div>
        </div>
    );
}

export default ImageSwiper;
