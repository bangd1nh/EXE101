import React, { useState } from "react";

const AcceptedList = () => {
  const [acceptedCustomers, setAcceptedCustomers] = useState([
    { id: 1, name: "Emma Brown", avatar: "/public/images/navbar/7c843a564a5e39502032cabcb0d4368b.jpg", progress: 50, uploads: [], selectedFiles: [], showUploads: false },
    { id: 2, name: "Michael Smith", avatar: "/public/images/navbar/avatar.jpg", progress: 30, uploads: [], selectedFiles: [], showUploads: false },
    { id: 3, name: "Sophia Johnson", avatar: "/public/images/navbar/avatar.jpg", progress: 70, uploads: [], selectedFiles: [], showUploads: false },
    { id: 4, name: "Daniel Williams", avatar: "/public/images/navbar/avatar.jpg", progress: 40, uploads: [], selectedFiles: [], showUploads: false },
    { id: 5, name: "Emma Brown", avatar: "/public/images/navbar/7c843a564a5e39502032cabcb0d4368b.jpg", progress: 50, uploads: [], selectedFiles: [], showUploads: false },
    { id: 6, name: "Emma Brown", avatar: "/public/images/navbar/7c843a564a5e39502032cabcb0d4368b.jpg", progress: 50, uploads: [], selectedFiles: [], showUploads: false }
  ]);

  // Xử lý chọn file
  const handleSelectFiles = (id, event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const isZip = files.length === 1 && files[0].type === "application/zip";
    const isImages = files.every((file) => file.type.startsWith("image/"));

    if (!isZip && !isImages) {
      alert("Chỉ được upload file ZIP hoặc album ảnh!");
      return;
    }

    const newList = acceptedCustomers.map((customer) =>
      customer.id === id ? { ...customer, selectedFiles: files } : customer
    );

    setAcceptedCustomers(newList);
  };

  // Xử lý gửi file
  const handleSendFiles = (id) => {
    const newList = acceptedCustomers.map((customer) => {
      if (customer.id === id && customer.selectedFiles.length > 0) {
        const uploadedFiles = customer.selectedFiles.map((file) =>
          file.type === "application/zip" ? file.name : URL.createObjectURL(file)
        );

        return {
          ...customer,
          uploads: [...customer.uploads, { id: Date.now(), files: uploadedFiles }],
          selectedFiles: [],
        };
      }
      return customer;
    });

    setAcceptedCustomers(newList);
  };

  // Toggle dropdown
  const toggleUploads = (id) => {
    setAcceptedCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === id ? { ...customer, showUploads: !customer.showUploads } : customer
      )
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gray-100">
      {/* Header */}
      <header className="w-full bg-gray-200 py-4 flex justify-between px-10 items-center shadow-md">
        <h1 className="text-xl font-bold tracking-wide text-gray-800">Accepted List</h1>
        <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
          Message
        </button>
      </header>

      {/* Container */}
      <div className="w-full max-w-6xl bg-white mt-10 p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acceptedCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition relative"
            >
              {/* Thông tin user */}
              <div className="flex items-center space-x-4">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{customer.name}</h2>
                  <p className="text-sm text-gray-500">Đang trong quá trình chụp ảnh</p>
                </div>
              </div>

              {/* Tiến độ */}
              <div className="mt-4">
                <p className="text-sm text-gray-600">Tiến độ: {customer.progress}%</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${customer.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Upload ZIP hoặc Album */}
              <div className="mt-4 flex gap-2">
                {customer.selectedFiles.length > 0 ? (
                  // Chỉ hiển thị nút "Send" khi có file
                  <button
                    className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleSendFiles(customer.id)}
                  >
                    Send
                  </button>
                ) : (
                  // Khi chưa có file → Hiện "Upload" & "View Uploads"
                  <>
                    {/* Nút Upload */}
                    <label className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md text-center cursor-pointer hover:bg-gray-400 transition">
                      Upload
                      <input
                        type="file"
                        accept=".zip, image/*"
                        multiple
                        className="hidden"
                        onChange={(event) => handleSelectFiles(customer.id, event)}
                      />
                    </label>

                    {/* Nút View Uploads */}
                    <button
                      className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                      onClick={() => toggleUploads(customer.id)}
                    >
                      View Uploads
                    </button>
                  </>
                )}
              </div>

              {/* Danh sách file đã gửi */}
              {customer.showUploads && customer.uploads.length > 0 && (
                <div className="mt-4 relative">
                  <div className="absolute top-12 left-0 w-full bg-white shadow-md border border-gray-300 rounded-md p-4 z-10">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Uploaded Files:</p>
                    <ul className="space-y-2">
                      {customer.uploads.map((upload) => (
                        <li key={upload.id} className="text-sm text-gray-600 border-b py-1">
                          {upload.files.map((file, index) =>
                            file.includes("blob") ? (
                              <img
                                key={index}
                                src={file}
                                alt="Upload"
                                className="w-10 h-10 inline-block rounded-md shadow-md"
                              />
                            ) : (
                              <a
                                key={index}
                                href={file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {file}
                              </a>
                            )
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcceptedList;
