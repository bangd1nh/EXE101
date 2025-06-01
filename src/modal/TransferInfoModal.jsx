import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
// import { Close } from "@mui/icons-material";
import imgQr from "../assets/qr.jpg";
const TransferInfoModal = ({ open, onClose, transferData }) => {
    const { bankName, accountNumber, accountHolder, amount, qrValue } =
        transferData || {};

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Thông tin chuyển khoản
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    {/* <Close /> */}
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
                <Typography variant="subtitle1" gutterBottom>
                    Số tiền: <strong>{amount.toLocaleString()} VND</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                    * Vui lòng chuyển đúng số tiền và nội dung để hệ thống tự
                    động xác nhận.
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default TransferInfoModal;
