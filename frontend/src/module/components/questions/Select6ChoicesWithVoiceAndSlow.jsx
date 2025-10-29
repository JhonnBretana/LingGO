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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 my-5">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              {question?.question || "Pindutin and Maririnig mo"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 my-4">
          <button
            className="bg-orange-300 p-2 rounded-xl"
            onClick={handlePlay}
            disabled={!question?.voice}
          >
            <Volume2 className="text-black" size={54} />
          </button>
          <button
            className="bg-orange-300 p-2 rounded-xl"
            onClick={handlePlaySlow}
            disabled={!question?.voice}
          >
            <Turtle className="text-black" size={54} />
          </button>
        </div>
        <form
          className="w-100 flex flex-col gap-5 items-center justify-center mt-4"
          onSubmit={handleSubmit}
        >
          {question.choices.map((choice, idx) => (
            <button
              key={idx}
              type="button"
              className={`w-50 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2 ${
                selected === choice ? "border-yellow-400" : ""
              }`}
              onClick={() => setSelected(choice)}
            >
              {choice}
            </button>
          ))}
          <button
            type="submit"
            className="w-50 my-5 px-4 py-2 bg-[#f2d919] border-2 border-black rounded-xl font-bold"
            disabled={!selected}
          >
            Submit
          </button>
        </form>
        {feedback && <div className="text-lg font-bold my-5">{feedback}</div>}
        {/* Hidden audio element for playback */}
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
