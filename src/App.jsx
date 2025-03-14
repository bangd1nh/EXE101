import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router";
import Photographer from "./pages/Photographer";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/photographer" element={<Photographer />} />
            </Routes>
        </>
    );
}

export default App;
