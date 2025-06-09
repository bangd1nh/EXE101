import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BOOKING_BASE_URL = import.meta.env.VITE_API_URL_BOOKING;
const BOOKING_BASE_URLS = import.meta.env.VITE_API_URL_BOOKINGS;

export const getPhotographerUserName = (photographerId) =>
    axios.get(BOOKING_BASE_URL + "/photographer/" + photographerId);

export const getUserInfomation = () => { 
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    return axios.get(BOOKING_BASE_URL + "/customer/" + decodedToken.userId);
};

export const bookPhotographer = (photographerId, data) => 
    axios.post(BOOKING_BASE_URL + "/book/photographer/" + photographerId, data);

export const getPendingBooking = (photographerId) =>   
    axios.get(BOOKING_BASE_URL + "/book/" + photographerId);

export const acceptBookingRequest = (bookingId) =>  
    axios.get(BOOKING_BASE_URL + "/book/accept/" + bookingId);

export const getAcceptedBookingRequest = (photographerId) =>  
    axios.get(BOOKING_BASE_URL + "/book/acceptList/" + photographerId);

export const getCustomerBooking = (customerId) =>   
    axios.get(BOOKING_BASE_URL + "/book/customer/" + customerId);

export const rejectBookingRequest = (bookingId) =>    
    axios.patch(`${BOOKING_BASE_URLS}${bookingId}/reject`);

export const uploadDemoRequest = (bookingId, formData) =>    
    axios.patch(`${BOOKING_BASE_URLS}${bookingId}/demo`, formData, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
    });
export const finalAcceptBooking = (bookingId, photographerId) =>
  axios.patch(`${BOOKING_BASE_URLS}${bookingId}/final-accept`, {
    photographerId,
  });


  

