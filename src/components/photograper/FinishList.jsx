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
                "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg",
            ],
            source: "/downloads/SophiaWhite.zip",
        },
        {
            id: 2,
            name: "William Black",
            phone: "0987-654-321",
            address: "TP.HCM",
            note: "Ảnh rất đẹp, sẽ quay lại!",
            avatar: "/public/images/navbar/avatar.jpg",
            images: [
                "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
                "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg",
                "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
                "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg",
            ],
            source: "/downloads/WilliamBlack.zip",
        },
        {
            id: 3,
            name: "William Black",
            phone: "0987-654-321",
            address: "TP.HCM",
            note: "Ảnh rất đẹp, sẽ quay lại!",
            avatar: "/public/images/navbar/avatar.jpg",
            images: [
                "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
                "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg",
                "/public/images/navbar/dceecfa49cb847f2b03e97c31a5ba8f1.jpg",
                "/public/images/navbar/f7a5a868ac09dd109f91c23c177cc354.jpg",
            ],
            source: "/downloads/WilliamBlack.zip",
        },
    ];

    const toggleExpand = (id) => {
        setExpandedCustomer(expandedCustomer === id ? null : id);
    };

return (
  <section className="py-10 bg-gray-100 min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-[#e5b378] mb-6">Finish List</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-100">
            {finishedCustomers.map((customer) => (
              <React.Fragment key={customer.id}>
                <tr
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => toggleExpand(customer.id)}
                >
                  <td className="px-6 py-4 flex items-center gap-3 whitespace-nowrap">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{customer.name}</p>
                      <span className="text-xs text-green-600">Completed</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full font-medium">
                      Finished
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-[#e5b378] text-xs font-semibold hover:underline">
                      {expandedCustomer === customer.id ? "Hide" : "View"}
                    </span>
                  </td>
                </tr>

                {/* Expanded Info */}
                {expandedCustomer === customer.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="px-6 py-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <p>
                          <strong>Phone:</strong> {customer.phone}
                        </p>
                        <p>
                          <strong>Address:</strong> {customer.address}
                        </p>
                        <p className="sm:col-span-2">
                          <strong>Feedback:</strong> "{customer.note}"
                        </p>
                        <p className="sm:col-span-2">
                          <strong>Source:</strong>{" "}
                          <a
                            href={customer.source}
                            download
                            className="text-blue-600 hover:underline"
                          >
                            Download File
                          </a>
                        </p>
                      </div>

                      {/* Gallery */}
                      <div className="mt-6">
                        <p className="font-medium text-gray-700 mb-2">Gallery</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {customer.images.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt="Preview"
                              className="w-full h-24 object-cover rounded-md shadow-sm hover:scale-105 transition cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(img);
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Modal image preview */}
    {selectedImage && (
      <div
        className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
        onClick={() => setSelectedImage(null)}
      >
        <img
          src={selectedImage}
          alt="Zoomed"
          className="max-w-full max-h-screen rounded-lg shadow-lg object-contain"
        />
      </div>
    )}
  </section>
);


};

export default FinishList;
