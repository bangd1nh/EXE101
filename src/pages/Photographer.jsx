import React, { useState } from "react";
// import MiniNavBar from "../component/partials/MiniNavBar";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Popover,
    Select,
    Slider,
    Typography,
} from "@mui/material";
// import PhotographerCard from "../component/photographer/PhotographerCard";
import { major, photographers } from "../constants/data";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import MiniNavBar from "../components/partials/MiniNavbar";
import PhotographerCard from "../components/photograper/PhotographerCard";

function Photographer() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState([0, 18000000]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "price-popover" : undefined;
    const categories = ["TOP RATED", "NEW"];
    const countries = [
        "Vietnam",
        "Thailand",
        "Malaysia",
        "Singapore",
        "Indonesia",
        "Philippines",
        "Myanmar",
        "Cambodia",
        "Laos",
        "Brunei",
    ];

    const handleCallBack = (data) => {
        console.log(data);
    };

    const [selectedMajor, setSelectedMajor] = useState(major[0]);

    const languages = [
        "English",
        "Vietnamese",
        "Thai",
        "Malay",
        "Chinese",
        "Japanese",
        "Korean",
    ];

    const [ps, setPs] = useState(photographers);

    const [selectedLanguages, setSelectedLanguages] = useState(languages[0]);

    return (
        <div>
            <MiniNavBar categories={categories} callback={handleCallBack} />
            <div>
                <p className="text-center font-light text-3xl mt-5">
                    World's Best Wedding Photographers
                </p>
                <div className="flex gap-5 justify-center mt-5">
                    {countries.map((c, index) => {
                        return (
                            <p
                                key={index}
                                className="text-blue-500 hover:cursor-pointer hover:text-blue-700 transition ease duration-300"
                            >
                                {c}
                            </p>
                        );
                    })}
                </div>
                <div className="text-center mt-5">
                    <button className="bg-gray-400/25 rounded-[10%] px-5 py-1 text-blue-400 hover:bg-gray-400/75 duration-300 hover:cursor-pointer transition ease">
                        Choose Location
                    </button>
                </div>
                <div className="flex mt-5 justify-center">
                    <FormControl
                        sx={{
                            width: "384px",
                            border: "1px solid gray",
                            backgroundColor: "white",
                            "&:hover": {
                                border: "1px solid black",
                            },
                            transition: "ease 0.3s",
                        }}
                    >
                        <div className="flex flex-col p-[10px] ">
                            <Typography fontWeight="bold">
                                Photographer's specialty
                            </Typography>
                            <Select
                                value={selectedMajor}
                                onChange={(e) =>
                                    setSelectedMajor(e.target.value)
                                }
                                disableUnderline
                                variant="standard"
                                sx={{
                                    minWidth: "100px",
                                    fontSize: "14px",
                                    fontWeight: "normal",
                                }}
                            >
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
                        className="border-b border-t px-4 py-2 cursor-pointer hover:border-black w-96 border-gray-500 transition ease duration-300"
                        onClick={handleClick}
                    >
                        <Typography variant="subtitle2" fontWeight="bold">
                            Charge per hour
                        </Typography>
                        <Typography>
                            {value[0].toLocaleString()} -{" "}
                            {value[1].toLocaleString()} VND
                        </Typography>
                    </Box>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        <Box className="p-4 w-96 mt-5">
                            <Slider
                                value={value}
                                onChange={(e, newValue) => setValue(newValue)}
                                min={0}
                                max={18000000}
                                step={500000}
                                valueLabelDisplay="auto"
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Typography>0</Typography>
                                <Typography>3,000,000</Typography>
                                <Typography>18,000,000</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                color="primary"
                                onClick={handleClose}
                                className="mt-2"
                            >
                                Apply
                            </Button>
                        </Box>
                    </Popover>
                    <FormControl
                        sx={{
                            width: "384px",
                            border: "1px solid gray",
                            backgroundColor: "white",
                            "&:hover": {
                                border: "1px solid black",
                            },
                            transition: "ease 0.3s",
                        }}
                    >
                        <div className="flex flex-col p-[10px] ">
                            <Typography fontWeight="bold">
                                Photographer's language
                            </Typography>
                            <Select
                                value={selectedLanguages}
                                onChange={(e) =>
                                    setSelectedLanguages(e.target.value)
                                }
                                disableUnderline
                                variant="standard"
                                sx={{
                                    minWidth: "100px",
                                    fontSize: "14px",
                                    fontWeight: "normal",
                                }}
                            >
                                {languages.map((m) => (
                                    <MenuItem value={m} key={m}>
                                        {m}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </FormControl>
                </div>
            </div>
            <div className="w-7xl mx-auto">
                {ps.map((p, index) => {
                    return (
                        <div className="mt-5" key={index}>
                            <PhotographerCard photographer={p} />
                        </div>
                    );
                })}
            </div>
            <div className="text-center mt-10">
                <button className="border rounded border-gray-300 hover:border-black duration-300 font-semibold px-5 py-2">
                    Show more
                </button>
                <div className="flex justify-center gap-4 mt-5 mb-20">
                    <button className="hover:cursor-pointer">
                        <ArrowLeftOutlined />
                    </button>
                    {Array(5)
                        .fill(0)
                        .map((_, index) => {
                            return (
                                <button
                                    key={index}
                                    className={
                                        `hover:cursor-pointer border px-2 rounded  hover:border-black duration-300 ` +
                                        (index === 0
                                            ? "border-black"
                                            : "border-gray-300")
                                    }
                                >
                                    {index}
                                </button>
                            );
                        })}
                    <button className="hover:cursor-pointer">
                        <ArrowRightOutlined />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Photographer;
