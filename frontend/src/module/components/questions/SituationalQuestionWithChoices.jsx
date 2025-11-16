import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";
import GirlAtMarket from "/assets/ImageChoices/girlatmarket.png";

function SituationalQuestionWithChoices({
  question,
  onCorrectAnswer,
  onWrongAnswer,
  showWrongOverlay = true,
}) {
  const [selected, setSelected] = useState(null);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [showTryAgainModal, setShowTryAgainModal] = useState(false);

  const { situation, characterName } = question;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;

    const correctAnswer =
      typeof question.correctAnswer === "string"
        ? question.correctAnswer
        : question.correctAnswer?.value || question.correctAnswer?.image;

    if (selected && selected === correctAnswer) {
      setShowCorrectModal(true);
    } else {
      if (showWrongOverlay) {
        setShowWrongModal(true);
      } else {
        // In review mode, show Try Again modal and DO NOT exit
        setShowTryAgainModal(true);
      }
    }
  };

  const handleCloseCorrectModal = () => {
    setShowCorrectModal(false);
    setSelected(null);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrongModal(false);
    setSelected(null);
    if (onWrongAnswer) {
      onWrongAnswer();
    }
  };

  const normalizedChoices = question.choices.map((choice) =>
    typeof choice === "string" || !choice.value
      ? { value: choice.image || choice, image: choice.image || choice }
      : { value: choice.value, image: choice.image }
  );

  const leftChoices = normalizedChoices.slice(0, 2);
  const rightChoices = normalizedChoices.slice(2, 4);

  const getCorrectAnswerText = () => {
    if (typeof question.correctAnswer === "string") {
      return question.correctAnswer;
    }
    return (
      question.correctAnswer?.value ||
      question.correctAnswer?.image ||
      "See correct image above"
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen overflow-y-auto px-3 sm:px-4 pt-4 my-3 max-w-[375px] sm:max-w-md lg:max-w-lg mx-auto">
        <div className="relative w-full mb-3">
          <img
            src={QuestionsBar}
            alt="Questions Bar"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="font-medium text-center text-base sm:text-lg lg:text-xl text-black drop-shadow-[2px_2px_0px_white] w-full px-4 sm:px-8 lg:px-10 break-words"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: "bold",
              }}
            >
              {situation}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 w-full">
          <div className="flex flex-col relative w-full">
            <img
              src={GirlAtMarket}
              alt=""
              className="w-full h-auto object-contain max-h-[250px] sm:max-h-[300px] lg:max-h-[350px]"
            />
          </div>
        </div>

        <div
          className="font-medium text-right text-base sm:text-lg lg:text-xl text-white drop-shadow-[2px_3px_1px_black] w-full px-4 sm:px-6 mt-2"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
        >
          {characterName}
        </div>

        <div className="flex flex-col w-full mb-4">
          <div
            className="px-4 sm:px-5 py-4 sm:py-6 bg-white rounded-lg border border-black flex flex-col text-center justify-center"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: "bold",
            }}
          >
            <p className="text-sm sm:text-base text-blue-800">
              Magandang tanghali
            </p>
            <p className="font-medium text-sm sm:text-base break-words">
              {question?.question}
            </p>
          </div>
        </div>

        <form
          className="w-full flex flex-col gap-3 justify-start items-center"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
            {leftChoices.map((choice, idx) => (
              <button
                key={idx}
                type="button"
                className={`group relative h-36 sm:h-40 lg:h-44 flex flex-col bg-gradient-to-br from-white via-gray-50 to-white text-black font-bold rounded-xl sm:rounded-2xl border-2 sm:border-3 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  selected === choice.value
                    ? "border-yellow-400 shadow-2xl scale-105 bg-gradient-to-br from-yellow-50 to-white"
                    : "border-gray-300 shadow-lg hover:border-blue-400 hover:shadow-blue-200"
                }`}
                onClick={() => setSelected(choice.value)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>

                <div className="flex-1 flex items-center justify-center w-full min-h-0 p-1.5 sm:p-2 bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="max-w-full max-h-full object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all"
                  />
                </div>
                <div className="w-full text-center py-2 sm:py-3 text-xs sm:text-sm font-bold text-gray-800 bg-white group-hover:bg-blue-50 transition-colors duration-200 px-1 break-words">
                  {choice.value}
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
            {rightChoices.map((choice, idx) => (
              <button
                key={idx + 2}
                type="button"
                className={`group relative h-36 sm:h-40 lg:h-44 flex flex-col bg-gradient-to-br from-white via-gray-50 to-white text-black font-bold rounded-xl sm:rounded-2xl border-2 sm:border-3 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  selected === choice.value
                    ? "border-yellow-400 shadow-2xl scale-105 bg-gradient-to-br from-yellow-50 to-white"
                    : "border-gray-300 shadow-lg hover:border-blue-400 hover:shadow-blue-200"
                }`}
                onClick={() => setSelected(choice.value)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>

                <div className="flex-1 flex items-center justify-center w-full min-h-0 p-1.5 sm:p-2 bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="max-w-full max-h-full object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all"
                  />
                </div>
                <div className="w-full text-center py-2 sm:py-3 text-xs sm:text-sm font-bold text-gray-800 bg-white group-hover:bg-blue-50 transition-colors duration-200 px-1 break-words">
                  {choice.value}
                </div>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full max-w-36 sm:max-w-40 my-3 px-4 py-2 bg-[#f2d919] border-2 border-black rounded-xl font-bold text-sm sm:text-base disabled:opacity-50 hover:bg-[#e5cc15] transition-colors"
            disabled={!selected}
          >
            Ipasa
          </button>
        </form>
      </div>
      <CorrectAnswerModal
        isOpen={showCorrectModal}
        onClose={handleCloseCorrectModal}
      />

      {showWrongOverlay && (
        <WrongAnswerModal
          isOpen={showWrongModal}
          correctAnswer={getCorrectAnswerText()}
          onClose={handleCloseWrongModal}
        />
      )}
      <WrongAnswerModal
        isOpen={showTryAgainModal}
        onClose={() => setShowTryAgainModal(false)}
        isTryAgain={true}
      />
    </>
  );
}

export default SituationalQuestionWithChoices;
