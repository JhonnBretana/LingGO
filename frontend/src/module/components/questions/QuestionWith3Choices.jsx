import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function QuestionWith3Choices({ question }) {
  const [selected, setSelected] = useState(null);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;

    if (
      selected &&
      selected.trim().toLowerCase() ===
      (question.correctAnswer || "").trim().toLowerCase()
    ) {
      setShowCorrectModal(true);
    } else {
      setShowWrongModal(true);
    }
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
          className="w-full flex flex-col items-center justify-center mt-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row gap-5 items-center justify-center mb-4">
            {question.choices.map((choice, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-full max-w-60 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${selected === choice.value ? "border-yellow-400" : ""}`}
                onClick={() => setSelected(choice.value)}
              >
                <img
                  src={choice.image}
                  alt={choice.value}
                  className="w-25 mx-auto"
                />
                <p>{choice.value}</p>
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#f2d919] border-2 border-black rounded-xl font-bold"
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
        correctAnswer={question.correctAnswer}
        onClose={() => setShowWrongModal(false)}
      />
    </>
  );
}

export default QuestionWith3Choices;