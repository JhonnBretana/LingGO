import React, { useRef, useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2, Turtle } from "lucide-react";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function SixChoicesWithVoice({ question, onCorrectAnswer }) {
  const audioRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;

    if (
      selected &&
      selected.trim().toLowerCase() ===
      (question.correctAnswer?.value || "").trim().toLowerCase()
    ) {
      setShowCorrectModal(true);
    } else {
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

    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const leftChoices = question.choices.slice(0, 3);
  const rightChoices = question.choices.slice(3, 6);

  return (
    <>
      <div className="flex flex-col items-center mt-5 justify-center min-h-screen gap-4">
        <div className="flex items-center gap-4 my-1">
          <button className="" onClick={handlePlay} disabled={!question?.voice}>
            <Volume2 className="text-white" size={60} />
          </button>
          <p className="text-4xl font-semibold text-white">
            {question?.question}
          </p>
        </div>
        <form
          className="w-full flex flex-col items-center my-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-80 flex flex-row gap-3 xs:gap-2 items-center justify-center mb-4">
            <div className="flex flex-col gap-4 flex-1">
              {leftChoices.map((choice, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`w-full h-40 flex flex-col bg-white text-black text-lg font-bold p-3 rounded-lg border-2 overflow-hidden ${selected === choice.value
                    ? "border-4 border-yellow-400"
                    : ""
                    }`}
                  onClick={() => setSelected(choice.value)}
                >
                  <div className="flex-1 flex items-center justify-center w-full min-h-0">
                    <img
                      src={choice.image}
                      alt={choice.value}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="w-full text-center pt-2 shrink-0">{choice.value}</div>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {rightChoices.map((choice, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`w-full h-40 flex flex-col bg-white text-black text-lg font-bold p-3 rounded-lg border-2 overflow-hidden ${selected === choice.value
                    ? "border-4 border-yellow-400"
                    : ""
                    }`}
                  onClick={() => setSelected(choice.value)}
                >
                  <div className="flex-1 flex items-center justify-center w-full min-h-0">
                    <img
                      src={choice.image}
                      alt={choice.value}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="w-full text-center pt-2 shrink-0">{choice.value}</div>
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full max-w-50 my-5 px-4 py-2 bg-[#f2d919] border-3 border-black rounded-xl font-bold"
            disabled={!selected}
          >
            Submit
          </button>
        </form>
        {question?.voice && (
          <audio
            ref={audioRef}
            src={question.voice}
            style={{ display: "none" }}
          />
        )}
      </div>

      <CorrectAnswerModal
        isOpen={showCorrectModal}
        onClose={handleCloseCorrectModal}
      />

      <WrongAnswerModal
        isOpen={showWrongModal}
        correctAnswer={question.correctAnswer?.value}
        onClose={handleCloseWrongModal}
      />
    </>
  );
}

export default SixChoicesWithVoice;