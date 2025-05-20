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
import { login, saveLoggedInUser } from "../services/authentication";
import { useNavigate } from "react-router";

function Login() {
    const [showPass, setShowPass] = useState(true);
    const [user, setUser] = useState({
        usernameOrEmail: "",
        password: "",
    });
    const naviate = useNavigate();
    const handleLogin = async () => {
        try {
            console.log(user);
            const result = await login(user);
            console.log(result);
            alert(result.data.message);
            if (result.status === 200) {
                const token = "Bearer " + result.data.token;
                localStorage.setItem("token", token);
                const authenticatedUser = {
                    userId: result.data.userId,
                    role: result.data.role,
                    verify: result.data.verify,
                    email: result.data.email,
                };
                saveLoggedInUser(authenticatedUser);
                naviate("/");
            }
        } catch (error) {
            if (error.response.status === 404) {
                alert("this username or email does not exist");
            }
            if (error.response.status === 400) {
                alert("password or email wrong");
            }
            if (error.response.status === 500) {
                alert("server error");
            }
        }
    };
    return (
        <div className="grid grid-cols-2">
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
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    usernameOrEmail: e.target.value,
                                });
                            }}
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
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
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
                    <Button
                        variant="contained"
                        className="w-full"
                        onClick={handleLogin}
                    >
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
