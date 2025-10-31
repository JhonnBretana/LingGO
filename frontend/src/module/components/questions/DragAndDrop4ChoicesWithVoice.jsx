import React, { useState, useRef } from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2 } from "lucide-react";
import PageHeaderLayout from "../../components/PageHeaderLayout";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function DragAndDrop4ChoicesWithVoice({ question }) {
  const [droppedValue, setDroppedValue] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const audioRef = useRef(null);

  const handleDragStart = (e, value) => {
    e.dataTransfer.setData("text/plain", value);
    setDraggedItem(value);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const value = e.dataTransfer.getData("text/plain");
    setDroppedValue(value);
    setDraggedItem(null);

    const correctAnswer = (question.correctAnswer || "").trim().toLowerCase();
    const droppedAnswer = value.trim().toLowerCase();

    if (droppedAnswer === correctAnswer) {
      setShowCorrect(true);
    } else {
      setShowWrong(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handlePlayVoice = () => {
    if (audioRef.current && question.voice) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleCloseModals = () => {
    setShowCorrect(false);
    setShowWrong(false);
    setDroppedValue(null);
  };

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="relative w-full max-w-[280px] sm:max-w-xs mb-3">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <span className="text-base sm:text-xl font-semibold text-center">
              I-Drag ang hinihingi
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 my-3">
          <button
            type="button"
            onClick={handlePlayVoice}
            className="bg-transparent border-none flex-shrink-0"
            disabled={!question.voice}
          >
            <Volume2 className="text-white" size={40} />
          </button>
          <p className="text-lg sm:text-2xl font-bold text-white">
            {question?.question}
          </p>
        </div>

        <div className="flex items-center gap-4 my-4">
          <div
            className="w-60 pb-2 pt-2 text-center min-h-[50px] flex items-center justify-center rounded-lg bg-white/90 shadow-md transition-all duration-300"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {droppedValue ? (
              <span className="text-lg font-bold text-gray-800">
                {droppedValue}
              </span>
            ) : (
              <span className="text-gray-400 text-sm font-medium">
                Drop Here
              </span>
            )}
          </div>
        </div>

        <div className="w-full max-w-[280px] sm:max-w-xs flex flex-col gap-3 sm:gap-5 items-center justify-center mt-3">
          {question.choices.map((choice, idx) => (
            <div
              key={idx}
              className={`w-full text-center bg-gradient-to-r from-white to-gray-50 text-black text-base sm:text-lg font-bold py-3 px-4 rounded-xl border-2 border-gray-200 cursor-grab shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ${draggedItem === choice ? "opacity-50 scale-95" : ""
                } ${droppedValue === choice ? "opacity-40" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, choice)}
              onDragEnd={handleDragEnd}
            >
              {choice}
            </div>
          ))}
        </div>

        {question.voice && (
          <audio
            ref={audioRef}
            src={question.voice}
            style={{ display: "none" }}
          />
        )}
      </div>

      <CorrectAnswerModal isOpen={showCorrect} onClose={handleCloseModals} />
      <WrongAnswerModal
        isOpen={showWrong}
        onClose={handleCloseModals}
        correctAnswer={question.correctAnswer}
      />
    </BackgroundLayout>
  );
}

export default DragAndDrop4ChoicesWithVoice;
