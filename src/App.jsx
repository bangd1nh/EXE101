import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/partials/Navbar";
import WaitingList from "./components/photograper/WaitingList";
import AcceptedList from "./components/photograper/AcceptedList";
import FinishList from "./components/photograper/FinishList";
import LandingPage from "./pages/LandingPage";

import { Route, Routes } from "react-router";
import Photographer from "./pages/Photographer";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/photographer" element={<Photographer />} />
                <Route path="/photos" element={<Photo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/waiting-list" element={<WaitingList />} />
                <Route path="/accepted-list" element={<AcceptedList />} />
                <Route path="/finish-list" element={<FinishList />} />
            </Routes>
        </>
    );
}

export default App;
