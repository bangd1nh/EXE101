import axios from "axios";
import { jwtDecode } from "jwt-decode";

const USER_BASE_URL = import.meta.env.VITE_API_URL_USER;
const WALLET_BASE_URL = import.meta.env.VITE_API_URL_WALLET;


export const getUserProfile = (userId) =>
    axios.get(USER_BASE_URL + "/" + userId);

export const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    return "/user/" + decodedToken.userId;
};

export const updateUserInfomation = (userId, updateUser) =>
    axios.put(USER_BASE_URL + "/" + userId, updateUser);

export const uploadAvatar = (userId, formData) =>
    axios.post(USER_BASE_URL + "/uploadImage/" + userId, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const getId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    return decodedToken.userId;
};

export const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
};

export const getWallet = (userId) =>
    axios.get(WALLET_BASE_URL  + userId);

