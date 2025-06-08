import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    bookPhotographer,
    getPhotographerUserName,
    getUserInfomation,
} from "../../services/booking";
import { getPhotographerServices } from "../../services/photographers";
import { message } from "antd";
import TransferInfoModal from "../../modal/TransferInfoModal";
// import { useParams } from "react-router-dom";

const ContactForm = () => {
    const { photographerId } = useParams();
    const [photographerName, setPhotographerName] = useState("");
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        date: "",
        location: "",
        message: "",
        service: "",
        time: "",
    });
    console.log({formData});
    const [processing, setProcessing] = useState(false);

    const [open, setOpen] = useState(false);

    const transferData = {
        bankName: "Mbbank",
        accountNumber: "838929082002",
        accountHolder: "TRAN QUYET THANG",
        amount: 500000,
    };

    const [services, setServices] = useState([]);

    const naviagate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getPhotographerUserName(photographerId)
            .then((res) => setPhotographerName(res.data.payload))
            .catch((err) => console.log(err));
        getUserInfomation()
            .then((res) =>
                setFormData({
                    ...formData,
                    firstname: res.data.payload.FirstName,
                    lastname: res.data.payload.LastName,
                    phone: res.data.payload.PhoneNumber,
                    email: res.data.payload.Email,
                })
            )
            .catch((err) => console.log(err));
        getPhotographerServices(photographerId)
            .then((res) => {
                setServices(res.data.payload.Services);
            })
            .catch((err) => console.log(err));
    }, [photographerId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        console.log({formData});
        const data = {
            email: formData.email,
            service: formData.service,
            date: formData.date,
            time: formData.time,
            location: formData.location,
            message: formData.message,
        };
        bookPhotographer(photographerId, data)
            .then((res) => {
                console.log({res});
                setOpen(true);
            })
            .catch((err) => console.log(err))
            .finally(() => setProcessing(false));
        // naviagate("/payment");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-center text-[#e5b378] mb-4">
                    Liên Hệ Nhiếp Ảnh Gia
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Bạn đang liên hệ với nhiếp ảnh gia: {photographerName}
                </p>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Họ
                            </label>
                            <input
                                disabled
                                type="text"
                                name="firstname"
                                placeholder="Họ"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tên
                            </label>
                            <input
                                disabled
                                type="text"
                                name="lastname"
                                placeholder="Tên"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Số điện thoại
                        </label>
                        <input
                            disabled
                            type="tel"
                            name="phone"
                            placeholder="Số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            disabled
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Dịch vụ
                            </label>
                            <select
                                name="service"
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
                            >
                                <option value="">Chọn dịch vụ</option>
                                {services.map((service) => (
                                    <option
                                        key={service._id}
                                        value={service._id}
                                    >
                                        {service.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Giá dịch vụ
                            </label>
                            <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                                {services
                                    .find((s) => s._id === formData.service)
                                    ?.Price?.toLocaleString("vi-VN") || 0}
                                VNĐ
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Ngày chụp
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Giờ chụp
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                step="60"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Địa điểm chụp
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Địa điểm chụp"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nội dung
                        </label>
                        <textarea
                            name="message"
                            placeholder="Nội dung cần gửi..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#e5b378] text-white py-3 rounded-lg hover:bg-[#f27457] transition-all duration-300 shadow-md"
                        onClick={(e) => handleSubmit(e)}
                    >
                        {processing ? (
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                        ) : (
                            <div className="h-12 items-center flex justify-center text-2xl">
                                gửi yêu cầu{" "}
                            </div>
                        )}
                    </button>
                </div>
            </div>
            <TransferInfoModal
                open={open}
                onClose={() => setOpen(false)}
                transferData={transferData}
            />
        </div>
    );
};

export default ContactForm;
