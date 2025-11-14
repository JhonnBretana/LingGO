import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import EarIcon from "/assets/ImageChoices/ears.png";

import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";
import Convo from "/assets/ImageChoices/convofooter.png";

const COLORS = [
  { bg: "bg-red-400", border: "border-red-600", hover: "hover:bg-red-300" },
  { bg: "bg-blue-400", border: "border-blue-600", hover: "hover:bg-blue-300" },
  { bg: "bg-green-400", border: "border-green-600", hover: "hover:bg-green-300" },
  { bg: "bg-purple-400", border: "border-purple-600", hover: "hover:bg-purple-300" },
  { bg: "bg-orange-400", border: "border-orange-600", hover: "hover:bg-orange-300" },
];

const SituationalMatchTheSound = ({
  situation,
  question,
  characterName,
  choices = [],
  sounds = [],
  correctMatches = {},
  onCorrectAnswer,
  onWrongAnswer,
  showWrongOverlay = true, // If false (review mode), show try again instead
}) => {
  const [matches, setMatches] = useState({}); // { wordIndex: soundIndex }
  const [pendingWord, setPendingWord] = useState(null); // Currently selected word waiting for sound
  const [pendingSound, setPendingSound] = useState(null); // Currently selected sound waiting for word
  const [submitted, setSubmitted] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const handleWordClick = (wordIndex) => {
    if (submitted) return;

    // If this word is already matched, remove the match
    if (matches[wordIndex] !== undefined) {
      const newMatches = { ...matches };
      delete newMatches[wordIndex];
      setMatches(newMatches);
      return;
    }

    // If this word is already pending, cancel it
    if (pendingWord === wordIndex) {
      setPendingWord(null);
      return;
    }

    // If there's a pending sound, create a match
    if (pendingSound !== null) {
      setMatches({ ...matches, [wordIndex]: pendingSound });
      setPendingSound(null);
      setPendingWord(null);
    } else {
      // Set this word as pending
      setPendingWord(wordIndex);
      setPendingSound(null);
    }
  };

  const handleEarClick = (soundIndex) => {
  if (submitted) return;

  // Play the sound
  playSound(soundIndex);

  // Check if this sound is already matched
  const matchedWordIndex = Object.keys(matches).find(
    (key) => matches[key] === soundIndex
  );

  if (matchedWordIndex !== undefined) {
    // Remove the match but keep the word as pending
    const newMatches = { ...matches };
    delete newMatches[matchedWordIndex];
    setMatches(newMatches);
    setPendingWord(parseInt(matchedWordIndex)); // Keep word selected
    setPendingSound(null);
    return;
  }

  // If this sound is already pending, cancel it
  if (pendingSound === soundIndex) {
    setPendingSound(null);
    return;
  }

  // If there's a pending word, create a match
  if (pendingWord !== null) {
    setMatches({ ...matches, [pendingWord]: soundIndex });
    setPendingWord(null);
    setPendingSound(null);
  } else {
    // Set this sound as pending
    setPendingSound(soundIndex);
    setPendingWord(null);
  }
};

  const handleSubmit = () => {
    // Check if all matches are correct
    let isCorrect = true;

    // Must have correct number of matches
    if (Object.keys(matches).length !== choices.length) {
      isCorrect = false;
    } else {
      // Check each match
      for (let wordIndex in matches) {
        const soundIndex = matches[wordIndex];
        
        // Find which sound should match this word
        let correctSoundIndex = null;
        for (let sIdx in correctMatches) {
          if (correctMatches[sIdx] === parseInt(wordIndex)) {
            correctSoundIndex = parseInt(sIdx);
            break;
          }
        }

        if (soundIndex !== correctSoundIndex) {
          isCorrect = false;
          break;
        }
      }
    }

    if (isCorrect) {
      setShowCorrect(true);
    } else {
      setShowWrong(true);
    }
    setSubmitted(true);
  };

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setMatches({});
    setPendingWord(null);
    setPendingSound(null);
    setSubmitted(false);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setSubmitted(false);
    
    // In review mode (showWrongOverlay = false), reset and try again
    if (!showWrongOverlay) {
      setMatches({});
      setPendingWord(null);
      setPendingSound(null);
    } else {
      // In normal mode, call onWrongAnswer to close question
      setMatches({});
      setPendingWord(null);
      setPendingSound(null);
      if (onWrongAnswer) {
        onWrongAnswer();
      }
    }
  };

  const playSound = (soundIndex) => {
    const audio = new Audio(sounds[soundIndex]);
    audio.play();
  };

  // Get color for matched pair or pending selection
  const getWordColor = (wordIndex) => {
    if (matches[wordIndex] !== undefined) {
      // Get match number (0, 1, 2...)
      const matchNumber = Object.keys(matches)
        .sort()
        .indexOf(wordIndex.toString());
      return COLORS[matchNumber % COLORS.length];
    }
    if (pendingWord === wordIndex) {
      return { bg: "bg-yellow-400", border: "border-yellow-600", hover: "hover:bg-yellow-300" };
    }
    return { bg: "bg-white", border: "border-gray-400", hover: "hover:bg-gray-100" };
  };

  const getSoundColor = (soundIndex) => {
    // Check if this sound is matched
    const matchedWordIndex = Object.keys(matches).find(
      (key) => matches[key] === soundIndex
    );

    if (matchedWordIndex !== undefined) {
      // Get match number
      const matchNumber = Object.keys(matches)
        .sort()
        .indexOf(matchedWordIndex);
      return COLORS[matchNumber % COLORS.length];
    }
    if (pendingSound === soundIndex) {
      return { bg: "bg-yellow-400", border: "border-yellow-600", hover: "hover:bg-yellow-300" };
    }
    return { bg: "bg-white", border: "border-gray-400", hover: "hover:bg-gray-100" };
  };

  return (
    <div className="flex flex-col items-center w-full px-2 pt-4 gap-3">
      {/* Situation Bar */}
      {situation && (
        <div className="relative w-full max-w-80 mb-3">
          <img
            src={QuestionsBar}
            alt="Questions Bar"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="font-medium text-center text-xl text-black drop-shadow-[2px_2px_0px_white] w-full max-w-md px-10"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: "bold",
              }}
            >
              {situation}
            </p>
          </div>
        </div>
      )}

      {/* Main Question */}
      {question && (
        <div className="flex flex-col items-center my-3">
          {characterName && (
            <div
              className="font-medium text-right text-xl text-white drop-shadow-[2px_3px_1px_black] w-full max-w-md px-6"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: "bold",
              }}
            >
              {characterName}
            </div>
          )}
          <div
            className="flex flex-col font-medium bg-white w-100 rounded-lg text-center text-lg text-black mb-6 px-6 py-5 border border-gray-300"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
          >
            <span className="text-blue-700">Magandang Gabi, Pinsan!</span>
            <div className="mt-2">{question}</div>
          </div>

          {/* Instruction Text */}
          <p className="text-white text-sm text-center mb-4 px-4 font-bold">
            I-click ang salita at tunog para ipares. Magkakapareho ng kulay ang mga tama!
          </p>

          {/* Grid Layout 2x2 */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {choices.map((choice, choiceIndex) => {
              const wordColor = getWordColor(choiceIndex);
              const soundColor = getSoundColor(choiceIndex);
              
              return (
                <React.Fragment key={choiceIndex}>
                  {/* Word Button */}
                  <button
                    onClick={() => handleWordClick(choiceIndex)}
                    className={`px-4 py-3 text-sm rounded-lg font-bold border-2 transition ${wordColor.bg} ${wordColor.border} ${wordColor.hover} text-black`}
                    disabled={submitted}
                  >
                    {choice}
                  </button>

                  {/* Ear Icon Button */}
                  <button
                    onClick={() => handleEarClick(choiceIndex)}
                    className={`p-2 h-25 rounded-lg border-2 transition flex items-center justify-center ${soundColor.bg} ${soundColor.border} ${soundColor.hover}`}
                    disabled={submitted}
                  >
                    <img src={EarIcon} alt="Play sound" className="w-20 h-20" />
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex flex-row items-center gap-2 w-full max-w-md mt-10">
            <div className="flex flex-col relative items-center justify-center w-full">
              <img src={Convo} alt="Character" className="w-full h-auto" />
            </div>
          </div>

          <button
            className="my-6 px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
            onClick={handleSubmit}
            disabled={Object.keys(matches).length !== choices.length || submitted}
          >
            Submit
          </button>
        </div>
      )}

      {/* Modals */}
      <CorrectAnswerModal
        isOpen={showCorrect}
        onClose={handleCloseCorrectModal}
      />
      <WrongAnswerModal
  isOpen={showWrong}
  onClose={handleCloseWrongModal}
  correctAnswer={showWrongOverlay ? "I-tugma ang salita sa tunog na narinig." : null}
  isTryAgain={!showWrongOverlay}
/>
    </div>
  );
};

export default SituationalMatchTheSound;