import React from "react";

function About() {
    const packages = [
        {
            id: 1,
            title: "CÁ NHÂN",
            suitableFor: "1 Người",
            duration: "tối thiểu 2 giờ",
            editedPhotos: "Tối thiểu 10 ảnh",
            description:
                "Nếu bạn muốn có một bộ ảnh ghi đậm dấu ấn cá nhân, hoặc chỉ đơn giản là muốn lưu lại những khoảnh khắc đẹp của bản thân...",
            image: "cat1.jpg",
        },
        {
            id: 2,
            title: "CẶP ĐÔI",
            suitableFor: "2 Người",
            duration: "tối thiểu 2 giờ",
            editedPhotos: "Tối thiểu 15 ảnh",
            description:
                "Ghi lại những khoảnh khắc thật đẹp cùng người thương nhân dịp kỷ niệm 1 tháng, 1 năm...",
            image: "cat.jpg",
        },
        {
            id: 3,
            title: "GIA ĐÌNH",
            suitableFor: "3-10 Người",
            duration: "tối thiểu 2 giờ",
            editedPhotos: "Tối thiểu 20 ảnh",
            description:
                "Ba là cây nến vàng, mẹ là cây nến xanh, con là cây nến hồng...",
            image: "cat3.jpg",
        },
        {
            id: 4,
            title: "NHÓM",
            suitableFor: "2-10 Người",
            duration: "tối thiểu 2 giờ",
            editedPhotos: "Tối thiểu 15 ảnh",
            description:
                "Đẹp hơn nữa trên Facebook khi người ấy đăng tấm cách lứa nhóm của bạn...",
            image: "cat2.jpg",
        },
        {
            id: 5,
            title: "HỌC SINH - SINH VIÊN",
            suitableFor: "tối thiểu 4 giờ",
            editedPhotos: "Tối thiểu 20 ảnh",
            description:
                "Gói chụp dành cho các sự kiện của học sinh, sinh viên như chụp ảnh kỷ yếu...",
            image: "cat4.jpg",
        },
        {
            id: 6,
            title: "SỰ KIỆN",
            description:
                "Gói chụp dành cho các sự kiện: lễ hội, thể thao, văn nghệ...",
            image: "cat5.jpg",
        },
    ];
    return (
        <div className="">
            {/* <p>asdasdf</p> */}
            <div className="grid grid-cols-3 px-30 mx-20 h-screen relative mt-20">
                <div className=" absolute top-10 left-35">
                    <img
                        src="about1.jpg"
                        className="rounded-3xl h-[800px] w-auto"
                    />
                </div>
                <div></div>
                <div className="z-10 col-span-2">
                    <div className="ms-20">
                        <p className="text-6xl font-semibold text-[#f27457]">
                            Xin chào,
                        </p>
                        <p className="text-6xl font-semibold text-[#f27457]">
                            Đây là Frammate!
                        </p>
                    </div>
                    <div className="mt-5 flex-col flex items-center gap-5 font-light text-2xl bg-gray-100/70 p-20 rounded-3xl">
                        <p>
                            Chào mừng bạn đến với Frammate – nơi kết nối những
                            đam mê nhiếp ảnh với những khoảnh khắc đáng nhớ!
                        </p>
                        <p>
                            Chúng tôi hiểu rằng mỗi kỷ niệm đẹp đều xứng đáng
                            được lưu giữ trọn vẹn. Vì thế, Frammate ra đời với
                            mong muốn trở thành cầu nối giữa các bạn trẻ yêu
                            thích nhiếp ảnh – đặc biệt là các bạn sinh viên – và
                            những ai muốn ghi lại những phút giây ý nghĩa trong
                            cuộc sống.
                        </p>
                        <p>
                            Tại Frammate, bạn dễ dàng tìm được những nhiếp ảnh
                            gia nghiệp dư tài năng, uy tín với mức chi phí hợp
                            lý, phù hợp với túi tiền của học sinh, sinh viên.
                            Đồng thời, chúng tôi cũng mở ra cơ hội để các bạn
                            đam mê nhiếp ảnh kiếm thêm thu nhập, trau dồi kỹ
                            năng và xây dựng một cộng đồng sáng tạo, nhiệt
                            huyết.
                        </p>
                        <button className="bg-[#f27457] text-white font-semibold px-5 py-2 mt-10 rounded-3xl">
                            Đặt lịch chụp ảnh ngay
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-5xl text-[#f27457] font-bold">
                    Frammate – Lưu giữ khoảnh khắc, kết nối đam mê!
                </p>
            </div>
            <div className="grid grid-cols-3 px-30 mx-20 h-screen relative mt-20">
                <div className="col-span-2">
                    <p className="text-6xl font-semibold text-[#f27457]">
                        Chuyện của Frammate
                    </p>
                    <div className="mt-5 flex-col flex items-center gap-5 font-light text-2xl bg-gray-100/70 p-20 rounded-3xl">
                        <p>
                            Chúng tôi – những sinh viên trẻ mang trong mình niềm
                            đam mê mãnh liệt với nhiếp ảnh – luôn tin rằng mỗi
                            khoảnh khắc đều đáng giá và xứng đáng được lưu giữ.
                            Từ những buổi chụp hình giản dị cùng bạn bè đến
                            những sự kiện quan trọng trong cuộc đời, chúng tôi
                            hiểu rằng không phải ai cũng dễ dàng tìm được một
                            nhiếp ảnh gia phù hợp với nhu cầu và túi tiền.
                        </p>
                        <p>
                            Xuất phát từ chính những trăn trở đó, Frammate ra
                            đời với sứ mệnh kết nối những bạn trẻ yêu thích
                            nhiếp ảnh – đặc biệt là các nhiếp ảnh gia nghiệp dư
                            – với những ai muốn ghi lại những giây phút ý nghĩa
                            trong cuộc sống. Chúng tôi mong muốn tạo ra một nền
                            tảng nơi các bạn có thể dễ dàng tìm được người đồng
                            hành phù hợp, với mức chi phí hợp lý mà vẫn đảm bảo
                            chất lượng và sự tận tâm.
                        </p>
                        <p>
                            Với Frammate, không chỉ là nơi khách hàng tìm kiếm
                            dịch vụ chụp ảnh, mà còn là cơ hội để các nhiếp ảnh
                            gia trẻ phát triển kỹ năng, xây dựng thương hiệu cá
                            nhân và kiếm thêm thu nhập từ chính niềm đam mê của
                            mình. Mỗi bức ảnh không chỉ là sản phẩm, mà còn là
                            sự kết nối chân thành giữa những người có chung tình
                            yêu với nghệ thuật và cái đẹp.
                        </p>
                    </div>
                </div>
                <div></div>
                <div className="absolute top-8 right-38">
                    <img
                        src="about2.jpg"
                        className="rounded-3xl h-[800px] w-auto"
                    />
                </div>
            </div>
            <div className="text-center">
                <p className="text-5xl text-[#f27457] font-bold">
                    Thông tin các thể loại chụp hình
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mx-70">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                    >
                        <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-orange-600">
                                {pkg.title}
                            </h3>
                            <p className="text-gray-600 mt-2">
                                {pkg.description}
                            </p>
                            <div className="mt-4 text-sm text-gray-500">
                                {pkg.suitableFor && (
                                    <p>
                                        <strong>Phù hợp cho:</strong>{" "}
                                        {pkg.suitableFor}
                                    </p>
                                )}
                                {pkg.duration && (
                                    <p>
                                        <strong>Thời gian chụp:</strong>{" "}
                                        {pkg.duration}
                                    </p>
                                )}
                                {pkg.editedPhotos && (
                                    <p>
                                        <strong>Số ảnh chỉnh sửa:</strong>{" "}
                                        {pkg.editedPhotos}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;
