import React from "react";

function MiniNavBar({ categories }) {
    console.log(categories);
    return (
        <div className="w-full border-b-[1px] border-gray-400 flex justify-center">
            {categories.map((cat, index) => {
                return (
                    <div className="p-5 group mx-10 hover:border-b-[1px] h-16 duration-300 ease-linear">
                        <p
                            className="text-stone-400 font-semibold duration-300 group-hover:text-stone-700 "
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
