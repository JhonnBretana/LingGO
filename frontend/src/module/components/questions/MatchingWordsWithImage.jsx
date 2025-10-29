import React, { useState } from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function MatchingWordsWithImage({ question }) {
  const [selectedWord, setSelectedWord] = useState(null);
  const [matches, setMatches] = useState([]); // [{ word, image }]
  const [feedback, setFeedback] = useState("");

  // Get unmatched words and images
  const unmatchedWords = question.choices
    .map((c) => c.word)
    .filter((w) => !matches.find((m) => m.word === w));
  const unmatchedImages = question.choices
    .map((c) => c.image)
    .filter((img) => !matches.find((m) => m.image === img));

  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  const handleImageClick = (image) => {
    if (selectedWord) {
      setMatches([...matches, { word: selectedWord, image }]);
      setSelectedWord(null);
    }
  };

  const handleSubmit = () => {
    // Check if matches are correct
    const correct = question.correctAnswer.every((ans) =>
      matches.find((m) => m.word === ans.word && m.image === ans.image)
    );
    setFeedback(correct ? "Correct!" : "Try again.");
  };

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              Pindutin ang Magkapares
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          {/* Words column */}
          <div className="flex flex-col gap-5 items-center justify-center mt-4">
            {unmatchedWords.map((word) => (
              <button
                key={word}
                className={`w-40 h-20 flex items-center justify-center text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2 ${
                  selectedWord === word ? "border-yellow-400" : ""
                }`}
                onClick={() => handleWordClick(word)}
              >
                {word}
              </button>
            ))}
          </div>
          {/* Images column */}
          <div className="flex flex-col gap-5 items-center justify-center mt-4">
            {unmatchedImages.map((img) => (
              <button
                key={img}
                className="w-40 h-20 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2"
                onClick={() => handleImageClick(img)}
              >
                <img src={img} alt="choice" className="w-15 mx-auto" />
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
                {m.word} -{" "}
                <img src={m.image} alt={m.word} className="inline w-8 h-8" />
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

export default MatchingWordsWithImage;
