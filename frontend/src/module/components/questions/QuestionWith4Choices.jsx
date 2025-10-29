import React, { useState } from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function QuestionWith4Choices({ question }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected && selected === question.correctAnswer.image) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again.");
    }
  };

  // Split choices into two columns of 2
  const leftChoices = question.choices.slice(0, 2);
  const rightChoices = question.choices.slice(2, 4);

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 mb-5">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-medium">{question?.question}</p>
          </div>
        </div>
        <form
          className="flex flex-col gap-3 justify-center items-center my-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-3">
            {leftChoices.map((choice, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-40 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${
                  selected === choice.image ? "border-yellow-400" : ""
                }`}
                onClick={() => setSelected(choice.image)}
              >
                <img
                  src={choice.image}
                  alt={choice.image}
                  className="w-25 mx-auto"
                />
              </button>
            ))}
          </div>
          <div className="flex flex-row gap-3">
            {rightChoices.map((choice, idx) => (
              <button
                key={idx + 2}
                type="button"
                className={`w-40 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${
                  selected === choice.image ? "border-yellow-400" : ""
                }`}
                onClick={() => setSelected(choice.image)}
              >
                <img
                  src={choice.image}
                  alt={choice.image}
                  className="w-25 mx-auto"
                />
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-40 mt-5 px-4 py-2 bg-[#f2d919] border-2 border-black rounded-xl font-bold"
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

export default QuestionWith4Choices;
