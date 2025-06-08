import React, { useState, useEffect } from "react";
import { getId } from "../../services/user";
import { acceptBookingRequest, getPendingBooking, rejectBookingRequest } from "../../services/booking";
import { toast } from "react-toastify";
import PageLoading from "../common/PageLoading.jsx";
import StatusBadge from "../common/StatusBadge";

const WaitingList = () => {
  const [loading, setLoading] = useState(true);
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  console.log({ customers });
  const photographerId = getId();

  // Lấy danh sách khách hàng đang pending
  const handleFetchCustomerBooking = () => {
    setLoading(true);
    getPendingBooking(photographerId)
      .then((res) => {
        setCustomers(res.data.payload);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetchCustomerBooking();
  }, []);

  const toggleExpand = (id) => {
    setExpandedCustomer(expandedCustomer === id ? null : id);
  };

  const handleAccept = (bookingId) => {
    setLoading(true);
    acceptBookingRequest(bookingId)
      .then((res) => {
        toast.success("Accept order successfully");
        handleFetchCustomerBooking();
      })
      .catch((err) => console.log(err));
  };

  const handleReject = async (bookingId) => {
    try {
      setLoading(true);
      await rejectBookingRequest(bookingId);
      toast.success("Reject order successfully");
      handleFetchCustomerBooking();
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) return <PageLoading />;

  return (
    <section className="py-10 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-[#e5b378] mb-6">Waiting List</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Service</th>
                <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-100">
              {customers.map((item) => (
                <React.Fragment key={item._id}>
                  <tr className="hover:bg-gray-50 transition cursor-pointer" onClick={() => toggleExpand(item._id)}>
                    <td className="px-6 py-4 flex items-center gap-3 whitespace-nowrap">
                      <img src={item.CustomerId.Avatar} alt={item.CustomerId.FirstName} className="w-10 h-10 rounded-full object-cover border" />
                      <span className="font-medium">
                        {item.CustomerId.FirstName} {item.CustomerId.LastName}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{item.ServiceId.Name}</td>

                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{formatDate(item.BookingDate)}</td>

                    <td className="px-6 py-4">
                      <StatusBadge status={item.Status} />
                    </td>

                    <td className="px-6 py-4 text-[#e5b378] font-medium hover:underline">{expandedCustomer === item._id ? "Hide" : "View"}</td>
                  </tr>

                  {expandedCustomer === item._id && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-6 py-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                          <p>
                            <span className="font-semibold">Phone:</span> {item.CustomerId.PhoneNumber}
                          </p>
                          <p>
                            <span className="font-semibold">Location:</span> {item.Location}
                          </p>
                          <p className="sm:col-span-2">
                            <span className="font-semibold">Message:</span> "{item.Message}"
                          </p>
                        </div>

                        {item.Status === "PENDING" && (
                          <div className="mt-4 flex gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAccept(item._id);
                              }}
                              className="text-xs bg-[#e5b378] hover:bg-green-500 text-white px-4 py-2 rounded-md transition"
                            >
                              Accept
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(item._id);
                              }}
                              className="text-xs bg-[#e5b378] hover:bg-red-500 text-white px-4 py-2 rounded-md transition"
                            >
                              Reject
                            </button>
                          </div>
                        )}
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

export default WaitingList;
