import React, { useState } from "react";
import {
    MenuOutlined,
    CreditCardOutlined,
    InfoCircleOutlined,
    FileOutlined,
    CalendarOutlined,
    WechatOutlined,
} from "@ant-design/icons";
import { Input, InputAdornment, TextField } from "@mui/material";
import { Button } from "antd";

function PaymentPage() {
    return (
        <div className="grid grid-cols-2 h-screen bg-gray-100">
            <div className="bg-indigo-500 ms-20 mt-20 mb-20 text-white">
                <div className="p-20">
                    <p className="text-5xl font-light">100000000 VND</p>
                    <div className="flex justify-between text-4xl font-light mt-10">
                        <p>Commission:</p>
                        <p>1000000 VND</p>
                    </div>
                    <div className="flex justify-between text-4xl font-light">
                        <p>Total:</p>
                        <p>100000000 VND</p>
                    </div>
                    <div className="w-full border-b mt-5"></div>
                    <div className="flex text-3xl font-light mt-6">
                        <FileOutlined className="text-3xl" />
                        <p className="ms-5 me-2">Invoice ID:</p>
                        <p>SN123412568</p>
                    </div>
                    <div className="flex text-3xl font-light mt-6">
                        <CalendarOutlined className="text-3xl" />

                        <p className="ms-5 me-2">Booking Date:</p>
                        <p>16/3/2025</p>
                    </div>
                    <div className="flex items-center gap-10 mt-10 justify-between pe-20">
                        <div className="font-light text-2xl">
                            <p>Customer Support:</p>
                            <p>Online chat 24/7</p>
                        </div>
                        <div>
                            <WechatOutlined className="text-gray-500 hover:scale-125 transition-transform duration-300 cursor-pointer text-5xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-20 bg-white my-10 shadow-md shadow-black me-10">
                <div className="flex justify-between">
                    <p className="font-bold text-3xl">Checkout</p>
                    <MenuOutlined className="text-3xl" />
                </div>
                <div className="mt-15 border-b border-gray-400 flex">
                    <p className="text-2xl font-light hover:text-indigo-600 hover:border-b-indigo-600 hover:border-b duration-300 hover:cursor-default">
                        Visa Card
                    </p>
                    <p className="text-2xl font-light hover:text-indigo-600 hover:border-b-indigo-600 hover:border-b duration-300 hover:cursor-default ms-5">
                        Banking
                    </p>
                </div>
                <div className="m-20 p-10 border border-gray-200 rounded-xl">
                    <div className="flex gap-5 mb-5 border-b border-b-gray-400 items-center">
                        <InfoCircleOutlined className="text-xl" />{" "}
                        <p className="text-xl font-semibold">Card Infomation</p>
                    </div>
                    <TextField
                        id="standard-basic"
                        label="Credit Card"
                        variant="standard"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CreditCardOutlined />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        className="w-full"
                    />
                    <div className="flex gap-10 mt-5">
                        <TextField
                            id="standard-basic"
                            label="Expire Date"
                            variant="standard"
                            placeholder="MM/YY"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CreditCardOutlined />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            className="w-full"
                        />
                        <TextField
                            id="standard-basic"
                            label="CVV"
                            variant="standard"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <InfoCircleOutlined />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            className="w-full"
                        />
                    </div>
                    <div className="mt-5">
                        <TextField
                            id="standard-basic"
                            label="Card Holder Name"
                            variant="outlined"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <InfoCircleOutlined />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            className="w-full"
                        />
                    </div>

                    <Button variant="outlined" className="w-full mt-5">
                        Process Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
