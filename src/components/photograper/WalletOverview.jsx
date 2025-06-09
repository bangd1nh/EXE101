import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";

const formatCurrency = (amount) =>
  amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const demoWallet = {
  Balance: 18000000,
  Transactions: [
    {
      _id: "1",
      BookingId: "68452cb763975d28274da525",
      Type: "TRANSFER",
      Amount: 2500000,
      Timestamp: "2025-06-08T07:19:02.994+00:00",
    },
    {
      _id: "2",
      BookingId: "684415471ddf5ca9feae0595",
      Type: "TRANSFER",
      Amount: 0,
      Timestamp: "2025-06-08T07:29:42.330+00:00",
    },
    {
      _id: "3",
      BookingId: "684522a37e7a3be897302aea",
      Type: "TRANSFER",
      Amount: 1500000,
      Timestamp: "2025-06-08T15:05:07.631+00:00",
    },
    {
      _id: "4",
      BookingId: "6844739f7e902c04d5f6936f",
      Type: "TRANSFER",
      Amount: 2500000,
      Timestamp: "2025-06-08T15:09:28.071+00:00",
    },
    {
      _id: "5",
      BookingId: "6844139d1ddf5ca9feae0591",
      Type: "TRANSFER",
      Amount: 0,
      Timestamp: "2025-06-08T15:11:27.260+00:00",
    },
    {
      _id: "6",
      BookingId: "684569267e57eed0c8de01a1",
      Type: "TRANSFER",
      Amount: 10000000,
      Timestamp: "2025-06-08T15:19:47.745+00:00",
    },
    {
      _id: "7",
      BookingId: "6845693c7e57eed0c8de01bb",
      Type: "TRANSFER",
      Amount: 1500000,
      Timestamp: "2025-06-08T15:23:11.101+00:00",
    },
  ],
};

const WalletOverview = () => {
  const wallet = demoWallet;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Balance */}
      <Card className="bg-green-100">
        <CardContent>
          <Typography variant="h6" className="text-green-800 font-bold">
            Số dư ví hiện tại
          </Typography>
          <Typography variant="h4" className="mt-2 text-green-900">
            {formatCurrency(wallet.Balance)}
          </Typography>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-2">
            Lịch sử giao dịch
          </Typography>
          {wallet.Transactions.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Không có giao dịch nào.
            </Typography>
          )}

          {wallet.Transactions.map((txn) => (
            <div key={txn._id} className="py-3 border-b last:border-none">
              <div className="flex justify-between">
                <Typography variant="body1" className="font-medium">
                  {txn.Type} –{" "}
                  <span className="text-gray-500 text-sm">
                    {txn.BookingId}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  className={`font-semibold ${
                    txn.Amount > 0 ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {formatCurrency(txn.Amount)}
                </Typography>
              </div>
              <Typography variant="caption" color="text.secondary">
                {format(new Date(txn.Timestamp), "HH:mm dd/MM/yyyy")}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletOverview;
