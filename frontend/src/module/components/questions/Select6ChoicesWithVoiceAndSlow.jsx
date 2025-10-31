import React, { useRef, useState } from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2, Turtle } from "lucide-react";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function Select6ChoicesWithVoiceAndSlow({ question }) {
  const audioRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

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
    if (
      selected &&
      selected.trim().toLowerCase() ===
      (question.correctAnswer || "").trim().toLowerCase()
    ) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again.");
    }
  };

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="relative w-full max-w-[280px] sm:max-w-xs my-3 sm:my-5">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <span className="text-base sm:text-xl font-semibold text-center">
              {question?.question || "Pindutin and Maririnig mo"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 my-3 sm:my-4">
          <button
            className="bg-orange-300 p-2 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
            onClick={handlePlay}
            disabled={!question?.voice}
          >
            <Volume2 className="text-black" size={54} />
          </button>
          <button
            className="bg-orange-300 p-2 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
            onClick={handlePlaySlow}
            disabled={!question?.voice}
          >
            <Turtle className="text-black" size={54} />
          </button>
        </div>
        <form
          className="w-full max-w-[280px] sm:max-w-xs flex flex-col gap-3 sm:gap-5 items-center justify-center mt-3 sm:mt-4"
          onSubmit={handleSubmit}
        >
          {question.choices.map((choice, idx) => (
            <button
              key={idx}
              type="button"
              className={`w-full text-center bg-gradient-to-r from-white to-gray-50 text-black text-base sm:text-lg font-bold py-3 px-4 rounded-xl border-2 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ${selected === choice
                ? "border-yellow-400 bg-yellow-50 shadow-lg scale-105"
                : "border-gray-200"
                }`}
              onClick={() => setSelected(choice)}
            >
              {choice}
            </button>
          ))}
          <button
            type="submit"
            className="w-full my-3 sm:my-5 px-4 py-3 bg-[#f2d919] border-2 border-black rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selected}
          >
            Submit
          </button>
        </form>
        {feedback && (
          <div className="text-base sm:text-lg font-bold my-3 sm:my-5 text-white">
            {feedback}
          </div>
        )}
        {question?.voice && (
          <audio
            ref={audioRef}
            src={question.voice}
            style={{ display: "none" }}
          />
        )}
      </div>
    </BackgroundLayout>
  );
}

export default Select6ChoicesWithVoiceAndSlow;