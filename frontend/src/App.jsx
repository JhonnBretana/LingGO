import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./module/LandingPage.jsx";
import SigninPage from "./module/AccountModule/SigninPage.jsx";
import WelcomePage from "./module/AccountModule/WelcomePage.jsx";
import SigninDetails from "./module/AccountModule/SigninDetails.jsx";
import CebuanoKnowledge from "./module/AccountModule/Lawak.jsx";
import LanguagePreference from "./module/AccountModule/LanguagePreference.jsx";
import CebuanoMotivation from "./module/AccountModule/CebuanoMotivation.jsx";
import ReadyPage from "./module/AccountModule/ReadyPage.jsx";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signin-details" element={<SigninDetails />} />
        <Route path="/cebuano-knowledge" element={<CebuanoKnowledge />} />
        <Route path="/language-preference" element={<LanguagePreference />} />
        <Route path="/cebuano-motivation" element={<CebuanoMotivation />} />
        <Route path="/ready" element={<ReadyPage />} />
      </Routes>
    </div>
  );
}

export default App;