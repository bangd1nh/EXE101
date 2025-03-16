import React from "react";

const imgSrc = ["a.webp", "b.jpg", "c.jpg"];

function Galery() {
    return (
        <div className="max-w-5xl mx-auto p-4">
            <p className="text-center text-3xl mt-10">
                The best family and wedding photos of the week
            </p>
            <div className="grid grid-cols-3 gap-4">
                {imgSrc.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <img
                            src={"/public/images/navbar/7c843a564a5e39502032cabcb0d4368b.jpg"}
                            alt={`Image ${index + 1}`}
                            className="w-64 h-64 object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Galery;
