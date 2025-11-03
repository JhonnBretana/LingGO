import React, { useState, useRef } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2 } from "lucide-react";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function FourChoicesWithCharacterAndVoice({
  question,
  onCorrectAnswer,
  onWrongAnswer,
}) {
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
    } catch (e) {}
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
    if (!selected) return;

    const selectedVal = (selected || "").trim().toLowerCase();
    const correct =
      typeof question.correctAnswer === "string"
        ? question.correctAnswer
        : question.correctAnswer?.value || "";

    if (selectedVal && selectedVal === correct.trim().toLowerCase()) {
      setShowCorrectModal(true);
    } else if (selectedVal) {
      setShowWrongModal(true);
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

  const normalizedChoices = (question?.choices || []).map((c) =>
    typeof c === "string"
      ? { value: c, voice: null, image: null }
      : { value: c.value, voice: c.voice || null, image: c.image || null }
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-5 px-4">
        <div className="relative w-80">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              {question?.question || "Piliin ang Tamang Salin"}
            </span>
          </div>
        </div>

        <div className="w-full max-w-sm h-64 flex items-center justify-center">
          {question?.image && (
            <img
              src={question.image}
              alt="character"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-4 items-center"
        >
          <div className="grid grid-cols-2 gap-4 w-full mb-5">
            {normalizedChoices.map((choice, idx) => {
              const isSelected = selected === choice.value;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 bg-white text-black cursor-pointer ${
                    isSelected ? "border-yellow-400 ring-2 ring-yellow-300" : ""
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
            className="w-full max-w-xs my-5 px-4 py-3 bg-[#f2d919] border-3 border-black rounded-xl font-bold text-lg"
            disabled={!selected}
          >
            Submit
          </button>
        </form>

        <audio ref={audioRef} style={{ display: "none" }} />
      </div>

      <CorrectAnswerModal
        isOpen={showCorrectModal}
        onClose={handleCloseCorrectModal}
      />

      <WrongAnswerModal
        isOpen={showWrongModal}
        correctAnswer={question.correctAnswer}
        onClose={handleCloseWrongModal}
      />
    </>
  );
}

export default FourChoicesWithCharacterAndVoice;
