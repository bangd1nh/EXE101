import React from "react";
import { PhoneOutlined, BarsOutlined } from "@ant-design/icons";

const ChatWindowComponent = ({ messages }) => {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="p-4 bg-gray-200 flex items-center rounded-xl mb-2 justify-between">
                <div className="flex items-center">
                    <img
                        src="ava.jpg"
                        className="h-12 rounded-full mr-5"
                        alt="Avatar"
                    />
                    <h2 className="text-lg font-light">Bang Dinh</h2>
                </div>
                <div className="flex items-center gap-5 mr-5">
                    <PhoneOutlined className="text-2xl hover:bg-black/20 duration-300 p-2 rounded-full hover:rotate-360 hover:scale-125" />
                    <div className="hover:bg-black/20 duration-300 p-2 rounded-full hover:scale-125">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="1em"
                            height="1em"
                            className="text-3xl"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="3"
                                d="M12 6h0m0 6h0m0 6h0"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 rounded-t-xl">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            msg.isSender ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`p-2 rounded-lg max-w-xs ${
                                msg.isSender
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatWindowComponent;
