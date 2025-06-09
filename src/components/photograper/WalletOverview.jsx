import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";
import { getId, getWallet } from "../../services/user";
import { toast } from "react-toastify";
import PageLoading from "../common/PageLoading.jsx";

const formatCurrency = (amount) => amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const WalletOverview = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch wallet data
  const handleFetchWalletUser = async () => {
    try {
      const res = await getWallet(getId());
      setWallet(res.data.data);
    } catch {
      toast.error("Không tìm thấy ví");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchWalletUser();
  }, []);

  if (loading) return <PageLoading />;

  if (!wallet) {
    return <div>Không có thông tin ví</div>;
  }

  if (!wallet.Transactions || wallet.Transactions.length === 0) {
    return <div>Không có giao dịch nào.</div>;
  }

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

          {wallet.Transactions.map((txn) => (
            <div key={txn._id} className="py-3 border-b last:border-none">
              <div className="flex justify-between">
                <Typography variant="body1" className="font-medium">
                  {txn.Type} – <span className="text-gray-500 text-sm">{txn.BookingId}</span>
                </Typography>
                <Typography variant="body1" className={`font-semibold ${txn.Amount > 0 ? "text-green-600" : "text-gray-500"}`}>
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
