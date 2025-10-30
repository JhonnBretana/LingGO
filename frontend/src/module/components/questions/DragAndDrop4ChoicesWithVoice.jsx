import React, { useState, useRef } from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2 } from "lucide-react";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function DragAndDrop4ChoicesWithVoice({ question }) {
  const [droppedValue, setDroppedValue] = useState(null);
  const [feedback, setFeedback] = useState("");
  const audioRef = useRef(null);

  const handleDragStart = (e, value) => {
    e.dataTransfer.setData("text/plain", value);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const value = e.dataTransfer.getData("text/plain");
    setDroppedValue(value);
    if (
      value.trim().toLowerCase() ===
      (question.correctAnswer || "").trim().toLowerCase()
    ) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again.");
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

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">I-Drag ang hinihingi</span>
          </div>
        </div>
        <div className="flex items-center gap-4 my-4">
          <button
            type="button"
            onClick={handlePlayVoice}
            className="bg-transparent border-none"
            disabled={!question.voice}
          >
            <Volume2 className="text-white" size={54} />
          </button>
          <p className="text-2xl font-bold text-white">{question?.question}</p>
        </div>
        <div className="flex items-center gap-4 my-4">
          <div
            className="border-b-white border-b-4 w-60 pb-2 text-center min-h-[40px] flex items-center justify-center bg-gray-100 rounded"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {droppedValue ? (
              <span className="text-lg font-bold">{droppedValue}</span>
            ) : (
              <span className="text-gray-400">Drop Here</span>
            )}
          </div>
        </div>
        <div className="w-100 flex flex-col gap-5 items-center justify-center mt-4">
          {question.choices.map((choice, idx) => (
            <div
              key={idx}
              className="w-80 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 cursor-grab"
              draggable
              onDragStart={(e) => handleDragStart(e, choice)}
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
        {feedback && (
          <div className="text-lg font-bold mt-4 text-center">{feedback}</div>
        )}
      </div>
    </BackgroundLayout>
  );
}

export default DragAndDrop4ChoicesWithVoice;
