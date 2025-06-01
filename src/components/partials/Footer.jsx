import React from "react";
import {
  FacebookOutlined,
  TikTokOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 px-4 sm:px-10 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-5">
        <img
          src="/newlogo-removebg-preview.png"
          className="h-24 sm:h-32 w-auto mx-auto sm:mx-0"
          alt="Framate Logo"
        />
        <div className="flex flex-col gap-2 sm:gap-3">
          <p className="text-2xl sm:text-4xl font-semibold text-center sm:text-left">
            Your moment Our Passion
          </p>
          <p className="text-xl sm:text-3xl font-medium text-center sm:text-left">
            Công ty TNHH Framate
          </p>
          <p className="font-light text-xs sm:text-sm text-center sm:text-left">
            Địa chỉ: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p className="font-light text-xs sm:text-sm text-center sm:text-left">
            Mã số doanh nghiệp: 00000000000
          </p>
          <p className="font-light text-xs sm:text-sm text-center sm:text-left">
            Điện thoại: 094171919
          </p>
          <div className="text-xl sm:text-3xl flex gap-4 sm:gap-5 justify-center sm:justify-start">
            <FacebookOutlined />
            <TikTokOutlined />
            <InstagramOutlined />
          </div>
        </div>
      </div>
      <div className="w-full border-t mt-4 sm:mt-5 mx-auto border-gray-400"></div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between gap-3 sm:gap-5 max-w-5xl mx-auto mt-4 sm:mt-5 text-center sm:text-left">
        <p className="font-light text-xs sm:text-sm">Về chúng tôi</p>
        <p className="font-light text-xs sm:text-sm">Các câu hỏi thường gặp</p>
        <p className="font-light text-xs sm:text-sm">Các điều khoản dịch vụ</p>
        <p className="font-light text-xs sm:text-sm">Chính sách bảo mật</p>
        <p className="font-light text-xs sm:text-sm">Quy trình chụp hình</p>
      </div>
    </footer>
  );
};

export default Footer;
