import React, { useRef, useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import { Volume2, Turtle } from "lucide-react";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";
import GirlAtMarket1 from "/assets/ImageChoices/girlatmarket1.png";

function Select4ChoicesWithVoice({
  question,
  onCorrectAnswer,
  onWrongAnswer,
  showWrongOverlay = true,
}) {
  const audioRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [showTryAgainModal, setShowTryAgainModal] = useState(false);

  const characterName = question?.characterName || "";

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

    const selectedValue =
      typeof selected === "string" ? selected : selected.value;
    const correctValue = question.correctAnswer || "";

    if (
      selectedValue.trim().toLowerCase() === correctValue.trim().toLowerCase()
    ) {
      setShowCorrectModal(true);
    } else {
      if (showWrongOverlay) {
        setShowWrongModal(true);
      } else {
        setShowTryAgainModal(true);
      }
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

  const isChoiceSelected = (choice) => {
    if (typeof choice === "string") {
      return selected === choice;
    }
    return selected?.value === choice.value;
  };

  const getChoiceDisplay = (choice) => {
    return typeof choice === "string" ? choice : choice.value;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start px-4 pt-2 gap-2 overflow-y-auto h-full">
        <div className="relative w-full max-w-80 mb-3">
          <img
            src={QuestionsBar}
            alt="Questions Bar"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="font-medium text-center text-xl text-black drop-shadow-[2px_2px_0px_white]  w-full max-w-md px-10"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: "bold",
              }}
            >
              {question?.situation || "Sitwasyon"}
            </p>
          </div>
        </div>
        <div
          className="px-5 py-6 bg-white rounded-lg w-100 h-20 border border-black flex flex-col text-center  justify-center"
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: "bold",
          }}
        >
          <span className="text-2xl">
            Nais mong magtanong, ano ang iyong sasabihin?.
          </span>
        </div>

        <div className="flex flex-row items-center gap-2 w-full max-w-md">
          <div className="flex flex-col relative items-center justify-center">
            <img src={GirlAtMarket1} alt="Character" className="h-40 " />
          </div>
        </div>
        <div
          className="font-medium text-right text-xl text-white drop-shadow-[2px_3px_1px_black]  w-full max-w-md px-6"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
        >
          {characterName}
        </div>

        <div className="relative w-full max-w-xs sm:max-w-sm">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <span className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-center leading-tight">
              {question?.question || "Pindutin and Maririnig mo"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
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
          className="w-full max-w-[280px] sm:max-w-xs flex flex-col gap-3 sm:gap-5 items-center justify-center"
          onSubmit={handleSubmit}
        >
          {question.choices.map((choice, idx) => (
            <button
              key={idx}
              type="button"
              className={`w-full text-center bg-gradient-to-r from-white to-gray-50 text-black text-base sm:text-lg font-bold py-3 px-4 rounded-xl border-2 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ${
                isChoiceSelected(choice)
                  ? "border-yellow-400 bg-yellow-50 shadow-lg scale-105"
                  : "border-gray-200"
              }`}
              onClick={() => setSelected(choice)}
            >
              {typeof choice === "object" && choice.image ? (
                <img
                  src={choice.image}
                  alt={choice.value}
                  className="w-full h-24 object-cover rounded"
                />
              ) : (
                getChoiceDisplay(choice)
              )}
            </button>
          ))}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#f2d919] border-2 border-black rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selected}
          >
            Ipasa
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

      {showWrongOverlay && (
        <WrongAnswerModal
          isOpen={showWrongModal}
          correctAnswer={question.correctAnswer}
          onClose={handleCloseWrongModal}
        />
      )}
      <WrongAnswerModal
        isOpen={showTryAgainModal}
        onClose={() => setShowTryAgainModal(false)}
        isTryAgain={true}
      />
    </>
  );
}

export default Select4ChoicesWithVoice;
