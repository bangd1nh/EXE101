import {
    Box,
    Button,
    Checkbox,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
    MailOutlined,
    LockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    GoogleOutlined,
} from "@ant-design/icons";

import "./style.css";

function Login() {
    const [showPass, setShowPass] = useState(false);
    return (
        <div className="grid grid-cols-2 h-screen">
            <div className="w-full h-full bg-gradient-login flex justify-center items-center">
                <p className="text-4xl font-light">Welcome</p>
            </div>
            <div className="px-50 py-20">
                <p className="text-4xl font-light">Sign In</p>
                <div className="mt-20">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            flexDirection: "row",
                        }}
                    >
                        <div className="me-5 items-center">
                            <MailOutlined />
                        </div>
                        <TextField
                            id="input-with-sx"
                            label="Email"
                            variant="standard"
                            fullWidth
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            flexDirection: "row",
                            marginTop: "1rem",
                        }}
                    >
                        <div className="me-5 items-center">
                            <LockOutlined />
                        </div>
                        <TextField
                            id="input-with-sx"
                            label="Password"
                            variant="standard"
                            fullWidth
                            type={showPass ? "password" : "text"}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <IconButton
                                            position="end"
                                            onClick={() => {
                                                setShowPass(!showPass);
                                            }}
                                        >
                                            {showPass ? (
                                                <EyeInvisibleOutlined />
                                            ) : (
                                                <EyeOutlined />
                                            )}
                                        </IconButton>
                                    ),
                                },
                            }}
                        />
                    </Box>
                </div>
                <div className="flex items-center border-t mt-10 border-t-stone-500">
                    <Checkbox />
                    <p className="font-semibold text-lg">Remember me ?</p>
                </div>
                <div className="mt-5">
                    <Button variant="contained" className="w-full">
                        <p>Sign in</p>
                    </Button>
                </div>
                <div className="mt-5 flex justify-center items-center">
                    <div className="border-t w-full border-stone-500"></div>
                    <p className="font-light text-xl mx-4">OR</p>
                    <div className="border-t w-full border-stone-500"></div>
                </div>
                <div className="mt-5">
                    <Button
                        variant="outlined"
                        className="w-full"
                        startIcon={<GoogleOutlined />}
                    >
                        Connect With Google
                    </Button>
                </div>
                <div className="flex justify-center gap-2 mt-5">
                    <p className="font-light">Dont have account? </p>
                    <a
                        className="text-blue-500 hover:cursor-pointer font-light"
                        href="/register"
                    >
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
