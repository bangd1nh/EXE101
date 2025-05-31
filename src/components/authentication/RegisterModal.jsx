import { Button, Checkbox } from "@mui/material";
import React, { useState } from "react";

function RegisterModal({ isShow, handleSignUp, closeModal }) {
    const [checked, setChecked] = useState(true);
    const handleOnChange = () => {
        setChecked(!checked);
        console.log(checked);
    };
    return (
        <div
            className={`h-full w-full bg-black/50 z-50 fixed ${
                isShow ? "block" : "hidden"
            } flex justify-center`}
        >
            <div className=" w-1/2 h-3/4 bg-[#f27457] justify-center mt-20 overflow-auto">
                <div className="text-4xl p-5 border-b-1 flex justify-between">
                    <h1 className="text-start font-semibold">
                        Điều Khoản Sử Dụng Dịch Vụ Framemate
                    </h1>
                    <Button
                        color="#f27457"
                        variant="outlined"
                        onClick={() => closeModal(false)}
                    >
                        X
                    </Button>
                </div>
                <div className="overflow-auto h-8/12 p-5 font-light mb-5">
                    <h1 className="text-2xl">
                        Thỏa thuận này quy định việc sử dụng trang website (nếu
                        có sự thay đổi, sẽ chỉ đến URL được thay đổi sau đó),
                        dưới đây gọi là “Dịch vụ”. Thỏa thuận này áp dụng cho
                        tất cả mọi người truy cập hoặc sử dụng Dịch vụ (không
                        giới hạn riêng cho thành viên đăng ký, dưới đây gọi là
                        “Người dùng”). Framemate có thể thay đổi nội dung của
                        Thỏa thuận này nếu cần thiết và sẽ thông báo cho Người
                        dùng về ngày có hiệu lực và nội dung sửa đổi trước. Nếu
                        Người dùng sử dụng Dịch vụ sau ngày có hiệu lực, sẽ được
                        xem là đã đồng ý với Thỏa thuận mới nhất.
                    </h1>
                    <h1 className="ms-5 text-3xl mt-5 font-normal mb-5">
                        1. Nội dung sử dụng Dịch vụ
                    </h1>
                    <div className="ms-20 gap-5 flex flex-col text-xl">
                        <h1>
                            Người dùng có thể trở thành “Thành viên” của Dịch vụ
                            bằng cách đăng ký thành viên theo quy định của
                            Framemate và có thể chọn nhiếp ảnh gia để thực hiện
                            chụp ảnh thông qua Dịch vụ. Thành viên không được
                            phép sử dụng Dịch vụ cho mục đích kinh doanh hoặc
                            lợi nhuận. Trong trường hợp muốn sử dụng Dịch vụ cho
                            mục đích kinh doanh hoặc lợi nhuận, Thành viên phải
                            liên hệ trực tiếp với Framemate.
                        </h1>
                        <h1>
                            Người dùng có thể đăng ký trở thành nhiếp ảnh gia
                            thông qua quy định của Framemate (Framemate sẽ kiểm
                            tra và xét duyệt để đảm bảo chất lượng của Dịch vụ).
                            Nếu được công nhận theo tiêu chí xem xét do
                            Framemate quy định, Thành viên sẽ trở thành “Nhiếp
                            ảnh gia”, có thể đăng thông tin của mình trên Dịch
                            vụ của Framemate và nhận các yêu cầu chụp ảnh từ
                            Thành viên. Dưới đây, Thành viên và Nhiếp ảnh gia có
                            thể được gọi chung là “Thành viên”.
                        </h1>
                        <h1>
                            Framemate sẽ kết nối Thành viên và Nhiếp ảnh gia cho
                            Hợp đồng Chụp Ảnh theo quy định của Framemate (gọi
                            là "Hợp đồng Chụp Ảnh"). Cả Thành viên và Nhiếp ảnh
                            gia đều phải đồng ý với nội dung của Hợp đồng Chụp
                            Ảnh (ngoại trừ các chi tiết cụ thể như lịch trình,
                            thời gian, địa điểm, nội dung chụp ảnh và các chi
                            tiết khác của Dịch vụ) trước khi yêu cầu hoặc nhận
                            dịch vụ chụp ảnh thông qua Dịch vụ của Framemate.
                            Nếu Thành viên yêu cầu dịch vụ chụp ảnh thông qua
                            Framemate và Nhiếp ảnh gia chấp nhận, thì sẽ coi như
                            đã ký kết Hợp đồng Chụp Ảnh giữa Thành viên và Thành
                            viên nhiếp ảnh gia theo quy định trong Thỏa thuận
                            này. Framemate có quyền thay đổi các điều khoản của
                            Hợp đồng Chụp Ảnh theo quyền hạn của mình, và Thành
                            viên phải đồng ý với điều đó. Các thay đổi này được
                            áp dụng cho tất cả các Hợp đồng Chụp Ảnh được ký sau
                            khi chúng được công bố trên Dịch vụ của Framemate.
                        </h1>
                        <h1>
                            Framemate sẽ tính phí trung gian khi tiến hành việc
                            kết nối giữa Thành viên và Nhiếp ảnh gia. Framemate
                            có thể tính phí trung gian cùng với các khoản phí
                            khác theo quy định và sau đó gửi hóa đơn cho Thành
                            viên. Sau khi trừ đi phí trung gian được quy định
                            của Thỏa thuận này, Framemate sẽ thanh toán số tiền
                            còn lại (gọi là "Phí chụp hình") cho Nhiếp ảnh
                            Framemate coi việc thanh toán cho Nhiếp ảnh gia là
                            việc thực hiện nghĩa vụ thanh toán “Phí chụp hình”.
                            Nhiếp ảnh gia khi đăng ký thông tin nhận “Phí
                            Framemate cần cung cấp số tài khoản với chủ sở hữu
                            là chính Nhiếp ảnh gia.
                        </h1>
                        <h1>
                            Framemate có thể thay đổi, đình chỉ hoặc bãi bỏ nội
                            dung của Dịch vụ mà không cần thông báo trước hoặc
                            có sự đồng ý của Người dùng và không chịu bất kỳ
                            trách nhiệm pháp lý nào đối với Người dùng.
                        </h1>
                        <h1>
                            Nếu Framemate thấy cần thiết, Framemate có thể sử
                            dụng thông tin do Người dùng cung cấp (bao gồm tài
                            liệu hình ảnh hoặc tài liệu văn bản) mà không cần
                            thông báo trước hoặc có sự đồng ý của Người dùng và
                            không chịu bất kỳ trách nhiệm pháp lý nào đối với
                            Người dùng. Thông tin có thể bị xóa hoặc thay đổi.
                        </h1>
                        <h1>
                            Tất cả tài liệu trên Framemate (bao gồm tài liệu
                            hình ảnh và tài liệu văn bản) thuộc về Framemate
                            hoặc chủ sở hữu của những tài liệu đó và được bảo vệ
                            theo luật sở hữu trí tuệ bao gồm luật bản quyền.
                            Việc sử dụng trái phép những thứ này mà không có sự
                            cho phép thích hợp đều bị pháp luật nghiêm cấm.
                        </h1>
                    </div>
                </div>
                <div className="flex items-center p-5">
                    <Checkbox
                        color="#f27457"
                        onChange={() => {
                            handleOnChange();
                        }}
                    />
                    <h1 className="font-light cursor-default">
                        Tôi đồng ý với điều khoảng dịch vụ trên
                    </h1>
                </div>
                <div className="text-end mx-5">
                    <Button
                        variant="outlined"
                        disabled={checked}
                        onClick={handleSignUp}
                        className=""
                        color="#f27457"
                    >
                        đăng ký
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RegisterModal;
