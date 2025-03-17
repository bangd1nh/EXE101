import React, { useState } from "react";
import { photographerProfile, photos } from "../constants/data";
import {
    ClockCircleOutlined,
    GlobalOutlined,
    StarOutlined,
    PhoneOutlined,
    WhatsAppOutlined,
    LinkOutlined,
    HeartOutlined,
    HeartFilled,
    ArrowRightOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { Button } from "@mui/material";
import Photo from "./Photo";
import { useNavigate } from "react-router";

function PhotographerProfile() {
    const [follow, setFollow] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState(
        photographerProfile.major[0]
    );
    const [galery, setGalery] = useState(photos);
    const navigate = useNavigate();

    return (
        <>
            <div className="w-7xl mx-auto p-8 rounded-lg bg-white grid grid-cols-4 gap-4">
                <div className="flex justify-center items-center">
                    <img
                        src={photographerProfile.img}
                        alt={photographerProfile.name}
                        className="w-80 h-80 rounded-lg object-cover"
                    />
                </div>

                <div className="col-span-2">
                    <h1 className="text-3xl font-semibold text-blue-600">
                        {photographerProfile.name}
                    </h1>
                    <p className="text-gray-600">
                        {photographerProfile.location}
                    </p>
                    <p className="mt-2 text-base font-light">
                        {photographerProfile.description}
                    </p>
                    <div className="grid grid-cols-1 gap-4 mt-4 text-base text-gray-500">
                        <div className="flex items-center gap-2">
                            <ClockCircleOutlined />{" "}
                            <span>
                                Joined on {photographerProfile.joiningAt}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GlobalOutlined />{" "}
                            <span>Speaks: {photographerProfile.language}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        {photographerProfile.award.map((award, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 px-3 py-2 text-base rounded flex items-center gap-2 hover:bg-gray-500 duration-300 hover:text-white w-fit hover:cursor-default"
                            >
                                <StarOutlined className="text-yellow-500" />{" "}
                                {award}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-stretch gap-4 ">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="text-base font-extralight">
                                {photographerProfile.follower}
                            </p>
                            <p className="text-base font-extralight">
                                Followers
                            </p>
                        </div>
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => {
                                    setFollow(!follow);
                                }}
                            >
                                {follow ? (
                                    <HeartOutlined className="transition-all duration-300 text-3xl hover:scale-150" />
                                ) : (
                                    <HeartFilled className="transition-all duration-300 text-3xl hover:scale-150" />
                                )}
                            </button>
                            <p className="font-extralight">Follow & Save</p>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-8 py-3 rounded-lg w-full hover:bg-indigo-700 duration-300"
                        onClick={() => {
                            navigate("/chat");
                        }}
                    >
                        Send a message
                    </button>
                    <Button
                        variant="outlined"
                        className="w-full"
                        startIcon={<PhoneOutlined />}
                        onClick={() => {
                            navigate("/contactForm");
                        }}
                    >
                        Show Number
                    </Button>
                    <Button
                        variant="outlined"
                        className="border px-8 py-3 rounded-lg flex items-center gap-2 w-full"
                        startIcon={<WhatsAppOutlined />}
                    >
                        WhatsApp
                    </Button>
                    <a
                        href={photographerProfile.website}
                        className="mt-4 block text-blue-600 underline text-center"
                    >
                        <LinkOutlined className="me-2" />
                        {photographerProfile.website}
                    </a>
                </div>
            </div>
            <div className="flex justify-center gap-7 mt-5">
                {photographerProfile.major.map((m, index) => {
                    return (
                        <button
                            key={index}
                            className={`px-4 py-2  rounded-xl uppercase font-semibold hover:bg-gray-400 duration-300 ${
                                selectedMajor.name === m.name
                                    ? "bg-stone-700 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                            onClick={() => setSelectedMajor(m)}
                        >
                            {m.name}
                        </button>
                    );
                })}
            </div>
            <div className="text-center mt-5">
                <p className="text-3xl font-light">
                    {selectedMajor.name} shoot at: {selectedMajor.price} per
                    hour
                </p>
                <div className="max-w-6xl mx-auto px-10 mt-20">
                    <div className="grid grid-cols-4 gap-4">
                        {galery.map((p, index) => (
                            <div key={index} className="relative group">
                                <img
                                    className="h-64 w-64 object-cover rounded-2xl"
                                    src={p.src}
                                    alt={`Gallery ${index}`}
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-center rounded-2xl">
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
                <div className="flex justify-center gap-4 mt-10 mb-20">
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
        </>
    );
}

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

export default PhotographerProfile;
