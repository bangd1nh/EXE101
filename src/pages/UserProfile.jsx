import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/user";
import { useParams } from "react-router";
function UserProfile() {
    const { userId } = useParams();

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
    });

    useEffect(() => {
        getUserProfile(userId)
            .then((res) => {
                setUser({
                    userId: res.data.payload._id,
                    Email: res.data.payload.Email,
                    Username: res.data.payload.Username,
                    Role: res.data.payload.Role,
                    CreateAt: res.data.payload.CreateAt,
                    verify: res.data.payload.verify,
                    FirstName: res.data.payload.FirstName,
                    LastName: res.data.payload.LastName,
                    PhoneNumber: res.data.payload.PhoneNumber,
                });
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Profile Information
                </h1>

                <div className="space-y-6">
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Personal Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    First Name
                                </label>
                                <p className="mt-1 text-gray-900">
                                    {user.FirstName}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Last Name
                                </label>
                                <p className="mt-1 text-gray-900">
                                    {user.LastName}
                                </p>
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
                                <p className="mt-1 text-gray-900">
                                    {user.Email}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Phone Number
                                </label>
                                <p className="mt-1 text-gray-900">
                                    {user.PhoneNumber}
                                </p>
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
                                <p className="mt-1 text-gray-900">
                                    {user.Role}
                                </p>
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
                                        {user.verify
                                            ? "Verified"
                                            : "Unverified"}
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
        </div>
    );
}

export default UserProfile;
