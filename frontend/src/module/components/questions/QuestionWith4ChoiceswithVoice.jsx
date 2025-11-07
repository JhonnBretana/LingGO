import React, { useState, useRef } from "react";
import { Volume2 } from "lucide-react";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function QuestionWith4ChoiceswithVoice({
  question,
  onCorrectAnswer,
  onWrongAnswer,
  showWrongOverlay = true,
}) {
  const [selected, setSelected] = useState(null);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [showTryAgainModal, setShowTryAgainModal] = useState(false);
  const audioRef = useRef(null);

  const handlePlayVoice = () => {
    if (audioRef.current && question.voice) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;

    const correctAnswer =
      typeof question.correctAnswer === "string"
        ? question.correctAnswer
        : question.correctAnswer?.value || question.correctAnswer?.image;

    if (selected && selected === correctAnswer) {
      setShowCorrectModal(true);
    } else {
      if (showWrongOverlay) {
        setShowWrongModal(true);
      } else {
        setShowTryAgainModal(true);
      }
    }
  };

  const handleCloseCorrectModal = () => {
    setShowCorrectModal(false);
    setSelected(null);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrongModal(false);
    setSelected(null);
    if (onWrongAnswer) {
      onWrongAnswer();
    }
  };

  const normalizedChoices = question.choices.map((choice) =>
    typeof choice === "string" || !choice.value
      ? { value: choice.image || choice, image: choice.image || choice }
      : { value: choice.value, image: choice.image }
  );

  const leftChoices = normalizedChoices.slice(0, 2);
  const rightChoices = normalizedChoices.slice(2, 4);

  const getCorrectAnswerText = () => {
    if (typeof question.correctAnswer === "string") {
      return question.correctAnswer;
    }
    return (
      question.correctAnswer?.value ||
      question.correctAnswer?.image ||
      "See correct image above"
    );
  };

  // Function to determine if text is long (will likely wrap to 2 lines)
  const isLongText = (text) => {
    return text && text.length > 18; // Adjust threshold as needed
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start h-full max-h-screen overflow-y-auto px-4 pt-4 gap-4 pb-6">
        {/* Voice Button and Question Text */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={handlePlayVoice}
            className="bg-transparent border-none flex-shrink-0"
            disabled={!question.voice}
          >
            <Volume2 className="text-white" size={40} />
          </button>
          <p className="text-lg sm:text-2xl font-bold text-white">
            {question?.question || "Daghang Salamat"}
          </p>
        </div>

        {/* Hidden audio element */}
        {question.voice && (
          <audio
            ref={audioRef}
            src={question.voice}
            style={{ display: "none" }}
          />
        )}

        <form
          className="w-full max-w-80 flex flex-col gap-3 justify-start items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-3 w-full">
            {leftChoices.map((choice, idx) => (
              <button
                key={idx}
                type="button"
                className={`flex-1 h-40 flex flex-col bg-white text-black text-base font-bold p-3 rounded-2xl border-4 shadow-lg overflow-hidden transition-all duration-200 ${
                  selected === choice.value
                    ? "border-yellow-400 scale-105 shadow-xl"
                    : "border-gray-200 hover:scale-105 hover:shadow-xl"
                }`}
                onClick={() => setSelected(choice.value)}
              >
                <div className="flex-1 flex items-center justify-center w-full min-h-0 mb-2">
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div 
                  className={`w-full text-center shrink-0 px-1 leading-tight ${
                    isLongText(choice.value) 
                      ? 'text-[8px]' 
                      : 'text-[10px]'
                  }`}
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {choice.value}
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-row gap-3 w-full">
            {rightChoices.map((choice, idx) => (
              <button
                key={idx + 2}
                type="button"
                className={`flex-1 h-40 flex flex-col bg-white text-black text-base font-bold p-3 rounded-2xl border-4 shadow-lg overflow-hidden transition-all duration-200 ${
                  selected === choice.value
                    ? "border-yellow-400 scale-105 shadow-xl"
                    : "border-gray-200 hover:scale-105 hover:shadow-xl"
                }`}
                onClick={() => setSelected(choice.value)}
              >
                <div className="flex-1 flex items-center justify-center w-full min-h-0 mb-2">
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div 
                  className={`w-full text-center shrink-0 px-1 leading-tight ${
                    isLongText(choice.value) 
                      ? 'text-[9px]' 
                      : 'text-[10px]'
                  }`}
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {choice.value}
                </div>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full max-w-40 mt-3 px-4 py-2 bg-[#f2d919] border-2 border-black rounded-xl font-bold hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selected}
          >
            Ipasa
          </button>
        </form>
      </div>

      <CorrectAnswerModal
        isOpen={showCorrectModal}
        onClose={handleCloseCorrectModal}
      />

      {showWrongOverlay && (
        <WrongAnswerModal
          isOpen={showWrongModal}
          correctAnswer={getCorrectAnswerText()}
          onClose={handleCloseWrongModal}
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

export default QuestionWith4ChoiceswithVoice;