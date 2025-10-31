import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../BackgroundLayout";
import PageHeaderLayout from "../PageHeaderLayout";
import Char from "../../../assets/char.png";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2 } from "lucide-react";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function FourChoicesWithCharacterAndVoice({ question }) {
  const audioRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  const playAudioSrc = (src) => {
    if (!src || !audioRef.current) return;
    try {
      audioRef.current.pause();
      audioRef.current.src = src;
      audioRef.current.playbackRate = 1;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } catch (e) { }
  };

  const handlePlayChoice = (choice) => {
    const choiceVoice = typeof choice === "object" ? choice.voice : null;
    if (choiceVoice) {
      playAudioSrc(choiceVoice);
    } else if (question?.voice) {
      playAudioSrc(question.voice);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return; // Extra safety check

    const selectedVal = (selected || "").trim().toLowerCase();
    const correct =
      typeof question.correctAnswer === "string"
        ? question.correctAnswer
        : question.correctAnswer?.value || "";

    if (selectedVal && selectedVal === correct.trim().toLowerCase()) {
      setShowCorrectModal(true);
    } else if (selectedVal) { // Only show wrong modal if there's a selection
      setShowWrongModal(true);
    }
  };

  const normalizedChoices = (question?.choices || []).map((c) =>
    typeof c === "string"
      ? { value: c, voice: null, image: null }
      : { value: c.value, voice: c.voice || null, image: c.image || null }
  );

  return (
    <BackgroundLayout>
      <PageHeaderLayout />

      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <div className="relative w-80">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              {question?.question || "Piliin ang Tamang Salin"}
            </span>
          </div>
        </div>

        <div>
          <img
            src={question?.image || Char}
            alt="character"
            className="w-60 h-60 object-contain"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-100 flex flex-col gap-4 items-center"
        >
          <div className="grid grid-cols-2 gap-4 mb-5">
            {normalizedChoices.map((choice, idx) => {
              const isSelected = selected === choice.value;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 bg-white text-black cursor-pointer ${isSelected
                    ? "border-yellow-400 ring-2 ring-yellow-300"
                    : ""
                    }`}
                  onClick={() => setSelected(choice.value)}
                >
                  <div className="flex-1 text-lg font-bold text-center">
                    {choice.value}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayChoice(choice);
                    }}
                    className="p-1"
                  >
                    <Volume2 />
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="w-50 my-5 px-4 py-2 bg-[#f2d919] border-3 border-black rounded-xl font-bold"
            disabled={!selected}
          >
            Submit
          </button>
        </form>

        <audio ref={audioRef} style={{ display: "none" }} />
      </div>

      <CorrectAnswerModal
        isOpen={showCorrectModal}
        onClose={() => setShowCorrectModal(false)}
      />

      <WrongAnswerModal
        isOpen={showWrongModal}
        correctAnswer={question.correctAnswer}
        onClose={() => setShowWrongModal(false)}
      />
    </BackgroundLayout>
  );
}

export default FourChoicesWithCharacterAndVoice;