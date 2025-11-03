import React, { useState, useRef } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import Microphone from "../../../assets/Microphone.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function SpeechMicWithVoice({ question, onCorrectAnswer }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const recognitionRef = useRef(null);

  const handleMicClick = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
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

    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userSpoken = (transcript || "").trim().toLowerCase();
    const correct =
      typeof question?.correctAnswer === "string"
        ? question.correctAnswer
        : question?.correctAnswer?.value || "";
    const correctNormalized = (correct || "").trim().toLowerCase();

    if (userSpoken && userSpoken === correctNormalized) {
      setShowCorrect(true);
    } else {
      setShowWrong(true);
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
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start px-4 pt-2 gap-4 overflow-hidden h-full">
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <span className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-center leading-tight">
              Pakinggan at Bigkasin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-2xl sm:text-4xl font-semibold text-white">
            {question?.question}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            className={`cursor-pointer ${isRecording ? "animate-pulse" : ""}`}
            src={Microphone}
            alt="Microphone"
            onClick={handleMicClick}
            style={{ filter: isRecording ? "grayscale(0%)" : "grayscale(40%)" }}
          />
          <p className="text-base sm:text-lg font-medium text-white text-center mt-2">
            {isRecording
              ? "Nagre-record... Magsalita na!"
              : "I-tap at simulang magsalita"}
          </p>
        </div>

        {transcript && (
          <div className="text-white text-base sm:text-lg font-bold text-center">
            <span>Sinabi mo: </span>
            <span className="bg-yellow-200 text-black px-2 rounded">
              {transcript}
            </span>
          </div>
        )}

        {showSubmit && (
          <button
            className="w-full max-w-xs px-6 py-2 sm:py-3 bg-[#f2d919] border-3 border-black rounded-xl font-bold text-base sm:text-lg shadow-lg active:scale-95 transition-transform"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>

      <CorrectAnswerModal isOpen={showCorrect} onClose={handleCloseCorrectModal} />
      <WrongAnswerModal
        isOpen={showWrong}
        onClose={handleCloseWrongModal}
        correctAnswer={question.correctAnswer}
      />
    </>
  );
}

export default SpeechMicWithVoice;