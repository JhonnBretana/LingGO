import React, { useState, useRef } from "react";
import { Volume2 } from "lucide-react";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function QuestionWith4ChoicesnoImage({
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
        : question.correctAnswer?.value || question.correctAnswer;

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
    typeof choice === "string" ? choice : choice.value || choice
  );

  const getCorrectAnswerText = () => {
    if (typeof question.correctAnswer === "string") {
      return question.correctAnswer;
    }
    return question.correctAnswer?.value || question.correctAnswer;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen overflow-hidden px-4 pt-4 gap-4">
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
          className="w-full max-w-[280px] sm:max-w-xs flex flex-col gap-3 sm:gap-5 items-center justify-center"
          onSubmit={handleSubmit}
        >
          {normalizedChoices.map((choice, idx) => (
            <button
              key={idx}
              type="button"
              className={`w-full text-center bg-gradient-to-r from-white to-gray-50 text-black text-base sm:text-lg font-bold py-3 px-4 rounded-xl border-2 shadow-md transition-all duration-200 ${
                selected === choice
                  ? "border-yellow-400 bg-yellow-50 shadow-lg scale-105"
                  : "border-gray-200 hover:shadow-xl hover:scale-105 active:scale-95"
              }`}
              onClick={() => setSelected(choice)}
            >
              {choice}
            </button>
          ))}

          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#f2d919] border-2 border-black rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default QuestionWith4ChoicesnoImage;