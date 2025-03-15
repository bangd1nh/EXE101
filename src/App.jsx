import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router";
import Photographer from "./pages/Photographer";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PhotographerProfile from "./pages/PhotographerProfile";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/photographer" element={<Photographer />} />
                <Route path="/photos" element={<Photo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/photographer-profile"
                    element={<PhotographerProfile />}
                />
            </Routes>
        </>
    );
}

export default App;
