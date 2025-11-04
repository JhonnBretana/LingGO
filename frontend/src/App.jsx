import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultPage from "./module/DefaultPage.jsx";
import LandingPage from "./module/AccountModule/LandingPage.jsx";

// Account Module
// import SignUpPage from "./module/AccountModule/SignUpPage.jsx";
import WelcomePage from "./module/AccountModule/WelcomePage.jsx";

import SigninDetails from "./module/AccountModule/SigninPage.jsx";
import CebuanoKnowledge from "./module/AccountModule/CebuanoKnowledge.jsx";
import LanguagePreference from "./module/AccountModule/LanguagePreference.jsx";
import CebuanoMotivation from "./module/AccountModule/CebuanoMotivation.jsx";
import ReadyPage from "./module/AccountModule/ReadyPage.jsx";
import PageHeaderLayout from "./module/components/PageHeaderLayout.jsx";

import SignUpDetails from "./module/AccountModule/SignUpDetails.jsx";
import SigninPage from "./module/AccountModule/SigninPage.jsx";

import ChooseLevel from "./module/AccountModule/ChooseLevel.jsx";
import LevelOne from "./module/AccountModule/LevelOne.jsx";

// Intro Module
import StartPage1 from "./module/IntroModule/StartPage1.jsx";
import AgeDetail from "./module/IntroModule/AgeDetail.jsx";
import NameDetail from "./module/IntroModule/NameDetail.jsx";
import GradeSectionDetail from "./module/IntroModule/GradeSectionDetail.jsx";
import SelectLanguage from "./module/IntroModule/SelectLanguage.jsx";

// Questions
import DragAndDrop4ChoicesWithVoice from "./module/components/questions/DragAndDrop4ChoicesWithVoice.jsx";
import SpeechMicWithVoice from "./module/components/questions/SpeechMicWithVoice.jsx";
import Select6ChoicesWithVoiceAndSlow from "./module/components/questions/Select6ChoicesWithVoiceAndSlow.jsx";
import MatchingWordsWithWords from "./module/components/questions/MatchingWordsWithWords.jsx";
import MatchingWordsWithImage from "./module/components/questions/MatchingWordsWithImage.jsx";
import QuestionWith3Choices from "./module/components/questions/QuestionWith3Choices.jsx";
import QuestionWith4Choices from "./module/components/questions/QuestionWith4Choices.jsx";
import TypeWithVoiceAndSlow from "./module/components/questions/TypeWithVoiceAndSlow.jsx";
import SixChoicesWithVoice from "./module/components/questions/SixChoicesWithVoice.jsx";
import FourChoicesWithCharacterAndVoice from "./module/components/questions/FourChoicesWithCharacterAndVoice.jsx";

import CorrectOverlay from "./module/components/CorrectOverlay.jsx";

//GamePlay Module
import Voice_SlowGame from "./module/GamePlayLvl1Module/Voice_SlowGame.jsx";
import Choice_Voice from "./module/GamePlayLvl1Module/Choice_Voice.jsx";
import Voice_Character from "./module/GamePlayLvl1Module/Voice_Character.jsx";

//Levels
import Level1 from "./module/Level1Questions.jsx";

import Result from "./module/components/LevelResultPreview.jsx";

import Role from "./module/AccountModule/RoleSelection.jsx";

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
        <Route path="/choose-level" element={<ChooseLevel />} />
        <Route path="/level-one" element={<LevelOne />} />

        {/*intro module*/}
        <Route path="/startpage1" element={<StartPage1 />} />
        <Route path="/agedetail" element={<AgeDetail />} />
        <Route path="/namedetail" element={<NameDetail />} />
        <Route path="/gradesectiondetail" element={<GradeSectionDetail />} />
        <Route path="/selectlanguage" element={<SelectLanguage />} />
        <Route path="/pageHeaderLayout" element={<PageHeaderLayout />} />

        {/*questions*/}
        <Route
          path="/drag-and-drop-4-choices-with-voice"
          element={<DragAndDrop4ChoicesWithVoice />}
        />
        <Route path="/speech-mic-with-voice" element={<SpeechMicWithVoice />} />
        <Route
          path="/select-6-choices-with-voice-and-slow"
          element={<Select6ChoicesWithVoiceAndSlow />}
        />
        <Route
          path="/matching-words-with-words"
          element={<MatchingWordsWithWords />}
        />
        <Route
          path="/matching-words-with-image"
          element={<MatchingWordsWithImage />}
        />
        <Route
          path="/question-with-3-choices"
          element={<QuestionWith3Choices />}
        />
        <Route
          path="/question-with-4-choices"
          element={<QuestionWith4Choices />}
        />
        <Route
          path="/type-with-voice-and-slow"
          element={<TypeWithVoiceAndSlow />}
        />
        <Route
          path="/six-choices-with-voice"
          element={<SixChoicesWithVoice />}
        />
        <Route
          path="/four-choices-with-character-and-voice"
          element={<FourChoicesWithCharacterAndVoice />}
        />

        {/*gameplay module*/}
        <Route path="/voice_slowgame" element={<Voice_SlowGame />} />
        <Route path="/choice_voice" element={<Choice_Voice />} />
        <Route path="/voice_character" element={<Voice_Character />} />

        <Route path="/correct_overlay" element={<CorrectOverlay />} />

        {/*levels*/}
        <Route path="/level1" element={<Level1 />} />

        <Route path="/result" element={<Result />} />

        <Route path="/role-selection" element={<Role />} />
      </Routes>
    </div>
  );
}

export default App;
