import React, { useState } from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function MatchingWordsWithWords({ question }) {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState([]); // [{ left, right }]
  const [feedback, setFeedback] = useState("");

  // Get unmatched left and right words
  const unmatchedLeft = question.choices
    .map((c) => c.word1)
    .filter((w) => !matches.find((m) => m.left === w));
  const unmatchedRight = question.choices
    .map((c) => c.word2)
    .filter((w) => !matches.find((m) => m.right === w));

  const handleLeftClick = (word) => {
    setSelectedLeft(word);
  };

  const handleRightClick = (word) => {
    if (selectedLeft) {
      setMatches([...matches, { left: selectedLeft, right: word }]);
      setSelectedLeft(null);
    }
  };

  const handleSubmit = () => {
    // Check if matches are correct
    const correctPairs = question.choices.map((c) => ({
      left: c.word1,
      right: c.word2,
    }));
    const isCorrect =
      matches.length === correctPairs.length &&
      correctPairs.every((pair) =>
        matches.find((m) => m.left === pair.left && m.right === pair.right)
      );
    setFeedback(isCorrect ? "Correct!" : "Try again.");
  };

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 my-5">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              {question?.question || "Pindutin ang Magkapares"}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-3 my-5">
          {/* Left words column */}
          <div className="flex flex-col gap-3 items-center justify-center mt-4">
            {unmatchedLeft.map((word) => (
              <button
                key={word}
                className={`w-35 h-15 flex items-center justify-center text-center bg-blue-400 text-black text-lg font-bold py-2 px-4 rounded-xl border-2 ${
                  selectedLeft === word ? "border-yellow-400" : ""
                }`}
                onClick={() => handleLeftClick(word)}
              >
                {word}
              </button>
            ))}
          </div>
          {/* Right words column */}
          <div className="flex flex-col gap-3 items-center justify-center mt-4">
            {unmatchedRight.map((word) => (
              <button
                key={word}
                className="w-35 h-15 text-center bg-yellow-300 text-black text-lg font-bold py-2 px-4 rounded-xl border-2"
                onClick={() => handleRightClick(word)}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
        {/* Show matches */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-black mb-2">Your Matches:</h3>
          <ul>
            {matches.map((m, idx) => (
              <li key={idx} className="text-black">
                {m.left} - {m.right}
              </li>
            ))}
          </ul>
        </div>
        {/* Submit button */}
        {matches.length === question.choices.length && (
          <button
            className="mt-5 px-4 py-2 bg-[#f2d919] border-3 border-black rounded-xl font-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        {feedback && <div className="text-lg font-bold mt-2">{feedback}</div>}
      </div>
    </BackgroundLayout>
  );
}

export default MatchingWordsWithWords;
