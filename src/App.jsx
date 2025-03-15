import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/partials/Navbar";
import WaitingList from "./components/photograper/WaitingList";
import AcceptedList from "./components/photograper/AcceptedList";
import FinishList from "./components/photograper/FinishList";
import LandingPage from "./pages/LandingPage"



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/waiting-list" element={<WaitingList/>} />
        <Route path="/accepted-list" element={<AcceptedList/>} />
        <Route path="/finish-list" element={<FinishList/>} />
      </Routes>
    </Router>
  );
}

export default App;
