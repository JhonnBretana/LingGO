import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import EarIcon from "/assets/ImageChoices/ears.png";

import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";
import Convo from "/assets/ImageChoices/convofooter.png";

const SituationalMatchTheSound = ({
  situation,
  question,
  characterName,
  choices = [],
  sounds = [],
  correctMatches = {},
  onCorrectAnswer,
  onWrongAnswer,
}) => {
  const [selectedMatches, setSelectedMatches] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const handleWordClick = (wordIndex) => {
    setSelectedMatches((prev) => ({
      ...prev,
      [`word-${wordIndex}`]: true,
    }));
  };

  const handleEarClick = (earIndex) => {
    playSound(earIndex);
    setSelectedMatches((prev) => ({
      ...prev,
      [`ear-${earIndex}`]: true,
    }));
  };

  const handleSubmit = () => {
    let isCorrect = true;

    // Check if all matches are correct
    for (let soundIndex in correctMatches) {
      const wordSelected =
        selectedMatches[`word-${correctMatches[soundIndex]}`];
      const earSelected = selectedMatches[`ear-${soundIndex}`];

      if (!wordSelected || !earSelected) {
        isCorrect = false;
        break;
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
    setSelectedMatches({});
    setSubmitted(false);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setSubmitted(false);
    if (onWrongAnswer) {
      onWrongAnswer();
    }
  };

  const playSound = (soundIndex) => {
    const audio = new Audio(sounds[soundIndex]);
    audio.play();
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

          {/* Grid Layout 2x2 */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {choices.map((choice, choiceIndex) => (
              <React.Fragment key={choiceIndex}>
                {/* Word Button */}
                <button
                  onClick={() => handleWordClick(choiceIndex)}
                  className={`px-4 py-3 text-sm rounded-lg font-bold border-2 transition ${
                    selectedMatches[`word-${choiceIndex}`]
                      ? "bg-yellow-400 border-yellow-600 text-black"
                      : "bg-white border-gray-400 text-black hover:bg-gray-100"
                  }`}
                >
                  {choice}
                </button>

                {/* Ear Icon Button */}
                <button
                  onClick={() => handleEarClick(choiceIndex)}
                  className={`p-2 h-25 rounded-lg border-2 transition flex items-center justify-center ${
                    selectedMatches[`ear-${choiceIndex}`]
                      ? "bg-yellow-400 border-yellow-600"
                      : "bg-white border-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <img src={EarIcon} alt="Play sound" className="w-20 h-20" />
                </button>
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-row items-center gap-2 w-full max-w-md mt-10">
            <div className="flex flex-col relative items-center justify-center w-full">
              <img src={Convo} alt="Character" className="w-full h-auto" />
            </div>
          </div>

          <button
            className="my-6 px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
            onClick={handleSubmit}
            disabled={
              Object.keys(selectedMatches).length < choices.length * 2 ||
              submitted
            }
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
        correctAnswer="Match all sounds to words"
      />
    </div>
  );
};

export default SituationalMatchTheSound;
