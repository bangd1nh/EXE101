import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { verify } from "../services/authentication";

function VerifyEmail() {
    const { token } = useParams();
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(
            () =>
                verify(token)
                    .then((res) => {
                        if (res.data.payload) {
                            setSuccess(true);
                        } else {
                            setFail(true);
                        }
                    })
                    .catch((err) => {
                        setFail(true);
                        console.log(err);
                    }),
            1000
        );
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Email Verification
                    </h2>
                    <p className="text-gray-600 mb-6">
                        We're verifying your email address using the token:
                        <span className="block font-mono bg-gray-100 p-2 mt-2 rounded">
                            {token}
                        </span>
                    </p>
                    {success ? (
                        <div>
                            <div className="text-green-500 text-xl mb-4">
                                Email verification successful!
                            </div>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Go to Login
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                            <p className="text-gray-600 mt-4">
                                Please wait while we verify your email...
                            </p>
                        </div>
                    )}
                    {fail && (
                        <div>
                            <p className="text-gray-600 mt-4 mb-4">
                                Something went wrong
                            </p>
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Go to Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;
