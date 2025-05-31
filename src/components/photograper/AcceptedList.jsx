import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getId } from "../../services/user";
import {
    doneBookingRequest,
    getAcceptedBookingRequest,
} from "../../services/booking";
import { Progress } from "antd";

const AcceptedList = () => {
    const [acceptedCustomers, setAcceptedCustomers] = useState([]);

    useEffect(() => {
        const photographerId = getId();
        getAcceptedBookingRequest(photographerId)
            .then((res) => {
                const formattedCustomers = res.data.payload.map((booking) => ({
                    id: booking._id,
                    name: `${booking.CustomerId.FirstName} ${booking.CustomerId.LastName}`,
                    avatar: booking.CustomerId.Avatar,
                    progress: 0,
                    uploads: [],
                    selectedFiles: [],
                    showUploads: false,
                    isDone: false, // Add isDone state
                    bookingDetails: {
                        date: new Date(
                            booking.BookingDate
                        ).toLocaleDateString(),
                        time: booking.Time,
                        location: booking.Location,
                        service: booking.ServiceId.Name,
                        price: booking.ServiceId.Price,
                    },
                }));
                setAcceptedCustomers(formattedCustomers);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectFiles = (id, event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        const newList = acceptedCustomers.map((customer) =>
            customer.id === id
                ? { ...customer, selectedFiles: files }
                : customer
        );

        setAcceptedCustomers(newList);
    };

    const handleSendFiles = (id) => {
        console.log(id);
        const newList = acceptedCustomers.map((customer) => {
            if (customer.id === id && customer.selectedFiles.length > 0) {
                const zipFile = customer.selectedFiles[0];
                const zipUrl = URL.createObjectURL(zipFile);
                doneBookingRequest(id)
                    .then((res) => alert(res.data.message))
                    .catch((err) => console.log(err));
                return {
                    ...customer,
                    uploads: [
                        ...customer.uploads,
                        {
                            id: Date.now(),
                            files: [
                                {
                                    name: zipFile.name,
                                    url: zipUrl,
                                },
                            ],
                        },
                    ],
                    selectedFiles: [],
                    process: 100,
                    progress: 100,
                    isDone: true, // Set isDone to true after upload
                };
            }

            return customer;
        });

        setAcceptedCustomers(newList);
    };

    const toggleUploads = (id) => {
        const newList = acceptedCustomers.map((customer) =>
            customer.id === id
                ? { ...customer, showUploads: !customer.showUploads }
                : customer
        );
        setAcceptedCustomers(newList);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center bg-gray-100">
            <header className="w-full  bg-[#e5b378] py-4 flex justify-between px-10 items-center shadow-md">
                <h1 className="text-xl font-bold tracking-wide text-gray-800">
                    Accepted List
                </h1>
                <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                    Message
                </button>
            </header>

            <div className="w-full max-w-6xl bg-white mt-10 p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {acceptedCustomers.map((customer) => (
                        <div
                            key={customer.id}
                            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition relative"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={customer.avatar}
                                    alt={customer.name}
                                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {customer.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {customer.isDone
                                            ? "Completed"
                                            : "In progress"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-600">
                                    Tiến độ: {customer.progress}%
                                </p>
                                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all"
                                        style={{
                                            width: `${customer.progress}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                {customer.isDone ? (
                                    <button className="flex-1 bg-green-500 text-white py-2 rounded-md cursor-not-allowed">
                                        Done
                                    </button>
                                ) : customer.selectedFiles.length > 0 ? (
                                    <button
                                        className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                                        onClick={() =>
                                            handleSendFiles(customer.id)
                                        }
                                    >
                                        Send
                                    </button>
                                ) : (
                                    <>
                                        <label className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md text-center cursor-pointer hover:bg-gray-400 transition">
                                            Upload
                                            <input
                                                type="file"
                                                accept=".zip, image/*"
                                                multiple
                                                className="hidden"
                                                onChange={(event) =>
                                                    handleSelectFiles(
                                                        customer.id,
                                                        event
                                                    )
                                                }
                                            />
                                        </label>

                                        <button
                                            className="flex-1 bg-[#e5b378] text-white py-2 rounded-md hover:bg-[#f27457] transition"
                                            onClick={() =>
                                                toggleUploads(customer.id)
                                            }
                                        >
                                            View Uploads
                                        </button>
                                    </>
                                )}
                            </div>

                            {customer.showUploads &&
                                customer.uploads.length > 0 && (
                                    <div className="mt-4 relative">
                                        <div className="absolute top-12 left-0 w-full bg-white shadow-md border border-gray-300 rounded-md p-4 z-10">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                                Uploaded Files:
                                            </p>
                                            <ul className="space-y-2">
                                                {customer.uploads.map(
                                                    (upload) => (
                                                        <li
                                                            key={upload.id}
                                                            className="text-sm text-gray-600 border-b py-1"
                                                        >
                                                            {upload.files.map(
                                                                (file, index) =>
                                                                    file.name.match(
                                                                        /\.(jpg|jpeg|png|gif)$/i
                                                                    ) ? (
                                                                        <img
                                                                            key={
                                                                                index
                                                                            }
                                                                            src={
                                                                                file.url
                                                                            }
                                                                            alt="Upload"
                                                                            className="w-10 h-10 inline-block rounded-md shadow-md"
                                                                        />
                                                                    ) : (
                                                                        <a
                                                                            key={
                                                                                index
                                                                            }
                                                                            href={
                                                                                file.url
                                                                            }
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-500 hover:underline"
                                                                        >
                                                                            {
                                                                                file.name
                                                                            }
                                                                        </a>
                                                                    )
                                                            )}
                                                        </li>
                                                    )
                                                )}
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
