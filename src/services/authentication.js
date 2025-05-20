import axios from "axios";

const AUTHENTICATE_BASE_URL = "http://localhost:3000/api/authenticate";

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
