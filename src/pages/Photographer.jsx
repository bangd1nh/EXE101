import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Select,
    Slider,
    Typography,
    Popover,
} from "@mui/material";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import PhotographerCard from "../components/photograper/PhotographerCard";
import { getAllPhotographers } from "../services/photographers";
import MiniNavBar from "../components/partials/MiniNavBar";
import { major } from "../constants/data";

function Photographer() {
    const [photographers, setPhotographers] = useState([]);
    const [filteredPhotographers, setFilteredPhotographers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;
    const [anchorEl, setAnchorEl] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 18000000]);
    const [selectedMajor, setSelectedMajor] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [category, setCategory] = useState("ALL");

    useEffect(() => {
        getAllPhotographers(page, limit)
            .then((res) => {
                if (
                    res.data.message === "success" &&
                    Array.isArray(res.data.payload.photographers)
                ) {
                    setPhotographers(res.data.payload.photographers);
                    setFilteredPhotographers(res.data.payload.photographers);
                    setTotal(res.data.payload.total || 0);
                }
            })
            .catch((err) => console.error("Error loading photographers:", err));
    }, [page]);

    useEffect(() => {
        if (
            !selectedMajor &&
            !selectedLanguage &&
            (category === "ALL" || !category)
        ) {
            setFilteredPhotographers(photographers);
            return;
        }

        let filtered = photographers;

        if (selectedMajor) {
            filtered = filtered.filter((p) =>
                p.Description?.toLowerCase().includes(
                    selectedMajor.toLowerCase()
                )
            );
        }

        filtered = filtered.filter((p) => {
            if (!p.Price) return true;
            const price = parseInt(p.Price.replace(" VND", "")) || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        if (selectedLanguage) {
            filtered = filtered.filter((p) =>
                p.Languages?.includes(selectedLanguage)
            );
        }

        if (category === "TOP RATED") {
            filtered = filtered.filter((p) => p.Rating >= 4.5);
        }

        setFilteredPhotographers(filteredPhotographers);
        console.log("Filtered photographers:", filtered);
    }, [selectedMajor, priceRange, selectedLanguage, category, photographers]);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? "price-popover" : undefined;
    const categories = ["TOP RATED", "NEW"];
    const languages = [
        "English",
        "Vietnamese",
        "Thai",
        "Malay",
        "Chinese",
        "Japanese",
        "Korean",
    ];

    const handleCallBack = (data) => {
        setCategory(data === "NEW" ? "ALL" : data);
    };
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="min-h-screen bg-gray-50">
            <MiniNavBar categories={categories} callback={handleCallBack} />
            <div className="text-center mt-4 sm:mt-6">
                <p className="text-2xl sm:text-3xl font-light">
                    World's Best Wedding Photographers
                </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-stretch justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 px-4 sm:px-6 lg:px-8">
                <FormControl
                    sx={{
                        width: { xs: "100%", sm: "300px" },
                        border: "1px solid gray",
                        backgroundColor: "white",
                        "&:hover": { border: "1px solid black" },
                        transition: "ease 0.3s",
                    }}
                >
                    <div className="flex flex-col p-2 sm:p-3">
                        <Typography
                            fontWeight="bold"
                            fontSize={{ xs: 14, sm: 16 }}
                        >
                            Specialty
                        </Typography>
                        <Select
                            value={selectedMajor}
                            onChange={(e) => setSelectedMajor(e.target.value)}
                            disableUnderline
                            variant="standard"
                            sx={{ fontSize: { xs: 12, sm: 14 } }}
                        >
                            <MenuItem value="">All Specialties</MenuItem>
                            {major.map((m) => (
                                <MenuItem value={m} key={m}>
                                    {m}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </FormControl>
                <Box
                    aria-describedby={id}
                    className="border px-3 py-2 sm:px-4 sm:py-2.5 cursor-pointer hover:border-black w-full sm:w-80 border-gray-500 transition duration-300"
                    onClick={handleClick}
                >
                    <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        fontSize={{ xs: 14, sm: 16 }}
                    >
                        Charge per Hour
                    </Typography>
                    <Typography fontSize={{ xs: 12, sm: 14 }}>
                        {priceRange[0].toLocaleString()} -{" "}
                        {priceRange[1].toLocaleString()} VND
                    </Typography>
                </Box>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Box className="p-4 w-80 sm:w-96 mt-2 sm:mt-4">
                        <Slider
                            value={priceRange}
                            onChange={(e, newValue) => setPriceRange(newValue)}
                            min={0}
                            max={18000000}
                            step={500000}
                            valueLabelDisplay="auto"
                        />
                        <Box display="flex" justifyContent="space-between">
                            <Typography fontSize={{ xs: 12, sm: 14 }}>
                                0
                            </Typography>
                            <Typography fontSize={{ xs: 12, sm: 14 }}>
                                3,000,000
                            </Typography>
                            <Typography fontSize={{ xs: 12, sm: 14 }}>
                                18,000,000
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={handleClose}
                            sx={{ mt: 2 }}
                        >
                            Apply
                        </Button>
                    </Box>
                </Popover>
                <FormControl
                    sx={{
                        width: { xs: "100%", sm: "300px" },
                        border: "1px solid gray",
                        backgroundColor: "white",
                        "&:hover": { border: "1px solid black" },
                        transition: "ease 0.3s",
                    }}
                >
                    <div className="flex flex-col p-2 sm:p-3">
                        <Typography
                            fontWeight="bold"
                            fontSize={{ xs: 14, sm: 16 }}
                        >
                            Language
                        </Typography>
                        <Select
                            value={selectedLanguage}
                            onChange={(e) =>
                                setSelectedLanguage(e.target.value)
                            }
                            disableUnderline
                            variant="standard"
                            sx={{ fontSize: { xs: 12, sm: 14 } }}
                        >
                            <MenuItem value="">All Languages</MenuItem>
                            {languages.map((m) => (
                                <MenuItem value={m} key={m}>
                                    {m}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </FormControl>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
                {filteredPhotographers.length > 0 ? (
                    <div className="grid !grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredPhotographers.map((p, index) => (
                            <div key={index}>
                                <PhotographerCard
                                    photographer={{
                                        ...p,
                                        ...p.PhotographerId,
                                        profile: p,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
                        No photographers match the selected filters.
                    </p>
                )}
            </div>
            <div className="text-center mt-8 sm:mt-12 mb-12 sm:mb-16">
                <button className="border rounded border-gray-300 hover:border-black transition duration-300 font-semibold px-4 sm:px-5 py-2 text-sm sm:text-base">
                    Show More
                </button>
                <div className="flex justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-6">
                    <button
                        className="text-base sm:text-lg p-1 sm:p-2 hover:text-gray-600 transition"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        <ArrowLeftOutlined />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`text-sm sm:text-base px-2 sm:px-3 py-1 rounded border hover:border-black transition duration-300 ${
                                page === index + 1
                                    ? "border-black"
                                    : "border-gray-300"
                            }`}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="text-base sm:text-lg p-1 sm:p-2 hover:text-gray-600 transition"
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={page === totalPages}
                    >
                        <ArrowRightOutlined />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Photographer;
