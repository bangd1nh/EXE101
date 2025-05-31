import React, { useState } from "react";
// import MiniNavBar from "../component/partials/MiniNavBar";
import { major, photos } from "../constants/data";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import MiniNavBar from "../components/partials/MiniNavBar";

const BookmarkFlags = ({ colors }) => (
    <div className="absolute top-0 right-6 flex gap-1">
        {colors.map((color, index) => (
            <div
                key={index}
                className="w-4 h-6 rounded-sm"
                style={{
                    backgroundColor: color,
                    clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
                }}
            />
        ))}
    </div>
);

function Photo() {
    const categories = [
        "Cặp Đôi",
        "Đám Cưới",
        "Cá Nhân",
        "Gia Đình",
        "Học sinh - Sinh viên",
    ];
    const [category, setCategory] = useState(categories[0]);
    const [galery, setGalery] = useState(photos);

    const handleCallBack = (data) => {
        setCategory(data);
    };

    return (
        <div>
            <MiniNavBar categories={categories} callback={handleCallBack} />
            <div className="text-center mt-5">
                <p className="text-3xl font-semibold text-[#f27457]">
                    {category}
                </p>
            </div>

            {/* <div className="flex justify-center gap-5 mt-5">
                {majors.map((m, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 rounded px-4 py-1 hover:bg-gray-400 duration-300"
                    >
                        <button className="text-xl font-semibold">{m}</button>
                    </div>
                ))}
            </div> */}

            <div className="max-w-6xl mx-auto px-10 mt-20">
                <div className="grid grid-cols-4 gap-4">
                    {galery.map((p, index) => (
                        <div key={index} className="relative group">
                            <img
                                className="h-64 w-64 object-cover rounded-2xl"
                                src={p.src}
                                alt={`Gallery ${index}`}
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-center rounded-2xl">
                                <img
                                    src="ava.jpg"
                                    className="h-12 w-12 object-cover rounded-4xl"
                                />
                                <p className="font-semibold">{p.author}</p>
                                <div className="flex gap-3 mt-2 text-sm">
                                    <span>❤️ {p.likes}</span>
                                    <span>💬 {p.comments}</span>
                                    <span>🔖 {p.saves}</span>
                                </div>
                            </div>
                            {p.bookmark.length > 0 && (
                                <BookmarkFlags colors={p.bookmark} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-5 mb-20">
                <button className="hover:cursor-pointer">
                    <ArrowLeftOutlined />
                </button>
                {Array(5)
                    .fill(0)
                    .map((_, index) => {
                        return (
                            <button
                                key={index}
                                className={
                                    `hover:cursor-pointer border px-2 rounded  hover:border-black duration-300 ` +
                                    (index === 0
                                        ? "border-black"
                                        : "border-gray-300")
                                }
                            >
                                {index}
                            </button>
                        );
                    })}
                <button className="hover:cursor-pointer">
                    <ArrowRightOutlined />
                </button>
            </div>
        </div>
    );
}

export default Photo;
