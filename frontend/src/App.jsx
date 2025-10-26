import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./module/LandingPage.jsx";
import SigninPage from "./module/SigninPage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </div>
  );
}

export default App;
