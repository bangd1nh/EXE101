import React from "react";
import { useNavigate } from "react-router";

function FeedBack() {
    const navigate = useNavigate();
    return (
        <div>
            <p className="text-center text-[#f27457] text-3xl my-5 font-bold uppercase">
                Đánh giá của khách hàng
            </p>
            <div className="grid grid-cols-3 mx-auto w-5xl gap-5">
                <div className="border-2 border-gray-300 rounded-3xl p-10">
                    <img
                        src="feedback1.jpg"
                        className="rounded-full h-60 w-60 object-cover"
                    />
                    <p className="text-center font-semibold text-[#f27457] mt-5 ">
                        Ngọc Anh – Sinh viên đại học
                    </p>
                    <p className="font-light">
                        "Mình đã tìm được một nhiếp ảnh gia cực kỳ thân thiện và
                        chuyên nghiệp qua Frammate. Giá cả rất hợp lý, phù hợp
                        với sinh viên như mình mà chất lượng ảnh thì ngoài mong
                        đợi. Cảm ơn Frammate đã giúp mình lưu giữ những khoảnh
                        khắc tuyệt vời này!"
                    </p>
                    <p className="text-center mt-5 text-indigo-600 hover:cursor-pointer hover:text-indigo-800">
                        Xem đánh giá
                    </p>
                </div>
                <div className="border-2 border-gray-300 rounded-3xl p-10">
                    <img
                        src="feedback2.jpg"
                        className="rounded-full h-60 w-60 object-cover"
                    />
                    <p className="text-center font-semibold text-[#f27457] mt-5 ">
                        Minh Quân – Khách hàng cá nhân
                    </p>
                    <p className="font-light">
                        "Nhờ Frammate, mình đã có một bộ ảnh kỷ yếu đẹp lung
                        linh với chi phí phải chăng. Việc đặt lịch và trao đổi
                        với nhiếp ảnh gia rất dễ dàng và nhanh chóng. Đây thực
                        sự là một nền tảng tuyệt vời cho những ai muốn có ảnh
                        đẹp mà không lo về giá!"
                    </p>
                    <p className="text-center mt-5 text-indigo-600 hover:cursor-pointer hover:text-indigo-800">
                        Xem đánh giá
                    </p>
                </div>
                <div className="border-2 border-gray-300 rounded-3xl p-10">
                    <img
                        src="feedback3.jpg"
                        className="rounded-full h-60 w-60 object-cover"
                    />
                    <p className="text-center font-semibold text-[#f27457] mt-5 ">
                        Hà My – Nhiếp ảnh gia nghiệp dư
                    </p>
                    <p className="font-light">
                        "Là một sinh viên yêu thích nhiếp ảnh, Frammate đã giúp
                        mình có thêm cơ hội kiếm thêm thu nhập từ niềm đam mê.
                        Nền tảng dễ sử dụng, kết nối nhanh chóng với khách hàng
                        và mình còn học hỏi được rất nhiều kinh nghiệm thực tế!"
                    </p>
                    <p className="text-center mt-5 text-indigo-600 hover:cursor-pointer hover:text-indigo-800">
                        Xem đánh giá
                    </p>
                </div>
            </div>
            <div className="w-3xl mx-auto mt-10">
                <p className="text-2xl font-light text-center">
                    Hãy lấy cảm hứng từ những bức ảnh đẹp, trò chuyện và giao
                    lưu với các nhiếp ảnh gia khác, nhận yêu cầu từ các cặp đôi
                    đang yêu!
                </p>
                <div className="text-center mt-10 mb-10">
                    <button
                        className="text-white bg-[#e5b378] hover:bg-[#f27457] px-20 py-5 rounded-3xl text-2xl font-semibold duration-300"
                        onClick={() => navigate("/login")}
                    >
                        Tham gia
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeedBack;
