import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import BombLife from "../../../assets/Bomb.png";
import BombWrong from "../../../assets/Bomb.gif";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function MatchingWordsWithWords({ question, onCorrectAnswer, onWrongAnswer }) {
  const [matches, setMatches] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [lives, setLives] = useState(3);
  const [showBombModal, setShowBombModal] = useState(false);

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

  const checkPairCorrectness = (left, right) => {
    const correctPair = question.correctAnswer.find(
      (c) => c.word1 === left && c.word2 === right
    );
    return !!correctPair;
  };

  const handleClick = (word, side) => {
    const existingMatch = matches.find((m) => m[side] === word);

    if (existingMatch) {
      if (existingMatch.left && existingMatch.right) {
        const updatedMatches = matches
          .map((m) => (m === existingMatch ? { ...m, [side]: null } : m))
          .filter((m) => m.left || m.right);
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
      const updatedMatch = { ...incompleteMatch, [side]: word };

      // Check if pair is now complete
      if (updatedMatch.left && updatedMatch.right) {
        const isCorrectPair = checkPairCorrectness(
          updatedMatch.left,
          updatedMatch.right
        );

        if (isCorrectPair) {
          // Correct pair - keep the color
          const updatedMatches = matches.map((m) =>
            m === incompleteMatch ? updatedMatch : m
          );
          setMatches(updatedMatches);

          // Check if all pairs are matched correctly
          const allMatched = updatedMatches.length === question.choices.length;
          if (allMatched) {
            setTimeout(() => {
              setShowCorrect(true);
            }, 500);
          }
        } else {
          // Wrong pair - show bomb modal and reduce life
          setShowBombModal(true);
          const newLives = lives - 1;
          setLives(newLives);

          // Keep the wrong match so user can try again
          const updatedMatches = matches.map((m) =>
            m === incompleteMatch ? updatedMatch : m
          );
          setMatches(updatedMatches);
        }
      } else {
        // Just update the incomplete match
        const updatedMatches = matches.map((m) =>
          m === incompleteMatch ? updatedMatch : m
        );
        setMatches(updatedMatches);
      }
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

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setMatches([]);
    setLives(3);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setMatches([]);
    setLives(3);
    if (onWrongAnswer) {
      onWrongAnswer();
    }
  };

  const handleCloseBombModal = () => {
    setShowBombModal(false);
    // If no lives left, show wrong answer modal
    if (lives === 0) {
      setShowWrong(true);
    } else {
      // Keep only correct pairs, remove wrong/incomplete matches
      const validMatches = matches.filter((m) => {
        if (m.left && m.right) {
          return checkPairCorrectness(m.left, m.right);
        }
        return false;
      });
      setMatches(validMatches);
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

        {/* Lives Display */}
        <div className="flex gap-2 items-center">
          {[1, 2, 3].map((lifeNum) => (
            <img
              key={lifeNum}
              src={BombLife}
              alt={`Life ${lifeNum}`}
              className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 ${lifeNum > lives ? "opacity-30 grayscale" : ""
                }`}
            />
          ))}
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
      </div>

      {/* Bomb Modal - Semi-transparent background to see through */}
      {showBombModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <img src={BombWrong} alt="Bomb Explosion" className="w-32 h-32" />
            <p className="text-2xl font-bold text-red-600">Mali ang Tugma!</p>
            <p className="text-lg text-gray-700">
              Natitira pang Buhay: {lives}
            </p>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all"
              onClick={handleCloseBombModal}
            >
              {lives === 0 ? "Tingnan ang Sagot" : "Subukan Muli"}
            </button>
          </div>
        </div>
      )}

      <CorrectAnswerModal
        isOpen={showCorrect}
        onClose={handleCloseCorrectModal}
      />
      <WrongAnswerModal
        isOpen={showWrong}
        onClose={handleCloseWrongModal}
        correctAnswer={question.correctAnswer}
      />
    </>
  );
}

export default MatchingWordsWithWords;
