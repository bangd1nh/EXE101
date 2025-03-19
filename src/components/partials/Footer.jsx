import React from "react";

import {
    FacebookOutlined,
    TikTokOutlined,
    InstagramOutlined,
} from "@ant-design/icons";

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-6 px-10 text-sm ">
            <div className="max-w-6xl mx-auto flex gap-5">
                <img src="/newlogo-removebg-preview.png" className="h-50" />
                <div className="flex flex-col gap-2">
                    <p className="text-4xl">Your moment Our Passion</p>
                    <p className="text-3xl">Công ty TNHH Framate</p>
                    <p className="font-light">
                        Địa chỉ: Lorem ipsum dolor sit amet consectetur
                        adipisicing elit.
                    </p>
                    <p className="font-light">
                        Mã số doanh nghiệp :00000000000
                    </p>
                    <p className="font-light">Điện thoại: 094171919</p>
                    <div className="text-3xl flex gap-5">
                        <FacebookOutlined />
                        <TikTokOutlined />
                        <InstagramOutlined />
                    </div>
                </div>
            </div>
            <div className="w-full border-t mt-5 mx-auto border-gray-400"></div>
            <div className=" flex-row flex justify-between w-5xl mx-auto mt-5">
                <p className="font-light">Về chúng tôi</p>
                <p className="font-light">Các câu hỏi thường gặp</p>
                <p className="font-light">Các điều khoảng dịch vụ</p>
                <p className="font-light">Chính sách bảo mật</p>
                <p className="font-light">Quy trình chụp hình </p>
            </div>
        </footer>
    );
};

export default Footer;
