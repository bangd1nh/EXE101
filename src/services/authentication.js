import axios from "axios";

const AUTHENTICATE_BASE_URL = import.meta.env.VITE_API_URL_AUTHENTICATE;

export const register = (newUser) =>
    axios.post(AUTHENTICATE_BASE_URL + "/register", newUser);

export const login = (user) =>
    axios.post(AUTHENTICATE_BASE_URL + "/login", user);

export const saveLoggedInUser = (user) => {
    sessionStorage.setItem("authenticatedUser", user.email);
    sessionStorage.setItem("userId", user.userId);
    sessionStorage.setItem("verify", user.verify);
    sessionStorage.setItem("role", user.role);
};

export const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};
