import React from "react";

const imgSrc = ["a.webp", "b.jpg", "c.jpg"];

function Galery() {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Commented-out gallery section */}
      {/* <p className="text-center text-3xl sm:text-4xl mt-10">
        The best family and wedding photos of the week
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {imgSrc.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <img
              src={"/public/images/navbar/7c843a564a5e39502032cabcb0d4368b.jpg"}
              alt={`Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
      </div> */}
      <div className="my-5 flex flex-col gap-3 sm:gap-5">
        <p className="text-3xl sm:text-5xl font-bold text-[#f27457]">3 Lý Do</p>
        <p className="text-3xl sm:text-5xl font-bold text-[#f27457]">
          Để Đặt Lịch Chụp Ở Framate
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-gray-200 p-5 rounded-3xl">
          <div className="justify-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="1em"
              height="1em"
              className="text-5xl sm:text-7xl text-[#f27457]">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M23.999 6c-7.18 0-13 5.82-13 13c0 5.404 3.298 10.039 7.991 12H19v.004A13 13 0 0 0 24 32a13 13 0 0 0 5-.997V31h.008c4.693-1.961 7.991-6.596 7.991-12c0-7.18-5.82-13-13-13M31 32.27c4.757-2.517 8-7.515 8-13.27c0-8.284-6.716-15-15-15S9 10.716 9 19c0 5.756 3.243 10.756 8.001 13.27V43a1 1 0 0 0 1.555.832L24 40.202l5.445 3.63A1 1 0 0 0 31 43zm-2 .876A15 15 0 0 1 24 34c-1.753 0-3.435-.3-4.999-.853v7.985l4.445-2.964a1 1 0 0 1 1.11 0L29 41.132zM24 12a7 7 0 1 0 0 14a7 7 0 0 0 0-14m-9 7a9 9 0 1 1 18 0a9 9 0 0 1-18 0"
                clipRule="evenodd"></path>
            </svg>
          </div>
          <div className="flex flex-col gap-3 sm:gap-5">
            <p className="text-xl sm:text-2xl font-semibold">
              Chi phí hợp lý – Chất lượng đảm bảo
            </p>
            <p className="font-light text-sm sm:text-base">
              Frammate hướng đến các bạn sinh viên và những người có thu nhập
              trung bình, vì vậy chúng tôi luôn mang đến các gói chụp ảnh với
              mức giá phải chăng mà vẫn đảm bảo chất lượng. Bạn có thể dễ dàng
              tìm được nhiếp ảnh gia phù hợp với ngân sách của mình mà không lo
              lắng về chi phí phát sinh.
            </p>
          </div>
        </div>
        <div className="bg-gray-200 p-5 rounded-3xl">
          <div className="justify-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className="text-5xl sm:text-7xl text-[#f27457]">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7.171 12.906l-2.153 6.411l2.672-.89l1.568 2.34l1.825-5.183m5.73-2.678l2.154 6.411l-2.673-.89l-1.568 2.34l-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.68 1.68 0 0 1 2.64 0a1.68 1.68 0 0 0 1.515.628a1.68 1.68 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.68 1.68 0 0 1 0 2.639a1.68 1.68 0 0 0-.628 1.515a1.68 1.68 0 0 1-1.866 1.866a1.68 1.68 0 0 0-1.516.628a1.68 1.68 0 0 1-2.639 0a1.68 1.68 0 0 0-1.515-.628a1.68 1.68 0 0 1-1.867-1.866a1.68 1.68 0 0 0-.627-1.515a1.68 1.68 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.68 1.68 0 0 1 9.165 4.3M14 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path>
            </svg>
          </div>
          <div className="flex flex-col gap-3 sm:gap-5">
            <p className="text-xl sm:text-2xl font-semibold">
              Kết nối nhanh chóng – Lựa chọn đa dạng
            </p>
            <p className="font-light text-sm sm:text-base">
              Chỉ với vài thao tác đơn giản, bạn có thể tìm kiếm và kết nối với
              các nhiếp ảnh gia nghiệp dư tài năng theo phong cách và nhu cầu
              của mình. Dù là chụp kỷ yếu, sự kiện, chân dung hay những khoảnh
              khắc đời thường, Frammate luôn có sẵn những lựa chọn phù hợp nhất
              dành cho bạn.
            </p>
          </div>
        </div>
        <div className="bg-gray-200 p-5 rounded-3xl">
          <div className="justify-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className="text-5xl sm:text-7xl text-[#f27457]">
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                color="currentColor">
                <path d="M9.426 3.063C10.684 2.354 11.312 2 12 2s1.316.354 2.574 1.063l1.75.986c1.305.735 1.958 1.103 2.317 1.718S19 7.132 19 8.632v1.736c0 1.5 0 2.25-.36 2.865c-.358.615-1.01.983-2.316 1.718l-1.75.986C13.316 16.646 12.688 17 12 17s-1.316-.354-2.574-1.063l-1.75-.986c-1.305-.735-1.958-1.103-2.317-1.718S5 11.868 5 10.368V8.632c0-1.5 0-2.25.36-2.865c.358-.615 1.01-.983 2.316-1.718z"></path>
                <path d="M9 10.167s.75 0 1.5 1.333c0 0 2.382-3.333 4.5-4m1.883 7.5l.67 3.21c.43 2.062.646 3.093.203 3.582c-.442.489-1.21.069-2.746-.772l-2.274-1.245c-.363-.198-.544-.298-.736-.298s-.373.1-.736.298L8.99 21.02c-1.536.84-2.304 1.261-2.746.772s-.227-1.52.203-3.582l.67-3.21"></path>
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-3 sm:gap-5">
            <p className="text-xl sm:text-2xl font-semibold">
              Cơ hội cho nhiếp ảnh gia trẻ
            </p>
            <p className="font-light text-sm sm:text-base">
              Frammate không chỉ là nền tảng kết nối mà còn là bệ phóng cho các
              nhiếp ảnh gia trẻ đam mê. Chúng tôi tạo điều kiện để các bạn có
              thể kiếm thêm thu nhập, trau dồi kỹ năng và xây dựng thương hiệu
              cá nhân từ chính niềm yêu thích nhiếp ảnh của mình.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Galery;
