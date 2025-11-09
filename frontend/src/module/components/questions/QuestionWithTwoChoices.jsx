import React from "react";
import QuestionsBar from "../../../assets/clickbar.png";

const QuestionWithTwoChoices = ({
  situation,
  question,
  choices = [],
  onSelect,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 pt-2 mt-20 gap-10 overflow-y-hidden">
        {situation && (
          <div className="relative w-full max-w-80 mb-3">
            <img
              src={QuestionsBar}
              alt="Questions Bar"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-medium text-xl">{situation}</p>
            </div>
          </div>
        )}
        {question && (
          <div
            className="font-medium text-center text-3xl text-white drop-shadow-[2px_3px_1px_black] mb-4"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
          >
            {question}
          </div>
        )}
        <div className="flex flex-row gap-4 sm:gap-6">
          {choices.map((choice, idx) => (
            <button
              key={idx}
              className="w-35 h-25 sm:w-24 sm:h-24 rounded-4xl bg-white text-black text-5xl sm:text-4xl font-bold border-2 border-black shadow hover:bg-yellow-100 active:scale-95 transition-all duration-150 flex items-center justify-center"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
              onClick={() => onSelect && onSelect(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionWithTwoChoices;
