import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import imgQr from "../assets/qr.jpg";
import { toast } from "react-toastify";

const TransferInfoModal = ({ open, onClose, transferData }) => {
    const { bankName, accountNumber, accountHolder, amount } = transferData || {};
    const [secondsLeft, setSecondsLeft] = useState(120); // 2 phút

    useEffect(() => {
        if (!open) return;

        setSecondsLeft(120); // reset khi mở lại

        const countdown = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    toast.warn("Mã QR đã hết hạn. Vui lòng đặt lịch lại để tiếp tục.");
                    onClose(); 
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [open]);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m} phút ${sec.toString().padStart(2, '0')} giây`;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Thông tin chuyển khoản
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    {/* X */}
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="center" my={2}>
                    <img src={imgQr} alt="qr" className="w-[180px] h-[180px]" />
                </Box>

                <Typography variant="subtitle1" gutterBottom>
                    Ngân hàng: <strong>{bankName}</strong>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Số tài khoản: <strong>{accountNumber}</strong>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Chủ tài khoản: <strong>{accountHolder}</strong>
                </Typography>

                {/* countdown */}
                {secondsLeft > 0 && (
                    <Box mt={2}>
                        <Typography variant="body1" color="error">
                            Mã QR sẽ hết hạn sau <strong>{formatTime(secondsLeft)}</strong>
                        </Typography>
                        <Typography variant="body2" mt={1} color="text.secondary">
                            * Hãy quét mã ngay để đặt lịch với nhiếp ảnh gia ưng ý nhất!
                        </Typography>
                    </Box>
                )}

                <Typography variant="body2" color="text.secondary" mt={2}>
                    * Vui lòng chuyển đúng số tiền và nội dung để hệ thống tự động xác nhận.
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default TransferInfoModal;
