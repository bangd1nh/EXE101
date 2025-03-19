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
                speed={1000}
                modules={[Autoplay]}
                className="w-full h-lvh"
                allowTouchMove={true}
            >
                <SwiperSlide>
                    <img
                        src="/IMG_6713.JPG"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/IMG_6714.JPG"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/IMG_6715.JPG"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
            </Swiper>
            <div className="absolute z-10 text-center text-gray-700 flex-row font-light">
                {/* <p style={{ color: "white" }} className="text-5xl mb-10">
                    More than 45 000 wedding and family photographers in the
                    entire world
                </p> */}
                <p style={{ color: "white" }} className="text-4xl mb-10">
                    Tìm nhiếp ảnh gia gần tôi:
                </p>
                <div>
                    {/* <TextField
                        id="outlined-basic"
                        label="Contry Or City"
                        variant="outlined"
                        className="w-md"
                        // fullWidth
                    /> */}
                    <input
                        type="text"
                        placeholder="Tìm nhiếp ảnh gia "
                        className="text-white border-white border p-5 w-3xl rounded-2xl text-3xl"
                    />
                </div>
                <button className="bg-[#e5b378] rounded-2xl px-10 py-5 mt-10 text-white text-xl font-semibold hover:bg-[#f27457] duration-300">
                    Tìm nhiếp ảnh gia
                </button>
            </div>
        </div>
    );
}

export default ImageSwiper;
