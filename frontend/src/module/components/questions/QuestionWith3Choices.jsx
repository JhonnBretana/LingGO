import React, { useState } from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function QuestionWith3Choices({ question }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selected &&
      selected.trim().toLowerCase() ===
        (question.correctAnswer || "").trim().toLowerCase()
    ) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again.");
    }
  };

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-medium">{question?.question}</p>
          </div>
        </div>
        <form
          className="w-100 flex flex-col gap-5 items-center justify-center mt-4"
          onSubmit={handleSubmit}
        >
          {question.choices.map((choice, idx) => (
            <button
              key={idx}
              type="button"
              className={`w-60 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${
                selected === choice.value ? "border-yellow-400" : ""
              }`}
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
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-[#f2d919] border-2 border-black rounded-xl font-bold"
            disabled={!selected}
          >
            Submit
          </button>
        </form>
        {feedback && <div className="text-lg font-bold mt-2">{feedback}</div>}
      </div>
    </BackgroundLayout>
  );
}

export default QuestionWith3Choices;
