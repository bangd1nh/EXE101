import React from "react";

const STATUS_MAP = {
  PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
  ACCEPT: { bg: "bg-blue-100", text: "text-blue-700", label: "Accepted" },
  WAITING_DEMO: { bg: "bg-purple-100", text: "text-purple-700", label: "Waiting Demo" },
  REJECT: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  DONE: { bg: "bg-green-100", text: "text-green-700", label: "Done" },
};

const StatusBadge = ({ status }) => {
  const { bg, text, label } = STATUS_MAP[status] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: status,
  };

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${bg} ${text}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
