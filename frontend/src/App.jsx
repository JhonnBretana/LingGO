import React, { useEffect } from "react";
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
import QuestionWith4ChoiceswithVoice from "./module/components/questions/QuestionWith4ChoiceswithVoice.jsx";
import Select6Choices from "./module/components/questions/Select6Choices.jsx";
import QuestionWith4ChoicesnoImage from "./module/components/questions/QuestionWith4ChoicesnoImage.jsx";

import CorrectOverlay from "./module/components/CorrectOverlay.jsx";

//GamePlay Module
import Voice_SlowGame from "./module/GamePlayLvl1Module/Voice_SlowGame.jsx";
import Choice_Voice from "./module/GamePlayLvl1Module/Choice_Voice.jsx";
import Voice_Character from "./module/GamePlayLvl1Module/Voice_Character.jsx";

//Levels
import Level1 from "./module/Level1Questions.jsx";
import Level2 from "./module/Level2.Questions.jsx";

import Level3 from "./module/AccountModule/LevelThreeChapter.jsx";

import Level3Situation1 from "./module/Level3ChapterQuestion/Level3Situation1.jsx";
import Level3Situation2 from "./module/Level3ChapterQuestion/Level3Situation2.jsx";
import Level3Situation3 from "./module/Level3ChapterQuestion/Level3Situation3.jsx";
import Level3ResultPreview from "./module/components/Level3ResultPreview.jsx";

import LevelTwo from "./module/AccountModule/LevelTwo.jsx";
import LevelThree from "./module/AccountModule/LevelThree.jsx";

import Result from "./module/components/LevelResultPreview.jsx";

import Role from "./module/AccountModule/RoleSelection.jsx";

import Level1Finish from "./module/components/Level1Finish.jsx";
import Level1FinishChoice from "./module/components/Level1FinishChoice.jsx";
import Level1Return from "./module/components/Level1Return.jsx";

//bg music
import useBackgroundMusic from "./hooks/useBackgroundMusic.js";

function App() {
  const { playMusic, stopMusic } = useBackgroundMusic();

  useEffect(() => {
    // Handle visibility change (when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Page is visible again - only try to play if user has interacted
        const shouldPlay = localStorage.getItem("linggo_music_enabled");
        const audioObj = window._linggo_bg_audio;

        if (shouldPlay === "true" && audioObj && audioObj.hasUserInteracted) {
          playMusic();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [playMusic]);

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
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level-one" element={<LevelOne />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level-two" element={<LevelTwo />} />
        <Route path="/level3" element={<Level3 />} />
        <Route path="/level-three" element={<LevelThree />} />

        <Route path="/level3-situation1" element={<Level3Situation1 />} />
        <Route path="/level3-situation2" element={<Level3Situation2 />} />
        <Route path="/level3-situation3" element={<Level3Situation3 />} />

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
        <Route
          path="/question-with-4-choices-with-voice"
          element={<QuestionWith4ChoiceswithVoice />}
        />
        <Route path="/select-6-choices" element={<Select6Choices />} />
        <Route
          path="/question-with-4-choices-no-image"
          element={<QuestionWith4ChoicesnoImage />}
        />

        {/*gameplay module*/}
        <Route path="/voice_slowgame" element={<Voice_SlowGame />} />
        <Route path="/choice_voice" element={<Choice_Voice />} />
        <Route path="/voice_character" element={<Voice_Character />} />

        <Route path="/correct_overlay" element={<CorrectOverlay />} />

        {/*levels*/}

        <Route path="/result" element={<Result />} />

        <Route path="/role-selection" element={<Role />} />

        <Route path="/level1-finish" element={<Level1Finish />} />
        <Route path="/level1-finish-choice" element={<Level1FinishChoice />} />
        <Route path="/level1-return" element={<Level1Return />} />
        <Route
          path="/level3-result-preview"
          element={<Level3ResultPreview />}
        />
      </Routes>
    </div>
  );
}

export default App;
