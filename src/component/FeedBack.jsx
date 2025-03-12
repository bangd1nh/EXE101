import React from "react";

function FeedBack() {
    return (
        <div>
            <p className="text-center">
                These photographers are already with us
            </p>
            <div className="grid grid-cols-3 mx-auto w-5xl gap-5">
                <div className="border-2 border-gray-300 rounded-3xl p-10">
                    <img src="a.webp" className="rounded-full" />
                    <p className="text-center font-semibold text-indigo-600 mt-5 ">
                        Bagdnh
                    </p>
                    <p className="font-bold">
                        What do you like most about your profession?
                    </p>
                    <p>
                        That I have the opportunity to meet different people and
                        to travel around the world.
                    </p>
                    <p className="text-center mt-5 text-indigo-600">
                        View InterView
                    </p>
                </div>
                <div className="border-2 border-gray-300 rounded-3xl p-10">
                    <img src="a.webp" className="rounded-full" />
                    <p className="text-center font-semibold text-indigo-600 mt-5 ">
                        Bagdnh
                    </p>
                    <p className="font-bold">
                        What do you like most about your profession?
                    </p>
                    <p>
                        That I have the opportunity to meet different people and
                        to travel around the world.
                    </p>
                    <p className="text-center mt-5 text-indigo-600">
                        View InterView
                    </p>
                </div>
                <div className="border-2 border-gray-300 rounded-3xl p-10">
                    <img src="a.webp" className="rounded-full" />
                    <p className="text-center font-semibold text-indigo-600 mt-5 ">
                        Bagdnh
                    </p>
                    <p className="font-bold">
                        What do you like most about your profession?
                    </p>
                    <p>
                        That I have the opportunity to meet different people and
                        to travel around the world.
                    </p>
                    <p className="text-center mt-5 text-indigo-600">
                        View InterView
                    </p>
                </div>
            </div>
            <div className="w-3xl mx-auto mt-10">
                <p className="text-2xl font-light text-center">
                    Get inspired by beautiful photos, chat about and communicate
                    with other photographers, receive requests from couples in
                    love!
                </p>
                <div className="text-center mt-10 mb-10">
                    <button className="text-white bg-indigo-500 hover:bg-indigo-800 px-20 py-5 rounded-3xl text-2xl font-semibold duration-300">
                        Join
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeedBack;
