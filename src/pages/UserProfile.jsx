import React, { useEffect, useState } from "react";
import {
    getId,
    getUserProfile,
    updateUserInfomation,
    uploadAvatar,
    getUserRole,
} from "../services/user";
import { PhoneOutlined } from "@ant-design/icons";
import {
    getPhotograp,
    updateInforPhotograp,
    uploadAvatarPhoto,
} from "../services/photographers";
import { useNavigate, useParams } from "react-router";
import { Button } from "@mui/material";

function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [processing, setProcessing] = useState(false);
    const [processingPhoto, setProcessingPhoto] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userId: "",
        Email: "",
        Username: "",
        Role: "",
        CreateAt: "",
        verify: "",
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Avatar: "",
        ExperienceYear: "",
        Location: "",
        Device: "",
        Description: "",
        Rating: 0,
        Price: "",
        Photos: [],
    });

    const userId = getId();
    const roleUser = getUserRole();

    const fetchPhotographerData = async () => {
        try {
            const response = await getPhotograp(userId);
            const photgrapData = response.data.payload;
            if (photgrapData) {
                const photographerDetails = {
                    ExperienceYear: photgrapData.ExperienceYear || "",
                    Location: photgrapData.Location || "",
                    Device: photgrapData.Device || "",
                    Description: photgrapData.Description || "",
                    Rating: photgrapData.Rating || 0,
                    Price: photgrapData.Price || "",
                    Photos: photgrapData.PhotoGraphs?.imgUrl || [],
                    avatarPhoto: photgrapData.PhotographerId?.Avatar || "",
                };
                setUser((prev) => ({ ...prev, ...photographerDetails }));
                setEditedUser((prev) => ({
                    ...prev,
                    ExperienceYear: photographerDetails.ExperienceYear,
                    Location: photographerDetails.Location,
                    Device: photographerDetails.Device,
                    Description: photographerDetails.Description,
                    Price: photographerDetails.Price,
                }));
            }
            console.log(photgrapData);
        } catch (error) {
            console.log("Error fetching photographer data:", error);
        }
    };
    const featchDataUser = async () => {
        getUserProfile(userId)
            .then((res) => {
                const userData = res.data.payload;
                console.log({ userData });
                setUser((prev) => ({
                    ...prev,
                    ...userData,
                    userId: userData._id,
                    Avatar: userData.Avatar,
                }));
                setEditedUser((prev) => ({
                    ...prev,
                    FirstName: userData.FirstName,
                    LastName: userData.LastName,
                    PhoneNumber: userData.PhoneNumber,
                }));
                console.log(res);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        // Fetch user profile
        featchDataUser();
        // Fetch photographer data
        fetchPhotographerData();
    }, [userId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            // Update user information
            const updatedUser = {
                firstName: editedUser.FirstName,
                lastName: editedUser.LastName,
                phoneNumber: editedUser.PhoneNumber,
            };
            const userResult = await updateUserInfomation(userId, updatedUser);

            // Update photographer information
            const updatedPhotographer = {
                experienceYear: editedUser.ExperienceYear,
                location: editedUser.Location,
                device: editedUser.Device,
                desc: editedUser.Description,
                price: editedUser.Price,
                services: [],
            };
            const photographerResult = await updateInforPhotograp(
                userId,
                updatedPhotographer
            );

            if (userResult.data.payload || photographerResult.data.payload) {
                alert("Profile updated successfully!");
                setUser((prev) => ({
                    ...prev,
                    ...updatedUser,
                    ...updatedPhotographer,
                    Description: updatedPhotographer.desc,
                    Price: updatedPhotographer.price,
                }));
                setIsEditing(false);
            }
            fetchPhotographerData();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile: " + error.message);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser({
            FirstName: user.FirstName,
            LastName: user.LastName,
            PhoneNumber: user.PhoneNumber,
            ExperienceYear: user.ExperienceYear,
            Location: user.Location,
            Device: user.Device,
            Description: user.Description,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(editedUser);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setProcessing(true);
            const response = await uploadAvatar(userId, formData);
            if (response.status === 200) {
                alert("Avatar uploaded successfully!");
                console.log(response);
                featchDataUser();
            } else {
                alert("Failed to upload avatar.");
            }
        } catch (error) {
            alert("Error uploading avatar: " + error.message);
            console.log(error);
        } finally {
            setProcessing(false);
        }
    };
    const handleFileChangePhoto = async (e) => {
        const file = e.target.files[0];
        console.log({ file });
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        console.log({ formData });

        try {
            setProcessingPhoto(true);
            const response = await uploadAvatarPhoto(userId, formData);

            if (response.status === 200) {
                alert("Avatar uploaded successfully!");
                console.log(response);
                fetchPhotographerData();
                setUser({ ...user, Avatar: response.data.payload.url });
            } else {
                alert("Failed to upload avatar.");
            }
        } catch (error) {
            alert("Error uploading avatar: " + error.message);
            console.log(error);
        } finally {
            setProcessingPhoto(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US");
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 sm:p-8">
                <div className="flex items-center justify-center mb-6">
                    <div className="relative group">
                        <img
                            src={
                                processing
                                    ? "https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
                                    : user.Avatar ||
                                      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                            }
                            alt="Profile"
                            className="w-24 sm:w-32 h-24 sm:h-32 rounded-full object-cover"
                        />
                        <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow-lg">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                disabled={processing}
                                onChange={(e) => handleFileChange(e)}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Profile Information
                    </h1>
                    {roleUser === "CUSTOMER" && (
                        <nav>
                            <Button
                                variant="outlined"
                                className="w-full"
                                startIcon={<PhoneOutlined />}
                                onClick={() => {
                                    navigate("/contactForm/" + userId);
                                }}
                            >
                                Đặt Lịch
                            </Button>
                        </nav>
                    )}
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="space-x-2">
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
                <div className="space-y-6">
                    <div className="border-b pb-6"></div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        Personal Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                First Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="FirstName"
                                    value={editedUser.FirstName || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 p-2">
                                    {user.FirstName}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Last Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="LastName"
                                    value={editedUser.LastName || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 p-2">
                                    {user.LastName}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="border-b pb-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        Contact Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <p className="mt-1 text-gray-900">{user.Email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Phone Number
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="PhoneNumber"
                                    value={editedUser.PhoneNumber || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 p-2">
                                    {user.PhoneNumber}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        Account Details
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Role
                            </label>
                            <p className="mt-1 text-gray-900">{user.Role}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Account Status
                            </label>
                            <p className="mt-1">
                                <span
                                    className={`px-2 py-1 text-sm rounded-full ${
                                        user.verify
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                    {user.verify ? "Verified" : "Unverified"}
                                </span>
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Account Created
                            </label>
                            <p className="mt-1 text-gray-900">
                                {formatDate(user.CreateAt)}
                            </p>
                        </div>
                    </div>
                </div>
                {roleUser === "PHOTOGRAPHER" && (
                    <div className="space-y-6">
                        <div className="border-b pb-6"></div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">
                            Photographer Details
                        </h2>
                        {user.ExperienceYear ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">
                                            Years of Experience
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="ExperienceYear"
                                                value={
                                                    editedUser.ExperienceYear ||
                                                    ""
                                                }
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900 p-2">
                                                {user.ExperienceYear}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">
                                            Location
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="Location"
                                                value={
                                                    editedUser.Location || ""
                                                }
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900 p-2">
                                                {user.Location}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">
                                            Device
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="Device"
                                                value={editedUser.Device || ""}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900 p-2">
                                                {user.Device}
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-600">
                                            Description
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                name="Description"
                                                value={
                                                    editedUser.Description || ""
                                                }
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                rows="4"
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900 p-2">
                                                {user.Description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Rating
                                    </label>
                                    <p className="mt-1 text-gray-900 p-2">
                                        {user.Rating} / 5
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Price
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="Price"
                                            value={editedUser.Price || ""}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                            placeholder="Nhập giá (VD: 1500000 VND)"
                                        />
                                    ) : (
                                        <p className="mt-1 text-gray-900 p-2">
                                            {user.Price}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <div className="relative group">
                                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {user.Photos.length > 0 ? (
                                                user.Photos.map(
                                                    (photo, index) => (
                                                        <img
                                                            key={index}
                                                            src={photo}
                                                            alt={`Photo ${
                                                                index + 1
                                                            }`}
                                                            className="w-full h-32 sm:h-40 object-cover rounded-md"
                                                        />
                                                    )
                                                )
                                            ) : (
                                                <p className="text-gray-600">
                                                    No photos available.
                                                </p>
                                            )}
                                        </div>

                                        <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow-lg">
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                disabled={processingPhoto}
                                                onChange={(e) =>
                                                    handleFileChangePhoto(e)
                                                }
                                            />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-600 p-2">
                                No photographer information available.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
