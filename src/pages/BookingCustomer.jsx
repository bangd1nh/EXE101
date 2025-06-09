import React, { useEffect, useState } from "react";
import { getCustomerBooking, finalAcceptBooking } from "../services/booking";
import { getId } from "../services/user";
import StatusBadge from "../components/common/StatusBadge.jsx";
import DemoViewer from "../components/common/DemoViewer.tsx";
import Loading from "../components/common/ButtonLoading.jsx";
import TransferInfoModal from "../modal/TransferInfoModal.jsx";
import { toast } from "react-toastify";

const BookingCustomer = () => {
  const [payload, setPayload] = useState([]);
  console.log({ payload });
  const [expandedId, setExpandedId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [driveLinkMap, setDriveLinkMap] = useState({});
  const [loadingAccept, setLoadingAccept] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getCustomerBooking(getId());
      setPayload(res.data.payload);
    } catch {
      toast.error("Lỗi tải danh sách booking");
    }
  };

  const handleDoneClick = async (bookingId) => {
    setSelectedBookingId(bookingId);
    setLoadingAccept(true);
    try {
      const res = await finalAcceptBooking(bookingId, getId());
      const driveLink = res.data.data.DriveLink;
      setDriveLinkMap((prev) => ({ ...prev, [bookingId]: driveLink }));
      await fetchBookings();
    } catch {
      toast.error("Lỗi xác nhận thanh toán");
    } finally {
      setLoadingAccept(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedBookingId(null);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Booking History</h2>
      <div className="space-y-6">
        {payload.map((booking) => {
          const actualDriveLink = booking.DriveLink || driveLinkMap[booking._id];
          return (
            <div key={booking._id} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Booking with {booking.PhotographerId?.PhotographerId?.Username || "Unknown Photographer"}
                </h3>
                <StatusBadge status={booking.Status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <p>
                  <span className="font-semibold">Service:</span> {booking.ServiceId?.Name}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {new Date(booking.BookingDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {booking.Time}
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {booking.Location}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> {booking.ServiceId?.Price.toLocaleString()} VND
                </p>
                {booking.Message && (
                  <p className="col-span-2">
                    <span className="font-semibold">Message:</span> {booking.Message}
                  </p>
                )}
              </div>

              {booking.DemoPhotos?.length > 0 && (
                <div className="mt-4">
                  <button onClick={() => setExpandedId(expandedId === booking._id ? null : booking._id)} className="text-blue-600 underline text-sm">
                    {expandedId === booking._id ? "Ẩn ảnh demo" : "Xem ảnh demo"}
                  </button>
                  {expandedId === booking._id && (
                    <div className="mt-2">
                      <DemoViewer files={booking.DemoPhotos} />
                    </div>
                  )}
                </div>
              )}

              {booking.Status === "WAITING_DEMO" && (
                <div className="mt-4">
                  <button onClick={() => handleDoneClick(booking._id)} className="bg-green-600 text-white px-4 py-2 rounded" disabled={loadingAccept}>
                    {loadingAccept ? <Loading size="sm" /> : "Done"}
                  </button>
                </div>
              )}

              {booking.Status === "DONE" && actualDriveLink && (
                <div className="mt-4 text-green-600 text-sm">
                  Link ảnh gốc:{" "}
                  <a href={actualDriveLink} target="_blank" rel="noopener noreferrer" className="underline">
                    {actualDriveLink}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dialog hiện ngay khi bấm Done */}
      <TransferInfoModal
        open={!!selectedBookingId}
        onClose={handleCloseModal}
        transferData={{
          bankName: "Mbbank",
          accountNumber: "838929082002",
          accountHolder: "Admin",
          amount: 500000,
        }}
      />
    </div>
  );
};

export default BookingCustomer;
