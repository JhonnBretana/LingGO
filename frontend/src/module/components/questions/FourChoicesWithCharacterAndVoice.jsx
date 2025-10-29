import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../BackgroundLayout";
import PageHeaderLayout from "../PageHeaderLayout";
import VoiceCharacterGrid from "../VoiceCharacterGrid";
import Char from "../../../assets/char.png";
import QuestionsBar from "../../../assets/clickbar.png";
import { Mic, Volume2 } from "lucide-react";

function FourChoicesWithCharacterAndVoice({ question }) {
  const audioRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  const playAudioSrc = (src) => {
    if (!src || !audioRef.current) return;
    try {
      audioRef.current.pause();
      audioRef.current.src = src;
      audioRef.current.playbackRate = 1;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } catch (e) {
      // ignore play errors
    }
  };

  const handlePlayMain = () => {
    playAudioSrc(question?.voice);
  };

  const handlePlayChoice = (choice) => {
    // choice can be string or object { value, voice }
    const choiceVoice = typeof choice === "object" ? choice.voice : null;
    if (choiceVoice) {
      playAudioSrc(choiceVoice);
    } else if (question?.voice) {
      // fallback to main voice if per-choice voice not provided
      playAudioSrc(question.voice);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedVal = (selected || "").trim().toLowerCase();
    const correct =
      typeof question.correctAnswer === "string"
        ? question.correctAnswer
        : question.correctAnswer?.value || "";
    if (selectedVal && selectedVal === correct.trim().toLowerCase()) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again.");
    }
  };

  // Normalize choices to objects { value, voice?, image? }
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
              {question?.question || "Piliin and Tamang Salin"}
            </span>
          </div>
        </div>

        {/* top row: play main voice + question text */}
        {/* <div className="flex items-center gap-4 my-1">
          <button
            className="bg-orange-500 p-2 rounded-xl"
            onClick={handlePlayMain}
            disabled={!question?.voice}
            type="button"
          >
            <Volume2 className="text-white" size={28} />
          </button>
          <p className="text-4xl font-semibold text-white">
            {question?.question}
          </p>
        </div> */}

        {/* character image */}
        <div>
          <img
            src={question?.image || Char}
            alt="character"
            className="w-60 h-60 object-contain"
          />
        </div>

        {/* choices */}
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
            className="w-50 my-5 px-4 py-2 bg-[#f2d919] border-3 border-black rounded-xl font-bold"
            disabled={!selected}
          >
            Submit
          </button>
        </form>

        {feedback && <div className="text-lg font-bold mt-2">{feedback}</div>}

        {/* hidden audio element */}
        <audio ref={audioRef} style={{ display: "none" }} />
      </div>
    </BackgroundLayout>
  );
}

export default FourChoicesWithCharacterAndVoice;
