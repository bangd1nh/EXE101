import { Button } from "@mui/material";
import React from "react";
import { PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

function PhotographerCard({ photographer }) {
    const navigate = useNavigate();
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 text-center">
                <img
                    src={photographer.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto"
                />
                <h2 className="text-lg font-bold text-blue-600 mt-2">
                    {photographer.name}
                </h2>
                <p className="text-sm text-gray-500">
                    @{photographer.username} PRO+
                </p>
                <p className="text-sm text-gray-600">{photographer.location}</p>
            </div>

            <div className="flex-1">
                <div className="flex gap-2 overflow-auto">
                    {photographer.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Portfolio"
                            className="rounded-md h-52"
                        />
                    ))}
                </div>
                <p className="mt-4 text-gray-700 font-light">
                    {photographer.bio}
                </p>
                <p className="mt-2 font-bold text-lg">{photographer.price}</p>
                <p className="text-gray-500 text-sm">
                    {photographer.minHours} hours minimum
                </p>
                <div className="mt-4 flex gap-3">
                    <Link to={"/contactForm"}>
                        {" "}
                        <Button
                            variant="outlined"
                            startIcon={<PhoneOutlined />}
                        >
                            Contact
                        </Button>
                    </Link>

                    <Button
                        onClick={() => alert("Thêm vào wishlist thành công")}
                        variant="outlined"
                        startIcon={<WhatsAppOutlined />}
                    >
                        Add to WishList
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            navigate("/photographer-profile");
                        }}
                    >
                        Visit profile
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/chat")}
                    >
                        Send a message
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PhotographerCard;
