import React, { useEffect, useState } from "react";

const MiniNavBar = ({ categories, callback }) => {
    const [selectedCat, setSelectedCat] = useState(
        categories && categories.length > 0
            ? categories[0].galeryCategoryName
            : ""
    );

    useEffect(() => {
        if (categories && categories.length > 0) {
            callback(categories[0]);
            setSelectedCat(categories[0].galeryCategoryName);
        }
        // eslint-disable-next-line
    }, [categories]);

    const handleSelect = (cat) => {
        setSelectedCat(cat.galeryCategoryName);
        callback(cat);
    };

    return (
        <div className="w-full border-b-[1px] border-gray-400 flex justify-center flex-wrap">
            {categories &&
                categories.map((cat) => (
                    <div
                        key={cat._id}
                        className={
                            (selectedCat === cat.galeryCategoryName
                                ? "border-b-[1.5px] "
                                : "") +
                            `p-5 group mx-10 hover:border-b-[1px] h-16 duration-300 ease-linear text-[#f27457] cursor-pointer`
                        }
                        onClick={() => handleSelect(cat)}
                    >
                        <p
                            className={
                                (selectedCat === cat.galeryCategoryName
                                    ? "text-[#f27457]"
                                    : "text-stone-400") +
                                ` font-semibold duration-300 group-hover:text-[#f27457] text-2xl`
                            }
                        >
                            {cat.galeryCategoryName}
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default MiniNavBar;
