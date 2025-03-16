import React from "react";
import ImageSwiper from "../components/landingPage/ImageSwiper";
import Galery from "../components/landingPage/Galery";
import Award from "../components/landingPage/Award";
import FeedBack from "../components/landingPage/FeedBack";

function LandingPage() {
    const hashTag = [
        "#walkway",
        "#sailboat",
        "#youth",
        "#sliding_door",
        "#microphone",
        "#wife",
        "#transparent",
        "#fashionable",
        "#crypt",
        "#pants",
        "#destination",
        "#camera_angle",
        "#bracelet",
        "#home",
        "#serious",
        "#groom_portrait",
        "#smile",
        "#heart",
        "#greenhouse",
        "#bouquet",
    ];
    return (
        <>
            <ImageSwiper />
            <Galery />
            <div className="justify-center text-center text-sm">
                <p>And thousands more of splendid photos by topics:</p>
            </div>
            <div className="max-w-5xl mx-auto p-4 flex flex-wrap gap-2 justify-center">
                {hashTag.map((hashTag) => (
                    <button className="rounded-3xl ms-2 me-2 px-2 py-1 text-blue-700 bg-gray-200 hover:bg-indigo-500 hover:text-white duration-300">
                        {hashTag}
                    </button>
                ))}
            </div>
            <Award />
            <FeedBack />
        </>
    );
}

export default LandingPage;
