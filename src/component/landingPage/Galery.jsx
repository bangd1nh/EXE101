import React from "react";

const imgSrc = ["a.webp", "b.jpg", "c.jpg", "d.webp", "e.jpg", "f.webp"];

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
                            src={src}
                            alt={`Image ${index + 1}`}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Galery;
