import React, { useState, useRef } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import Microphone from "../../../assets/Microphone.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";

function SpeechMicWithVoice({ question }) {
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

  const handleCloseModals = () => {
    setShowCorrect(false);
    setShowWrong(false);
    setTranscript("");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 sm:gap-5 px-4 py-6">
        <div className="relative w-full max-w-[280px] xs:w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full xs:w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              {"Pakinggan at Bigkasin"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 my-4">
          <p className="text-4xl font-semibold text-white">
            {question?.question}
          </p>
        </div>

        <div>
          <img
            className={`my-5 cursor-pointer ${isRecording ? "animate-pulse" : ""}`}
            src={Microphone}
            alt="Microphone"
            onClick={handleMicClick}
            style={{ filter: isRecording ? "grayscale(0%)" : "grayscale(40%)" }}
          />
          <p className="text-lg font-medium text-white">
            {isRecording
              ? "Nagre-record... Magsalita na!"
              : "I-tap at simulang magsalita"}
          </p>
        </div>

        {transcript && (
          <div className="text-white text-lg font-bold mt-2 text-center">
            <span>Sinabi mo: </span>
            <span className="bg-yellow-200 text-black px-2 rounded">
              {transcript}
            </span>
          </div>
        )}

        {showSubmit && (
          <button
            className="w-50 mt-5 px-4 py-2 bg-[#f2d919] border-3 border-black rounded-xl font-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>

      <CorrectAnswerModal isOpen={showCorrect} onClose={handleCloseModals} />
      <WrongAnswerModal
        isOpen={showWrong}
        onClose={handleCloseModals}
        correctAnswer={question.correctAnswer}
      />
    </>
  );
}

export default SpeechMicWithVoice;