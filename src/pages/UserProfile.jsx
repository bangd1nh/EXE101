import React, { useEffect, useState } from "react";
import {
    getId,
    getUserProfile,
    updateUserInfomation,
    uploadAvatar,
} from "../services/user";
import { useParams } from "react-router";

function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [processing, setProcessing] = useState(false);

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
    });

    const userId = getId();

    useEffect(() => {
        getUserProfile(userId)
            .then((res) => {
                const userData = res.data.payload;
                setUser({
                    ...userData,
                    userId: userData._id,
                    Avatar: userData.Avatar,
                });
                setEditedUser({
                    FirstName: userData.FirstName,
                    LastName: userData.LastName,
                    PhoneNumber: userData.PhoneNumber,
                });
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, [userId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const updatedUser = {
                firstName: editedUser.FirstName,
                lastName: editedUser.LastName,
                phoneNumber: editedUser.PhoneNumber,
            };
            console.log(user);
            const result = await updateUserInfomation(userId, updatedUser);
            if (result.data.payload) {
                alert(result.data.message);
                setUser({ ...user, ...editedUser });
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser({
            FirstName: user.FirstName,
            LastName: user.LastName,
            PhoneNumber: user.PhoneNumber,
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
                setUser({ ...user, Avatar: response.data.payload.url });
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
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
                            className="w-32 h-32 rounded-full object-cover"
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
                    <h1 className="text-2xl font-bold text-gray-900">
                        Profile Information
                    </h1>
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
                    <h2 className="text-xl font-semibold mb-4">
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
                                    value={editedUser.FirstName}
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
                                    value={editedUser.LastName}
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
                    <h2 className="text-xl font-semibold mb-4">
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
                                    value={editedUser.PhoneNumber}
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
                    <h2 className="text-xl font-semibold mb-4">
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
            </div>
        </div>
    );
}

export default UserProfile;
