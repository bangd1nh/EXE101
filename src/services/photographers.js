import axios from "axios";

const PHOTOGRAPHERS_BASE_API_URL = import.meta.env.VITE_API_URL_PHOTOGRAPHER;

export const getAllPhotographers = (page = 1, limit = 10) =>
    axios.get(`${PHOTOGRAPHERS_BASE_API_URL}?page=${page}&limit=${limit}`);

export const getPhotographersById = (pId) =>
    axios.get(PHOTOGRAPHERS_BASE_API_URL + "/" + pId);

export const getPhotographerServices = (photographerId) =>
    axios.get(PHOTOGRAPHERS_BASE_API_URL + "/services/" + photographerId);

export const getPhotograp = async (photographerId) => {
    console.log(PHOTOGRAPHERS_BASE_API_URL);
    try {
        const res = await axios.get(
            PHOTOGRAPHERS_BASE_API_URL + "/user/" + photographerId
        );
        return res;
    } catch (err) {}
};
export const updateInforPhotograp = (userId, updateUser) =>
    axios.put(PHOTOGRAPHERS_BASE_API_URL + "/user/" + userId, updateUser);
export const uploadAvatarPhoto = (userId, formData) =>
    axios.post(
        PHOTOGRAPHERS_BASE_API_URL + "/user/uploadImage/" + userId,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
