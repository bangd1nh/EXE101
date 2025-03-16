import React, { useEffect, useState } from "react";

function MiniNavBar({ categories, callback }) {
    const [selectedCat, setSelectedCat] = useState(categories[0]);

    const handleCallBack = (cat) => {
        callback(cat);
    };

    useEffect(() => {
        callback(selectedCat);
    }, []);

    return (
        <div className="w-full border-b-[1px] border-gray-400 flex justify-center">
            {categories.map((cat, index) => {
                return (
                    <div
                        className={
                            (selectedCat === cat ? "border-b-[1px] " : "") +
                            `p-5 group mx-10 hover:border-b-[1px] h-16 duration-300 ease-linear`
                        }
                        onClick={() => {
                            handleCallBack(cat);
                            setSelectedCat(cat);
                            console.log(cat);
                        }}
                    >
                        <p
                            className={
                                (selectedCat === cat ? "text-stone-700 " : "") +
                                `text-stone-400 font-semibold duration-300 group-hover:text-stone-700 hover:cursor-default`
                            }
                            key={index}
                        >
                            {cat}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default MiniNavBar;
