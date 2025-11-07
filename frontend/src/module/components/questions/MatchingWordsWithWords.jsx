import React, { useState, useEffect, useRef } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import BombLife from "../../../assets/Bomb.png";
import BombWrong from "../../../assets/Bomb.mp4";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function MatchingWordsWithWords({
  question,
  onCorrectAnswer,
  onWrongAnswer,
  showWrongOverlay = true,
}) {
  const [matches, setMatches] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [lives, setLives] = useState(3);
  const [showBombModal, setShowBombModal] = useState(false);
  const [showTryAgainModal, setShowTryAgainModal] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  const videoRef = useRef(null);

  const colors = [
    { bg: "bg-orange-400", border: "border-orange-600" },
    { bg: "bg-yellow-300", border: "border-yellow-500" },
    { bg: "bg-lime-300", border: "border-lime-500" },
    { bg: "bg-orange-300", border: "border-orange-500" },
    { bg: "bg-purple-500", border: "border-purple-700" },
    { bg: "bg-pink-400", border: "border-pink-600" },
  ];

  useEffect(() => {
    if (showBombModal && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => {
        console.log("Video play failed:", err);
      });
    }
  }, [showBombModal]);

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
      if (pendingSelection && pendingSelection.match === existingMatch) {
        setMatches(matches.filter((m) => m !== existingMatch));
        setPendingSelection(null);
        return;
      }

      if (existingMatch.left && existingMatch.right) {
        const isCorrect = checkPairCorrectness(existingMatch.left, existingMatch.right);
        
        if (isCorrect) {
          return;
        }
        
        const updatedMatches = matches
          .map((m) => (m === existingMatch ? { ...m, [side]: null } : m))
          .filter((m) => m.left || m.right);
        setMatches(updatedMatches);
        setPendingSelection(null);
        return;
      }

      setMatches(matches.filter((m) => m !== existingMatch));
      setPendingSelection(null);
      return;
    }

    if (pendingSelection) {
      if (pendingSelection.side === side) {
        return;
      }

      const updatedMatch = { 
        ...pendingSelection.match, 
        [side]: word 
      };

      const isCorrectPair = checkPairCorrectness(
        updatedMatch.left,
        updatedMatch.right
      );

      if (isCorrectPair) {
        const updatedMatches = matches.map((m) =>
          m === pendingSelection.match ? updatedMatch : m
        );
        setMatches(updatedMatches);
        setPendingSelection(null);

        const allMatched = updatedMatches.length === question.choices.length;
        if (allMatched) {
          setTimeout(() => {
            setShowCorrect(true);
          }, 500);
        }
      } else {
        setShowBombModal(true);
        const newLives = lives - 1;
        setLives(newLives);

        const updatedMatches = matches.map((m) =>
          m === pendingSelection.match ? updatedMatch : m
        );
        setMatches(updatedMatches);
        setPendingSelection(null);
      }
    } else {
      const usedColors = matches.length;
      const nextColor = colors[usedColors % colors.length];
      const newMatch = {
        left: side === "left" ? word : null,
        right: side === "right" ? word : null,
        color: nextColor,
      };
      setMatches([...matches, newMatch]);
      setPendingSelection({ match: newMatch, side });
    }
  };

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setMatches([]);
    setLives(3);
    setPendingSelection(null);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setMatches([]);
    setLives(3);
    setPendingSelection(null);
    if (onWrongAnswer) {
      onWrongAnswer();
    }
  };

  const handleCloseBombModal = () => {
    setShowBombModal(false);
    if (lives === 0) {
      if (showWrongOverlay) {
        setShowWrong(true);
      } else {
        setShowTryAgainModal(true);
        setMatches([]);
        setLives(3);
        setPendingSelection(null);
      }
    } else {
      const validMatches = matches.filter((m) => {
        if (m.left && m.right) {
          return checkPairCorrectness(m.left, m.right);
        }
        return false;
      });
      setMatches(validMatches);
      setPendingSelection(null);
    }
  };

  return (
    <>
      {/* CHANGED: Added overflow-y-auto, max-h-screen, and pb-6 for scrolling */}
      <div className="flex flex-col items-center justify-start px-4 pt-2 gap-4 h-full max-h-screen overflow-y-auto pb-6">
        {/* ADDED: flex-shrink-0 to prevent header from shrinking */}
        <div className="relative w-full max-w-[280px] sm:max-w-xs flex-shrink-0">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <span className="text-base sm:text-xl font-semibold text-center">
              {question?.question || "Pindutin ang magkapares."}
            </span>
          </div>
        </div>

        {/* ADDED: flex-shrink-0 to lives display */}
        <div className="flex gap-2 items-center flex-shrink-0">
          {[1, 2, 3].map((lifeNum) => (
            <img
              key={lifeNum}
              src={BombLife}
              alt={`Life ${lifeNum}`}
              className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 ${
                lifeNum > lives ? "opacity-30 grayscale" : ""
              }`}
            />
          ))}
        </div>

        {/* ADDED: flex-shrink-0 to the columns container */}
        <div className="flex flex-row gap-4 sm:gap-6 flex-shrink-0">
          {/* Column 1 with Indicator */}
          <div className="flex flex-col gap-2.5 items-center justify-center">
            <div className="mb-1 px-5 py-2 bg-gradient-to-br from-blue-500 via-blue-400 to-orange-300 text-white font-bold rounded-full text-sm sm:text-base shadow-lg border border-white/20">
              Hanay 1
            </div>
            {question.choices.map((choice) => {
              const color = getWordColor(choice.word1, "left");
              const isDisabled = pendingSelection?.side === "left";
              const isPending = pendingSelection?.match.left === choice.word1;
              return (
                <button
                  key={choice.word1}
                  className={`w-36 sm:w-40 h-16 sm:h-20 flex items-center justify-center text-center text-sm sm:text-base font-bold py-3 px-4 rounded-2xl border-4 shadow-lg transition-all duration-200 leading-tight ${
                    color
                      ? `${color.bg} ${color.border} scale-105`
                      : "bg-white border-gray-200 hover:border-blue-400"
                  } ${
                    isPending
                      ? "ring-4 ring-blue-400 ring-opacity-50"
                      : ""
                  } ${
                    isDisabled && !isPending
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:shadow-xl hover:scale-105 active:scale-95"
                  }`}
                  onClick={() => handleClick(choice.word1, "left")}
                  disabled={isDisabled && !isPending}
                >
                  <span className="line-clamp-2">{choice.word1}</span>
                </button>
              );
            })}
          </div>

          {/* Column 2 with Indicator */}
          <div className="flex flex-col gap-2.5 items-center justify-center">
            <div className="mb-1 px-5 py-2 bg-gradient-to-br from-red-500 via-red-400 to-orange-300 text-white font-bold rounded-full text-sm sm:text-base shadow-lg border border-white/20">
              Hanay 2
            </div>
            {question.choices.map((choice) => {
              const color = getWordColor(choice.word2, "right");
              const isDisabled = pendingSelection?.side === "right";
              const isPending = pendingSelection?.match.right === choice.word2;
              return (
                <button
                  key={choice.word2}
                  className={`w-36 sm:w-40 h-16 sm:h-20 flex items-center justify-center text-center text-sm sm:text-base font-bold py-3 px-4 rounded-2xl border-4 shadow-lg transition-all duration-200 leading-tight ${
                    color
                      ? `${color.bg} ${color.border} scale-105`
                      : "bg-white border-gray-200 hover:border-red-400"
                  } ${
                    isPending
                      ? "ring-4 ring-red-400 ring-opacity-50"
                      : ""
                  } ${
                    isDisabled && !isPending
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:shadow-xl hover:scale-105 active:scale-95"
                  }`}
                  onClick={() => handleClick(choice.word2, "right")}
                  disabled={isDisabled && !isPending}
                >
                  <span className="line-clamp-2">{choice.word2}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {showBombModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <video
              ref={videoRef}
              src={BombWrong}
              className="w-32 h-32 object-cover"
              muted={false}
              playsInline
            />
            <p className="text-2xl font-bold text-red-600">Mali ang tugma!</p>
            <p className="text-lg text-gray-700">
              Natitira pang buhay: {lives}
            </p>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all"
              onClick={handleCloseBombModal}
            >
              {lives === 0 ? "Tingnan ang Sagot" : "subukan Muli"}
            </button>
          </div>
        </div>
      )}

      <CorrectAnswerModal
        isOpen={showCorrect}
        onClose={handleCloseCorrectModal}
      />
      {showWrongOverlay && (
        <WrongAnswerModal
          isOpen={showWrong}
          onClose={handleCloseWrongModal}
          correctAnswer={question.correctAnswer}
        />
      )}
      <WrongAnswerModal
        isOpen={showTryAgainModal}
        onClose={() => setShowTryAgainModal(false)}
        isTryAgain={true}
      />
    </>
  );
}

export default MatchingWordsWithWords;