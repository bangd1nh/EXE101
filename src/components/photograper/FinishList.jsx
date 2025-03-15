import React, { useState } from "react";

const FinishList = () => {
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const finishedCustomers = [
    { 
      id: 1, 
      name: "Sophia White", 
      phone: "0901-234-567", 
      address: "Hà Nội", 
      note: "Rất hài lòng với dịch vụ!", 
      avatar: "/public/images/navbar/219983.png", 
      images: [
        "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
       "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg",
        "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
        "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg"
      ],
      source: "/downloads/SophiaWhite.zip"
    },
    { 
      id: 2, 
      name: "William Black", 
      phone: "0987-654-321", 
      address: "TP.HCM", 
      note: "Ảnh rất đẹp, sẽ quay lại!", 
      avatar: "/images/user6.jpg", 
      images: [
        "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
       "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg",
        "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
        "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg"
      ],
      source: "/downloads/WilliamBlack.zip"
    },
    { 
      id: 3, 
      name: "William Black", 
      phone: "0987-654-321", 
      address: "TP.HCM", 
      note: "Ảnh rất đẹp, sẽ quay lại!", 
      avatar: "/images/user6.jpg", 
      images: [
        "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
       "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg",
        "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
        "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg"
      ],
      source: "/downloads/WilliamBlack.zip"
    }
  ];

  const toggleExpand = (id) => {
    setExpandedCustomer(expandedCustomer === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-gray-200 py-4 flex justify-between px-10 items-center shadow-md">
        <h1 className="text-xl font-bold tracking-wide text-gray-800"> Finish List</h1>
        <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
          Message
        </button>
      </header>

      <div className="w-full max-w-6xl bg-white mt-10 p-8 rounded-lg shadow-lg">
        <div className="space-y-6">
          {finishedCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition relative cursor-pointer"
              onClick={() => toggleExpand(customer.id)}
            >
              {/* Dòng chính chứa thông tin và 4 ảnh */}
              <div className="flex items-center space-x-4">
                {/* Avatar + Thông tin chính */}
                <div className="flex items-center space-x-4 w-1/4">
                  <img 
                    src={customer.avatar} 
                    alt={customer.name} 
                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm object-cover" 
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{customer.name}</h2>
                    <span className="text-xs text-gray-500">✅ Completed</span>
                  </div>
                </div>

                {/* Hình ảnh */}
                <div className="grid grid-cols-4 gap-2 w-3/4">
                  {customer.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Finished Work ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(img);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Thông tin mở rộng */}
              {expandedCustomer === customer.id && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
                  <p><strong>📞 Số điện thoại:</strong> {customer.phone}</p>
                  <p><strong>📍 Địa chỉ:</strong> {customer.address}</p>
                  <p><strong>📝 Lời nhắn:</strong> "{customer.note}"</p>
                  <p><strong>📂 Source:</strong> 
                    <a href={customer.source} className="text-blue-600 hover:underline" download> Tải về</a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal hiển thị ảnh lớn */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center" 
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Finished Work" 
            className="max-w-full max-h-screen rounded-lg shadow-lg object-contain" 
          />
        </div>
      )}
    </div>
  );
};

export default FinishList;
