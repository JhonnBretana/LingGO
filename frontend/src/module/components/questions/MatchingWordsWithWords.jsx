import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function MatchingWordsWithWords({ question, onCorrectAnswer }) {
  const [matches, setMatches] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const colors = [
    { bg: "bg-orange-400", border: "border-orange-600" },
    { bg: "bg-yellow-300", border: "border-yellow-500" },
    { bg: "bg-lime-300", border: "border-lime-500" },
    { bg: "bg-orange-300", border: "border-orange-500" },
    { bg: "bg-purple-500", border: "border-purple-700" },
    { bg: "bg-pink-400", border: "border-pink-600" },
  ];

  const getWordColor = (word, side) => {
    const match = matches.find((m) => m[side] === word);
    return match ? match.color : null;
  };

  const handleClick = (word, side) => {
    const existingMatch = matches.find((m) => m[side] === word);

    if (existingMatch) {
      if (existingMatch.left && existingMatch.right) {
        const updatedMatches = matches.map((m) =>
          m === existingMatch ? { ...m, [side]: null } : m
        ).filter((m) => m.left || m.right);
        setMatches(updatedMatches);
      } else {
        setMatches(matches.filter((m) => m !== existingMatch));
      }
      return;
    }

    const incompleteMatch = matches.find(
      (m) => (side === "left" && !m.left) || (side === "right" && !m.right)
    );

    if (incompleteMatch) {
      const updatedMatches = matches.map((m) =>
        m === incompleteMatch ? { ...m, [side]: word } : m
      );
      setMatches(updatedMatches);
    } else {
      const usedColors = matches.length;
      const nextColor = colors[usedColors % colors.length];
      setMatches([
        ...matches,
        {
          left: side === "left" ? word : null,
          right: side === "right" ? word : null,
          color: nextColor,
        },
      ]);
    }
  };

  const handleSubmit = () => {
    const allComplete = matches.every((m) => m.left && m.right);
    if (!allComplete) {
      return;
    }

    const correctPairs = question.choices.map((c) => ({
      left: c.word1,
      right: c.word2,
    }));
    const isCorrect = correctPairs.every((pair) =>
      matches.find((m) => m.left === pair.left && m.right === pair.right)
    );

    if (isCorrect) {
      setShowCorrect(true);
    } else {
      setShowWrong(true);
    }
  };

  const handleReset = () => {
    setMatches([]);
  };

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setMatches([]);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setMatches([]);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start px-4 pt-2 gap-4 overflow-hidden h-full">
        <div className="relative w-full max-w-[280px] sm:max-w-xs">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <span className="text-base sm:text-xl font-semibold text-center">
              {question?.question || "Pindutin ang Magkapares"}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-3 sm:gap-5">
          <div className="flex flex-col gap-3 items-center justify-center">
            {question.choices.map((choice) => {
              const color = getWordColor(choice.word1, "left");
              return (
                <button
                  key={choice.word1}
                  className={`w-32 sm:w-36 min-h-[50px] flex items-center justify-center text-center text-black text-sm sm:text-lg font-bold py-2 px-3 rounded-xl border-2 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 ${color
                    ? `${color.bg} ${color.border}`
                    : "bg-white border-gray-300"
                    }`}
                  onClick={() => handleClick(choice.word1, "left")}
                >
                  {choice.word1}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 items-center justify-center">
            {question.choices.map((choice) => {
              const color = getWordColor(choice.word2, "right");
              return (
                <button
                  key={choice.word2}
                  className={`w-32 sm:w-36 min-h-[50px] text-center text-black text-sm sm:text-lg font-bold py-2 px-3 rounded-xl border-2 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 ${color
                    ? `${color.bg} ${color.border}`
                    : "bg-white border-gray-300"
                    }`}
                  onClick={() => handleClick(choice.word2, "right")}
                >
                  {choice.word2}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="px-6 py-2 bg-gray-400 border-2 border-gray-600 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 text-black"
            onClick={handleReset}
          >
            Reset
          </button>
          {matches.length === question.choices.length &&
            matches.every((m) => m.left && m.right) && (
              <button
                className="px-6 py-2 bg-[#f2d919] border-2 border-black rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 text-black"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
        </div>
      </div>

      <CorrectAnswerModal isOpen={showCorrect} onClose={handleCloseCorrectModal} />
      <WrongAnswerModal isOpen={showWrong} onClose={handleCloseWrongModal} correctAnswer={null} />
    </>
  );
}

export default MatchingWordsWithWords;