import React, { useRef, useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2, Turtle } from "lucide-react";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function SixChoicesWithVoice({ question }) {
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

  const handlePlaySlow = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 0.4;
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
          <div className="w-full max-w-80 flex flex-row gap-3 items-center justify-center mb-4">
            <div className="flex flex-col gap-4 flex-1">
              {leftChoices.map((choice, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`w-full h-40 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${selected === choice.value
                    ? "border-4 border-yellow-400"
                    : ""
                    }`}
                  onClick={() => setSelected(choice.value)}
                >
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="w-full max-w-25 mx-auto"
                  />
                  <div>{choice.value}</div>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {rightChoices.map((choice, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`w-full h-40 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${selected === choice.value
                    ? "border-4 border-yellow-400"
                    : ""
                    }`}
                  onClick={() => setSelected(choice.value)}
                >
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="w-full max-w-25 mx-auto"
                  />
                  <div>{choice.value}</div>
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
        onClose={() => setShowCorrectModal(false)}
      />

      <WrongAnswerModal
        isOpen={showWrongModal}
        correctAnswer={question.correctAnswer?.value}
        onClose={() => setShowWrongModal(false)}
      />
    </>
  );
}

export default SixChoicesWithVoice;