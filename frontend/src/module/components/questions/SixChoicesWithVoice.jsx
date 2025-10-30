import React, { useRef, useState } from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2, Turtle } from "lucide-react";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function SixChoicesWithVoice({ question }) {
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
      (question.correctAnswer?.value || "").trim().toLowerCase()
    ) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again.");
    }
  };

  // Split choices into two columns of 3
  const leftChoices = question.choices.slice(0, 3);
  const rightChoices = question.choices.slice(3, 6);

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center mt-5 justify-center min-h-screen gap-4">
        {/* <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              {question?.question || "Select the correct answer"}
            </span>
          </div>
        </div> */}
        <div className="flex items-center gap-4 my-1">
          <button className="" onClick={handlePlay} disabled={!question?.voice}>
            <Volume2 className="text-white" size={60} />
          </button>
          <p className="text-4xl font-semibold text-white">
            {question?.question}
          </p>
        </div>
        <form
          className="w-100 flex flex-col items-center my-4"
          onSubmit={handleSubmit}
        >
          <div className="w-100 flex flex-row gap-3 items-center justify-center mb-4">
            <div className="flex flex-col gap-4">
              {leftChoices.map((choice, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`w-40 h-40 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${selected === choice.value
                      ? "border-4 border-yellow-400"
                      : ""
                    }`}
                  onClick={() => setSelected(choice.value)}
                >
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="w-25 mx-auto"
                  />
                  <div>{choice.value}</div>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {rightChoices.map((choice, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`w-40 h-40 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 ${selected === choice.value
                      ? "border-4 border-yellow-400"
                      : ""
                    }`}
                  onClick={() => setSelected(choice.value)}
                >
                  <img
                    src={choice.image}
                    alt={choice.value}
                    className="w-25 mx-auto"
                  />
                  <div>{choice.value}</div>
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-50 my-5 px-4 py-2 bg-[#f2d919] border-3 border-black rounded-xl font-bold"
            disabled={!selected}
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

export default SixChoicesWithVoice;
