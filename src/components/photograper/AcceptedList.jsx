import React, { useEffect, useState, useRef } from "react";
import { getId } from "../../services/user";
import { getAcceptedBookingRequest, uploadDemoRequest } from "../../services/booking";
import StatusBadge from "../../components/common/StatusBadge";
import { toast } from "react-toastify";
import ButtonLoading from "../common/ButtonLoading.jsx";
import DemoViewer from "../../components/common/DemoViewer.tsx";

const AcceptedList = () => {
  const [bookings, setBookings] = useState([]);
  console.log({ bookings });
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [dialogOpenId, setDialogOpenId] = useState(null);
  const [driveLink, setDriveLink] = useState("");
  const fileInputRefs = useRef({});
  const photographerId = getId();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getAcceptedBookingRequest(photographerId);
      const data = res.data.payload.map((booking) => ({
        id: booking._id,
        name: `${booking.CustomerId.FirstName} ${booking.CustomerId.LastName}`,
        avatar: booking.CustomerId.Avatar,
        status: booking.Status,
        uploads: booking.DemoPhotos || [],
        details: {
          date: new Date(booking.BookingDate).toLocaleDateString(),
          time: booking.Time,
          location: booking.Location,
          service: booking.ServiceId.Name,
          price: booking.ServiceId.Price,
        },
      }));
      setBookings(data);
    } catch (err) {
      console.log(err)
    }
  };

  const triggerFileInput = (id) => {
    fileInputRefs.current[id]?.click();
  };

  const handleFileChange = async (id, e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const formData = new FormData();
    for (let file of files) formData.append("files", file);
    formData.append("driveLink", driveLink);
    setLoadingId(id);
    try {
      await uploadDemoRequest(id, formData);
      toast.success("Gửi demo thành công");
      await fetchBookings();
    } catch (err) {
      toast.error("Gửi demo thất bại");
    } finally {
      setLoadingId(null);
      setDialogOpenId(null);
    }
  };

  const toggleRow = (id) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-10 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-[#e5b378] mb-6 text-center">Accepted Bookings</h2>

        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <React.Fragment key={booking.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={booking.avatar} alt="" className="w-10 h-10 rounded-full" />
                      <span>{booking.name}</span>
                    </td>
                    <td className="px-6 py-4">{booking.details.service}</td>
                    <td className="px-6 py-4">{booking.details.price.toLocaleString()} VND</td>
                    <td className="px-6 py-4">
                      {booking.details.time}, {booking.details.date}
                    </td>
                    <td className="px-6 py-4">{booking.details.location}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 space-y-2">
                      <button onClick={() => toggleRow(booking.id)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs">
                        View
                      </button>
                      {["ACCEPT", "WAITING_DEMO"].includes(booking.status) && (
                        <>
                          <button onClick={() => setDialogOpenId(booking.id)} className="bg-blue-500 text-white px-3 py-1 rounded text-xs">
                            Gửi demo
                          </button>
                          {dialogOpenId === booking.id && (
                            <div className="bg-white shadow p-4 rounded mt-2">
                              <label className="block text-sm mb-2 text-gray-700">Link Google Drive:</label>
                              <input type="text" value={driveLink} onChange={(e) => setDriveLink(e.target.value)} placeholder="Nhập..." />

                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                ref={(el) => (fileInputRefs.current[booking.id] = el)}
                                onChange={(e) => handleFileChange(booking.id, e)}
                              />
                              <button
                                onClick={() => triggerFileInput(booking.id)}
                                disabled={loadingId === booking.id}
                                className="bg-green-600 text-white px-4 py-1 rounded text-sm flex items-center justify-center gap-2 min-w-[120px]"
                              >
                                {loadingId === booking.id ? <ButtonLoading /> : "Tải ảnh & gửi"}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  </tr>

                  {expandedRowId === booking.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="px-6 py-4">
                        <DemoViewer files={booking.uploads} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AcceptedList;
