import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./module/LandingPage.jsx";
import SignUpPage from "./module/AccountModule/SignUpPage.jsx";
import WelcomePage from "./module/AccountModule/WelcomePage.jsx";
import SignUpDetails from "./module/AccountModule/SignUpDetails.jsx";
import SigninPage from "./module/AccountModule/SigninPage.jsx";
import StartPage1 from "./module/IntroModule/StartPage1.jsx";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup-details" element={<SignUpDetails />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/startpage1" element={<StartPage1 />} />
      </Routes>
    </div>
  );
}

export default App;
