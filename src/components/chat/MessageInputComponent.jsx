import { SendOutlined } from "@ant-design/icons";
import { Button, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";

const MessageInputComponent = ({ onSend }) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div className="p-4 items-center bg-indigo-500 rounded-b-3xl">
            <div className="flex border-gray-300">
                <Input
                    placeholder="Message...."
                    className="w-full ps-5 bg-indigo-500 text-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                        "& .MuiInputBase-input::placeholder": {
                            color: "white",
                            opacity: 1,
                        },

                        color: "white",
                    }}
                    endAdornment={
                        <Button
                            onClick={handleSend}
                            endIcon={<SendOutlined />}
                            style={{ color: "white" }}
                        ></Button>
                    }
                />
            </div>
        </div>
    );
};

export default MessageInputComponent;
