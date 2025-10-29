import React, { useRef, useState } from "react";

import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2, Turtle } from "lucide-react";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function TypeWithVoiceAndSlow({ question }) {
  const audioRef = useRef(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  // Play normal speed
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // Play slow speed
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
      answer.trim().toLowerCase() ===
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
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              {question?.question || "I-Type and iyong narinig"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 my-4">
          <button
            className="bg-orange-300 p-2 rounded-xl"
            onClick={handlePlay}
            disabled={!question?.voice}
          >
            <Volume2 className="text-black" size={80} />
          </button>
          <button
            className="bg-orange-300 p-2 rounded-xl"
            onClick={handlePlaySlow}
            disabled={!question?.voice}
          >
            <Turtle className="text-black" size={80} />
          </button>
        </div>
        <form
          className="w-100 flex flex-col items-center my-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="(TYPE)"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-50 bg-white text-black text-center font-bold mb-5 py-2 rounded-full border-3 border-black text-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-50 mt-5 px-4 py-2 bg-[#f2d919] border-3 border-black rounded-xl font-bold"
          >
            Submit
          </button>
        </form>
        {feedback && <div className="text-lg font-bold my-2">{feedback}</div>}
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

export default TypeWithVoiceAndSlow;
