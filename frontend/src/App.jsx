import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./module/LandingPage.jsx";

// Account Module
import SignUpPage from "./module/AccountModule/SignUpPage.jsx";
import WelcomePage from "./module/AccountModule/WelcomePage.jsx";
import SignUpDetails from "./module/AccountModule/SignUpDetails.jsx";
import SigninPage from "./module/AccountModule/SigninPage.jsx";

// Intro Module
import StartPage1 from "./module/IntroModule/StartPage1.jsx";
import AgeDetail from "./module/IntroModule/AgeDetail.jsx";
import NameDetail from "./module/IntroModule/NameDetail.jsx";
import GradeSectionDetail from "./module/IntroModule/GradeSectionDetail.jsx";
import SelectLanguage from "./module/IntroModule/SelectLanguage.jsx";




function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/*account module*/}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup-details" element={<SignUpDetails />} />
        <Route path="/signin" element={<SigninPage />} />

        {/*intro module*/}
        <Route path="/startpage1" element={<StartPage1 />} />
        <Route path="/agedetail" element={<AgeDetail />} />
        <Route path="/namedetail" element={<NameDetail />} />
        <Route path="/gradesectiondetail" element={<GradeSectionDetail />} />
        <Route path="/selectlanguage" element={<SelectLanguage />} />
        
      </Routes>
    </div>
  );
}

export default App;
