import React, { useState, useRef } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2 } from "lucide-react";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function DragAndDrop4ChoicesWithVoice({ question, onCorrectAnswer }) {
  const [droppedValue, setDroppedValue] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [touchPosition, setTouchPosition] = useState(null);
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

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setDroppedValue(null);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setDroppedValue(null);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  // Handle mobile touch for drag and drop
  const handleTouchStart = (e, value) => {
    setDraggedItem(value);
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (draggedItem) {
      const touch = e.touches[0];
      setTouchPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const dropZone = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropZone && dropZone.classList.contains('drop-zone')) {
      const correctAnswer = (question.correctAnswer || "").trim().toLowerCase();
      const droppedAnswer = draggedItem.trim().toLowerCase();

      setDroppedValue(draggedItem);

      if (droppedAnswer === correctAnswer) {
        setShowCorrect(true);
      } else {
        setShowWrong(true);
      }
    }

    setDraggedItem(null);
    setTouchPosition(null);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start px-4 pt-2 gap-4 overflow-hidden h-full">
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <span className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-center leading-tight">
              I-Drag ang hinihingi
            </span>
          </div>
        </div>

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
            {question?.question}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="drop-zone w-60 pb-2 pt-2 text-center min-h-[50px] flex items-center justify-center rounded-lg bg-white/90 shadow-md transition-all duration-300"
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

        <div className="w-full max-w-[280px] sm:max-w-xs flex flex-col gap-3 sm:gap-5 items-center justify-center">
          {question.choices.map((choice, idx) => (
            <div
              key={idx}
              className={`w-full text-center bg-gradient-to-r from-white to-gray-50 text-black text-base sm:text-lg font-bold py-3 px-4 rounded-xl border-2 border-gray-200 cursor-grab shadow-md hover:shadow-xl transition-all duration-200 ${draggedItem === choice
                  ? "opacity-30 scale-90"
                  : "hover:scale-105 active:scale-95"
                } ${droppedValue === choice ? "opacity-40" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, choice)}
              onDragEnd={handleDragEnd}
              onTouchStart={(e) => handleTouchStart(e, choice)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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

        {/* Floating dragged item for touch */}
        {draggedItem && touchPosition && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: touchPosition.x - 140,
              top: touchPosition.y - 25,
              width: '280px',
            }}
          >
            <div className="text-center bg-gradient-to-r from-white to-gray-50 text-black text-base sm:text-lg font-bold py-3 px-4 rounded-xl border-2 border-gray-200 shadow-2xl opacity-90">
              {draggedItem}
            </div>
          </div>
        )}
      </div>

      <CorrectAnswerModal isOpen={showCorrect} onClose={handleCloseCorrectModal} />
      <WrongAnswerModal
        isOpen={showWrong}
        onClose={handleCloseWrongModal}
        correctAnswer={question.correctAnswer}
      />
    </>
  );
}

export default DragAndDrop4ChoicesWithVoice;