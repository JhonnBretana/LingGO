import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function QuestionWith4Choices({ question }) {
  const [selected, setSelected] = useState(null);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;

    const correctAnswer = typeof question.correctAnswer === "string"
      ? question.correctAnswer
      : question.correctAnswer?.value || question.correctAnswer?.image;

    if (selected && selected === correctAnswer) {
      setShowCorrectModal(true);
    } else {
      setShowWrongModal(true);
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
    return question.correctAnswer?.value || question.correctAnswer?.image || "See correct image above";
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-full max-w-80 mb-5">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full h-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-medium">{question?.question}</p>
          </div>
        </div>
        <form
          className="w-full max-w-80 flex flex-col gap-3 justify-center items-center my-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-3 w-full">
            {leftChoices.map((choice, idx) => (
              <button
                key={idx}
                type="button"
                className={`flex-1 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${selected === choice.value ? "border-yellow-400 ring-2 ring-yellow-300" : ""
                  }`}
                onClick={() => setSelected(choice.value)}
              >
                <img
                  src={choice.image}
                  alt={choice.value}
                  className="w-full max-w-25 mx-auto"
                />
                <p>{choice.value}</p>
              </button>
            ))}
          </div>
          <div className="flex flex-row gap-3 w-full">
            {rightChoices.map((choice, idx) => (
              <button
                key={idx + 2}
                type="button"
                className={`flex-1 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${selected === choice.value ? "border-yellow-400 ring-2 ring-yellow-300" : ""
                  }`}
                onClick={() => setSelected(choice.value)}
              >
                <img
                  src={choice.image}
                  alt={choice.value}
                  className="w-full max-w-25 mx-auto"
                />
                <p>{choice.value}</p>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full max-w-40 mt-5 px-4 py-2 bg-[#f2d919] border-2 border-black rounded-xl font-bold"
            disabled={!selected}
          >
            Submit
          </button>
        </form>
      </div>

      <CorrectAnswerModal
        isOpen={showCorrectModal}
        onClose={() => setShowCorrectModal(false)}
      />

      <WrongAnswerModal
        isOpen={showWrongModal}
        correctAnswer={getCorrectAnswerText()}
        onClose={() => setShowWrongModal(false)}
      />
    </>
  );
}

export default QuestionWith4Choices;