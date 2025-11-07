import React, { useState, useRef } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import GirlAtHouse from "/assets/ImageChoices/girlathouse.png";
import { Volume2, RotateCcw } from "lucide-react";
import Microphone from "../../../assets/Microphone.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

const SituationalQuestionWithVoice = ({
  situation,
  instruction,
  instructionSub,
  characterName,
  question,
  voice,
  onCorrectAnswer,
  onWrongAnswer,
  showWrongOverlay = true,
  correctAnswer,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const [showTryAgainModal, setShowTryAgainModal] = useState(false);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleReset = () => {
    setTranscript("");
    setShowSubmit(false);
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore if already stopped
      }
      recognitionRef.current = null;
    }
  };

  const handleMicClick = () => {
    if (transcript && !isRecording) {
      return;
    }

    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore if already stopped
      }
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript("");
      setShowSubmit(false);
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setShowSubmit(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userSpoken = (transcript || "").trim().toLowerCase();
    const correctNormalized = (correctAnswer || "").trim().toLowerCase();

    if (userSpoken && userSpoken === correctNormalized) {
      setShowCorrect(true);
    } else {
      if (showWrongOverlay) {
        setShowWrong(true);
      } else {
        setTranscript("");
        setShowSubmit(false);
        setShowTryAgainModal(true);
      }
    }

    setShowSubmit(false);
  };

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setTranscript("");
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setTranscript("");
    if (onWrongAnswer) {
      onWrongAnswer();
    }
  };

  const isMicDisabled = transcript && !isRecording;

  return (
    <>
      <div className="flex flex-col items-center w-full px-2 pt-4 gap-3">
        {/* Situation Bar */}
        {situation && (
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
                {situation}
              </p>
            </div>
          </div>
        )}

        {/* Instruction Bubble */}
        <div className="flex flex-row items-center gap-2 w-full max-w-md">
          <div className="flex flex-col relative">
            <div className="absolute top-[60px] right-[45px]  z-10 w-[150px]">
              <span className="font-bold text-black text-base">
                {instruction}
              </span>
              {instructionSub && (
                <div className="text-xs text-gray-500">{instructionSub}</div>
              )}
            </div>
            <img src={GirlAtHouse} alt="" />
          </div>
        </div>

        {/* Character Name */}
        {characterName && (
          <div
            className="font-medium text-right text-xl text-white drop-shadow-[2px_3px_1px_black]  w-full max-w-md px-16"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
          >
            {characterName}
          </div>
        )}
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
              Pakinggan at bigkasin
            </p>
          </div>
        </div>

        {/* Question with Audio */}
        <div className="flex items-center gap-4 justify-center w-full mt-4">
          <button
            onClick={handlePlayAudio}
            disabled={!voice}
            className="flex-shrink-0"
          >
            <Volume2 className="text-white" size={40} />
          </button>
          <p className="text-2xl sm:text-4xl font-semibold text-white text-center">
            {question}
          </p>
        </div>

        {/* Microphone Section */}
        <div className="flex flex-col items-center mt-6">
          <img
            className={`${
              isMicDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${isRecording ? "animate-pulse" : ""}`}
            src={Microphone}
            alt="Microphone"
            onClick={handleMicClick}
            style={{
              filter: isRecording
                ? "grayscale(0%)"
                : isMicDisabled
                ? "grayscale(80%)"
                : "grayscale(40%)",
            }}
          />
          <p className="text-base sm:text-lg font-medium text-white text-center mt-2">
            {isRecording
              ? "Nagre-record... Magsalita na!"
              : isMicDisabled
              ? "I-click ang 'Ulitin' para magsalita muli"
              : "I-tap at simulang magsalita"}
          </p>
        </div>

        {/* Transcript Display */}
        {transcript && !isRecording && (
          <div className="text-white text-base sm:text-lg font-bold text-center">
            <span>Sinabi mo: </span>
            <span className="bg-yellow-200 text-black px-2 rounded">
              {transcript}
            </span>
          </div>
        )}

        {/* Submit and Reset Buttons */}
        {showSubmit && !isRecording && (
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs mt-4">
            <button
              className="w-full px-6 py-2 sm:py-3 bg-[#f2d919] border-3 border-black rounded-xl font-bold text-base sm:text-lg shadow-lg active:scale-95 transition-transform"
              onClick={handleSubmit}
            >
              Ipasa
            </button>
            <button
              className="w-full sm:w-auto px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 border-3 border-black rounded-xl font-bold text-base sm:text-lg text-white shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
              onClick={handleReset}
            >
              <RotateCcw size={20} />
              <span>Ulitin</span>
            </button>
          </div>
        )}

        {voice && (
          <audio ref={audioRef} src={voice} style={{ display: "none" }} />
        )}
      </div>

      <CorrectAnswerModal
        isOpen={showCorrect}
        onClose={handleCloseCorrectModal}
      />
      {showWrongOverlay && (
        <WrongAnswerModal
          isOpen={showWrong}
          onClose={handleCloseWrongModal}
          correctAnswer={correctAnswer}
        />
      )}
      <WrongAnswerModal
        isOpen={showTryAgainModal}
        onClose={() => setShowTryAgainModal(false)}
        isTryAgain={true}
      />
    </>
  );
};

export default SituationalQuestionWithVoice;
