import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultPage from "./module/DefaultPage.jsx";
import LandingPage from "./module/AccountModule/LandingPage.jsx";

// Account Module
// import SignUpPage from "./module/AccountModule/SignUpPage.jsx";
import WelcomePage from "./module/AccountModule/WelcomePage.jsx";

import SigninDetails from "./module/AccountModule/SigninPage.jsx";
import CebuanoKnowledge from "./module/AccountModule/Lawak.jsx";
import LanguagePreference from "./module/AccountModule/LanguagePreference.jsx";
import CebuanoMotivation from "./module/AccountModule/CebuanoMotivation.jsx";
import ReadyPage from "./module/AccountModule/ReadyPage.jsx";

import SignUpDetails from "./module/AccountModule/SignUpDetails.jsx";
import SigninPage from "./module/AccountModule/SigninPage.jsx";

// Intro Module
import StartPage1 from "./module/IntroModule/StartPage1.jsx";
import AgeDetail from "./module/IntroModule/AgeDetail.jsx";
import NameDetail from "./module/IntroModule/NameDetail.jsx";
import GradeSectionDetail from "./module/IntroModule/GradeSectionDetail.jsx";
import SelectLanguage from "./module/IntroModule/SelectLanguage.jsx";

//GamePlay Module
import Voice_SlowGame from "./module/GamePlayLvl1Module/Voice_SlowGame.jsx";
import Choice_Voice from "./module/GamePlayLvl1Module/Choice_Voice.jsx";
import Voice_Character from "./module/GamePlayLvl1Module/Voice_Character.jsx";




function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/welcome" element={<WelcomePage />} />

        <Route path="/signin-details" element={<SigninDetails />} />
        <Route path="/cebuano-knowledge" element={<CebuanoKnowledge />} />
        <Route path="/language-preference" element={<LanguagePreference />} />
        <Route path="/cebuano-motivation" element={<CebuanoMotivation />} />
        <Route path="/ready" element={<ReadyPage />} />

        <Route path="/signup-details" element={<SignUpDetails />} />
        <Route path="/signin" element={<SigninPage />} />

        {/*intro module*/}
        <Route path="/startpage1" element={<StartPage1 />} />
        <Route path="/agedetail" element={<AgeDetail />} />
        <Route path="/namedetail" element={<NameDetail />} />
        <Route path="/gradesectiondetail" element={<GradeSectionDetail />} />
        <Route path="/selectlanguage" element={<SelectLanguage />} />

        {/*gameplay module*/}
        <Route path="/voice_slowgame" element={<Voice_SlowGame />} />
        <Route path="/choice_voice" element={<Choice_Voice />} />
        <Route path="/voice_character" element={<Voice_Character />} />

        
      </Routes>
    </div>
  );
}

export default App;
