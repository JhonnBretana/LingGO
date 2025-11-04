import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function MatchingWordsWithImage({
  question,
  onCorrectAnswer,
  onWrongAnswer,
  showWrongOverlay = true,
}) {
  const [selectedWord, setSelectedWord] = useState(null);
  const [matches, setMatches] = useState([]);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

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
    const correct = question.correctAnswer.every((ans) =>
      matches.find((m) => m.word === ans.word && m.image === ans.image)
    );

    if (correct) {
      setShowCorrectModal(true);
    } else {
      if (showWrongOverlay) {
        setShowWrongModal(true);
      } else {
        setMatches([]);
        setSelectedWord(null);
        if (onWrongAnswer) onWrongAnswer();
      }
    }
  };

  const handleReset = () => {
    setMatches([]);
    setSelectedWord(null);
    setShowCorrectModal(false);
    setShowWrongModal(false);
  };

  const getCorrectAnswerText = () => {
    return question.correctAnswer.map((ans) => ans.word).join(", ");
  };

  return (
    <>
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
        <div className="flex gap-3 mt-5">
          {matches.length > 0 && (
            <button
              className="px-6 py-2 bg-gray-400 border-2 border-gray-600 rounded-xl font-bold"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
          {matches.length === question.choices.length && (
            <button
              className="px-4 py-2 bg-[#f2d919] border-3 border-black rounded-xl font-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      <CorrectAnswerModal
        isOpen={showCorrectModal}
        onClose={() => {
          setShowCorrectModal(false);
          if (onCorrectAnswer) onCorrectAnswer();
        }}
      />
      {showWrongOverlay && (
        <WrongAnswerModal
          isOpen={showWrongModal}
          correctAnswer={getCorrectAnswerText()}
          onClose={() => {
            setShowWrongModal(false);
            if (onWrongAnswer) onWrongAnswer();
          }}
        />
      )}
    </>
  );
}

export default MatchingWordsWithImage;
