import React, { useEffect, useState } from "react";
import { getCustomerBooking } from "../services/booking";
import { getId } from "../services/user";

const BookingCustomer = () => {
    const [payload, setPayload] = useState([]);
    useEffect(() => {
        getCustomerBooking(getId())
            .then((res) => setPayload(res.data.payload))
            .catch((err) => console.log(err));
    }, []);

    console.log(payload);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Booking History
            </h2>
            <div className="space-y-6">
                {payload.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Booking with{" "}
                                {booking.PhotographerId.PhotographerId.Username}
                            </h3>
                            <span
                                className={`px-4 py-2 rounded-full font-bold text-sm
                                ${
                                    booking.Status.toLowerCase() === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                }
                            `}
                            >
                                {booking.Status}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-gray-600">
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-700 mr-2">
                                    Service:
                                </span>
                                {booking.ServiceId.Name}
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-700 mr-2">
                                    Date:
                                </span>
                                {new Date(
                                    booking.BookingDate
                                ).toLocaleDateString()}
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-700 mr-2">
                                    Time:
                                </span>
                                {booking.Time}
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-700 mr-2">
                                    Location:
                                </span>
                                {booking.Location}
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-700 mr-2">
                                    Price:
                                </span>
                                {booking.ServiceId.Price.toLocaleString()} VND
                            </p>
                            <p className="col-span-2">
                                <span className="font-semibold text-gray-700 mr-2">
                                    Message:
                                </span>
                                {booking.Message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingCustomer;
