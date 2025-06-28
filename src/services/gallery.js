const GALLERY_BASE_URL = import.meta.env.VITE_API_URL_GALLERY;

import axios from "axios";

export const getAllCategories = () => {
    return axios.get(`${GALLERY_BASE_URL}/getAllCategoryName`);
};
export const addCategory = (categoryName) => {
    return axios.post(`${GALLERY_BASE_URL}/addCategory`, { categoryName });
};

export const getGalleryByCategory = (categoryId) => {
    return axios.get(`${GALLERY_BASE_URL}/getGalleryByCategory/${categoryId}`);
};

export const addImageToGallery = (formData) => {
    return axios.post(`${GALLERY_BASE_URL}/addImageToGallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
