import React, { useRef, useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2, Turtle } from "lucide-react";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function TypeWithVoiceAndSlow({ question, onCorrectAnswer, onWrongAnswer }) {
  const audioRef = useRef(null);
  const [answer, setAnswer] = useState("");
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

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
    const correct = (question.correctAnswer || "").trim().toLowerCase();
    const userAnswer = answer.trim().toLowerCase();

    if (userAnswer === correct) {
      setShowCorrect(true);
    } else {
      setShowWrong(true);
    }
  };

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setAnswer("");
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setAnswer("");
    if (onWrongAnswer) {
      onWrongAnswer();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start px-4 pt-2 gap-4 overflow-hidden h-full">
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <span className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-center leading-tight">
              {question?.question || "I-Type ang iyong narinig"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <button
            className="bg-orange-300 p-3 sm:p-4 rounded-xl shadow-lg active:scale-95 transition-transform"
            onClick={handlePlay}
            disabled={!question?.voice}
          >
            <Volume2 className="text-black" size={56} />
          </button>
          <button
            className="bg-orange-300 p-3 sm:p-4 rounded-xl shadow-lg active:scale-95 transition-transform"
            onClick={handlePlaySlow}
            disabled={!question?.voice}
          >
            <Turtle className="text-black" size={56} />
          </button>
        </div>

        <form
          className="w-full max-w-xs sm:max-w-sm flex flex-col items-center px-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="(TYPE)"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toUpperCase())}
            className="w-full bg-white text-black text-center font-bold mb-4 py-2 sm:py-3 px-4 rounded-full border-3 border-black text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full px-6 py-2 sm:py-3 bg-[#f2d919] border-3 border-black rounded-xl font-bold text-base sm:text-lg shadow-lg active:scale-95 transition-transform"
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
        isOpen={showCorrect}
        onClose={handleCloseCorrectModal}
      />

      <WrongAnswerModal
        isOpen={showWrong}
        onClose={handleCloseWrongModal}
        correctAnswer={question.correctAnswer}
      />
    </>
  );
}

export default TypeWithVoiceAndSlow;
