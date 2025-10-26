import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./module/LandingPage.jsx";
import SigninPage from "./module/AccountModule/SigninPage.jsx";
import WelcomePage from "./module/AccountModule/WelcomePage.jsx";
import SigninDetails from "./module/AccountModule/SigninDetails.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signin-details" element={<SigninDetails />} />
      </Routes>
    </div>
  );
}

export default App;
