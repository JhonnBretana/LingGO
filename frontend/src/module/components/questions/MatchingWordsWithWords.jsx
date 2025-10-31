import React, { useState } from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function MatchingWordsWithWords({ question }) {
  const [matches, setMatches] = useState([]); // [{ left, right, color }]
  const [feedback, setFeedback] = useState("");

  // Custom color palette from the image
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
    // Check if word is already matched
    const existingMatch = matches.find((m) => m[side] === word);

    if (existingMatch) {
      // Cancel/remove this word from the match
      if (existingMatch.left && existingMatch.right) {
        // If both sides are matched, remove only this side
        const updatedMatches = matches.map((m) =>
          m === existingMatch ? { ...m, [side]: null } : m
        ).filter((m) => m.left || m.right); // Remove if both sides are null
        setMatches(updatedMatches);
      } else {
        // If only one side is matched, remove the entire match
        setMatches(matches.filter((m) => m !== existingMatch));
      }
      return;
    }

    // Find incomplete match (only has one side)
    const incompleteMatch = matches.find(
      (m) => (side === "left" && !m.left) || (side === "right" && !m.right)
    );

    if (incompleteMatch) {
      // Complete the match
      const updatedMatches = matches.map((m) =>
        m === incompleteMatch ? { ...m, [side]: word } : m
      );
      setMatches(updatedMatches);
    } else {
      // Start a new match with next available color
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
    // Check if all matches are complete and correct
    const allComplete = matches.every((m) => m.left && m.right);
    if (!allComplete) {
      setFeedback("Please complete all matches.");
      return;
    }

    const correctPairs = question.choices.map((c) => ({
      left: c.word1,
      right: c.word2,
    }));
    const isCorrect = correctPairs.every((pair) =>
      matches.find((m) => m.left === pair.left && m.right === pair.right)
    );
    setFeedback(isCorrect ? "Correct!" : "Try again.");
  };

  const handleReset = () => {
    setMatches([]);
    setFeedback("");
  };

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="relative w-full max-w-[280px] sm:max-w-xs my-3 sm:my-5">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <span className="text-base sm:text-xl font-semibold text-center">
              {question?.question || "Pindutin ang Magkapares"}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-3 sm:gap-5 my-3 sm:my-5">
          {/* Left words column */}
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
          {/* Right words column */}
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
        {/* Action buttons */}
        <div className="flex gap-3 mt-3 sm:mt-5">
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
        {feedback && (
          <div className="text-base sm:text-lg font-bold mt-3 text-white">
            {feedback}
          </div>
        )}
      </div>
    </BackgroundLayout>
  );
}

export default MatchingWordsWithWords;