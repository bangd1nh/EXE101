import React, { useState, useEffect } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import MiniNavBar from "../components/partials/MiniNavBar";
import {
    getAllCategories,
    addCategory,
    addImageToGallery,
    getGalleryByCategory,
} from "../services/gallery";

const userRole = sessionStorage.getItem("role"); // "ADMIN" hoặc "CUSTOMER"...

const BookmarkFlags = ({ colors }) => (
    <div className="absolute top-0 right-3 sm:right-6 flex gap-1">
        {colors.map((color, index) => (
            <div
                key={index}
                className="w-3 h-4 sm:w-4 sm:h-6 rounded-sm"
                style={{
                    backgroundColor: color,
                    clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
                }}
            />
        ))}
    </div>
);

function Photo() {
    const [category, setCategory] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [imageFile, setImageFile] = useState(null);

    // Lấy danh sách category từ backend
    useEffect(() => {
        getAllCategories()
            .then((res) => setAllCategories(res.data.payload))
            .catch(() => setAllCategories([]));
    }, []);

    // Lấy gallery khi chọn category
    useEffect(() => {
        if (category && category._id) {
            getGalleryByCategory(category._id)
                .then((res) => setGallery(res.data.payload || []))
                .catch(() => setGallery([]));
        }
    }, [category]);

    // Thêm category mới
    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory) return;
        await addCategory(newCategory);
        // Reload lại danh sách
        const res = await getAllCategories();
        setAllCategories(res.data.payload);
        setNewCategory("");
    };

    // Thêm ảnh vào category
    const handleAddImage = async (e) => {
        e.preventDefault();
        if (!imageFile || !selectedCategoryId) return;
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("categoryId", selectedCategoryId);
        await addImageToGallery(formData);
        setImageFile(null);
        setSelectedCategoryId("");
        alert("Đã thêm ảnh vào gallery!");
        // Nếu đang xem đúng category thì reload ảnh
        if (category && category._id === selectedCategoryId) {
            const res = await getGalleryByCategory(selectedCategoryId);
            setGallery(res.data.payload || []);
        }
    };

    const handleCallBack = (catObj) => {
        setCategory(catObj);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <MiniNavBar categories={allCategories} callback={handleCallBack} />
            <div className="text-center mt-4 sm:mt-5">
                <p className="text-2xl sm:text-3xl font-semibold text-[#f27457]">
                    {category?.galeryCategoryName || ""}
                </p>
            </div>

            {/* ADMIN GALLERY MANAGEMENT */}
            {userRole === "ADMIN" && (
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 my-8">
                    <h2 className="text-xl font-bold mb-4 text-[#f27457]">
                        Quản lý Gallery
                    </h2>
                    <form
                        onSubmit={handleAddCategory}
                        className="flex gap-2 mb-4"
                    >
                        <input
                            type="text"
                            placeholder="Tên category mới"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="border px-3 py-2 rounded w-full"
                        />
                        <button
                            type="submit"
                            className="bg-[#f27457] text-white px-4 py-2 rounded"
                        >
                            Thêm Category
                        </button>
                    </form>
                    <form
                        onSubmit={handleAddImage}
                        className="flex gap-2 items-center"
                    >
                        <select
                            value={selectedCategoryId}
                            onChange={(e) =>
                                setSelectedCategoryId(e.target.value)
                            }
                            className="border px-3 py-2 rounded"
                        >
                            <option value="">Chọn category</option>
                            {allCategories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.galeryCategoryName}
                                </option>
                            ))}
                        </select>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="border px-3 py-2 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-[#e5b378] text-white px-4 py-2 rounded"
                        >
                            Thêm Ảnh
                        </button>
                    </form>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {gallery.map((imgUrl, index) => (
                        <div key={index} className="relative group">
                            <img
                                className="w-full aspect-square object-cover rounded-2xl"
                                src={
                                    typeof imgUrl === "string"
                                        ? imgUrl
                                        : imgUrl.url
                                }
                                alt={`Gallery ${index + 1}`}
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-center rounded-2xl">
                                <img
                                    src="ava.jpg"
                                    className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover"
                                />
                                <p className="font-semibold text-sm sm:text-base mt-1 sm:mt-2">
                                    {/* Có thể thêm tên tác giả nếu backend trả về */}
                                </p>
                                <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2 text-xs sm:text-sm">
                                    <span>❤️ 0</span>
                                    <span>💬 0</span>
                                    <span>🔖 0</span>
                                </div>
                            </div>
                            {/* BookmarkFlags vẫn giữ nguyên, gán cứng */}
                            <BookmarkFlags colors={["#f27457", "#e5b378"]} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6 sm:mt-8 mb-12 sm:mb-20">
                <button className="text-base sm:text-lg p-1 sm:p-2 hover:text-gray-600 transition">
                    <ArrowLeftOutlined />
                </button>
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <button
                            key={index}
                            className={`text-sm sm:text-base px-2 sm:px-3 py-1 rounded border hover:border-black transition duration-300 ${
                                index === 0 ? "border-black" : "border-gray-300"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                <button className="text-base sm:text-lg p-1 sm:p-2 hover:text-gray-600 transition">
                    <ArrowRightOutlined />
                </button>
            </div>
        </div>
    );
}

export default Photo;
