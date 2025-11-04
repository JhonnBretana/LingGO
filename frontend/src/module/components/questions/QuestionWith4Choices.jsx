import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function QuestionWith4Choices({
  question,
  onCorrectAnswer,
  onWrongAnswer,
  showWrongOverlay = true,
}) {
  const [selected, setSelected] = useState(null);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [showTryAgainModal, setShowTryAgainModal] = useState(false);

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
      <div className="flex flex-col items-center justify-start h-screen overflow-hidden px-4 pt-4">
        <div className="relative w-full max-w-80 mb-3">
          <img
            src={QuestionsBar}
            alt="Questions Bar"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-medium">{question?.question}</p>
          </div>
        </div>
        <form
          className="w-full max-w-80 flex flex-col gap-3 justify-start items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-3 w-full">
            {leftChoices.map((choice, idx) => (
              <button
                key={idx}
                type="button"
                className={`flex-1 h-40 flex flex-col bg-white text-black text-lg font-bold p-3 rounded-lg border-2 overflow-hidden ${
                  selected === choice.value ? "border-4 border-yellow-400" : ""
                }`}
                onClick={() => setSelected(choice.value)}
              >
                <div className="flex-1 flex items-center justify-center w-full min-h-0">
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="w-full text-center pt-2 shrink-0">
                  {choice.value}
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-row gap-3 w-full">
            {rightChoices.map((choice, idx) => (
              <button
                key={idx + 2}
                type="button"
                className={`flex-1 h-40 flex flex-col bg-white text-black text-lg font-bold p-3 rounded-lg border-2 overflow-hidden ${
                  selected === choice.value ? "border-4 border-yellow-400" : ""
                }`}
                onClick={() => setSelected(choice.value)}
              >
                <div className="flex-1 flex items-center justify-center w-full min-h-0">
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="w-full text-center pt-2 shrink-0">
                  {choice.value}
                </div>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full max-w-40 mt-3 px-4 py-2 bg-[#f2d919] border-2 border-black rounded-xl font-bold"
            disabled={!selected}
          >
            Submit
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

export default QuestionWith4Choices;
