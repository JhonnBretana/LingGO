import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import GirlAtHouse from "/assets/ImageChoices/girlathouse.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

const Questionwith4ChoicesSituational = ({
  situation,
  instruction,
  instructionSub,
  characterName,
  question,
  choices = [],
  onCorrectAnswer,
  onWrongAnswer,
  answer,
  showWrongOverlay = true,
}) => {
  const [bank, setBank] = useState(choices);
  const [answerArea, setAnswerArea] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChoiceClick = (choice) => {
    if (submitted) return;

    if (bank.includes(choice)) {
      // Move from bank to answer area
      setBank((prev) => prev.filter((item) => item !== choice));
      setAnswerArea((prev) => [...prev, choice]);
    }
  };

  const handleAnswerClick = (choice) => {
    if (submitted) return;

    // Move from answer area back to bank
    setAnswerArea((prev) => prev.filter((item) => item !== choice));
    setBank((prev) => [...prev, choice]);
  };

  const handleSubmit = () => {
    const userAnswer = answerArea.join(" ");

    if (userAnswer === answer) {
      setShowCorrect(true);
      setSubmitted(true);
    } else {
      if (showWrongOverlay) {
        setShowWrong(true);
        setSubmitted(true);
      } else {
        // Review mode - don't show modal, just reset and call callback
        setAnswerArea([]);
        setBank(choices);
        setSubmitted(false);
        if (onWrongAnswer) {
          onWrongAnswer();
        }
      }
    }
  };

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setAnswerArea([]);
    setBank(choices);
    setSubmitted(false);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setAnswerArea([]);
    setBank(choices);
    setSubmitted(false);
    if (onWrongAnswer) {
      onWrongAnswer();
    }
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

      {/* Instruction Bubble */}
      <div className="flex flex-row items-center gap-2 w-full max-w-md">
        <div className="flex flex-col relative">
          <div className="absolute top-[65px] right-[40px] sm:top-[50px] z-10 w-[150px]">
            <span className="font-bold text-black text-base ">
              {instruction}
            </span>
            {instructionSub && (
              <div className="text-xs text-gray-500">{instructionSub}</div>
            )}
          </div>
          <img src={GirlAtHouse} alt="" className="h-[290px] sm:h-full" />
        </div>
      </div>

      {/* Character Name */}
      {characterName && (
        <div
          className="font-medium text-right text-xl text-white drop-shadow-[2px_3px_1px_black] w-full max-w-md px-10"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
        >
          {characterName}
        </div>
      )}

      {/* Main Question */}
      {question && (
        <div className="w-full max-w-[95%] sm:max-w-md lg:max-w-lg bg-white rounded-xl shadow-3xl px-3 sm:px-4 lg:px-6 py-4 lg:py-6 mt-2 border border-gray-300 flex flex-col items-center">
          <div
            className="font-medium text-center text-sm sm:text-base md:text-lg lg:text-xl text-black mb-4 sm:mb-6 px-2 break-words"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
          >
            {question}
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full items-center">
            {/* Answer Area */}
            <div className="flex flex-row gap-2 sm:gap-3 min-h-[44px] sm:min-h-[52px] lg:min-h-[56px] w-full justify-center items-center p-2 sm:p-3 lg:p-4 border-b-4 border-black flex-wrap">
              {answerArea.length === 0 ? (
                <span className="text-gray-400 italic text-xs sm:text-sm lg:text-base">
                  I-click ang mga salita
                </span>
              ) : (
                answerArea.map((choice, index) => (
                  <button
                    key={`${choice}-${index}`}
                    onClick={() => handleAnswerClick(choice)}
                    disabled={submitted}
                    className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-sm sm:text-base lg:text-lg rounded-lg bg-green-100 text-black font-bold border border-green-400 hover:bg-green-200 transition text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {choice}
                  </button>
                ))
              )}
            </div>

            {/* Choices Bank */}
            <div className="flex flex-row gap-2 sm:gap-3 flex-wrap min-h-[44px] sm:min-h-[52px] lg:min-h-[56px] w-full justify-center items-center p-2 sm:p-3 lg:p-4">
              {bank.map((choice, index) => (
                <button
                  key={`${choice}-${index}`}
                  onClick={() => handleChoiceClick(choice)}
                  disabled={submitted}
                  className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-sm sm:text-base lg:text-lg rounded-lg bg-blue-100 text-black font-bold border border-blue-400 hover:bg-blue-200 transition text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>

          <button
            className="mt-4 sm:mt-5 lg:mt-6 px-4 sm:px-5 lg:px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 text-sm sm:text-base"
            onClick={handleSubmit}
            disabled={answerArea.length === 0 || submitted}
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
        correctAnswer={answer}
      />
    </div>
  );
};

export default Questionwith4ChoicesSituational;
