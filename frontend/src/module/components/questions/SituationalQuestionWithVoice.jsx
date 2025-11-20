import React, { useState, useRef } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import Microphone from "../../../assets/Microphone.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";
import { Volume2, RotateCcw } from "lucide-react";
import Info from "../../../assets/Info_button.png";

function SituationQuestionWithVoice({
  question,
  situation,
  characterImage,
  ConvoImage,
  characterName,
  onCorrectAnswer,
  onWrongAnswer,
  showWrongOverlay = true,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const [showTryAgainModal, setShowTryAgainModal] = useState(false);
  const [useTextInput, setUseTextInput] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleReset = () => {
    setTranscript("");
    setTextAnswer("");
    setShowSubmit(false);
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        // Ignore if already stopped
      }
      recognitionRef.current = null;
    }
  };

  const handleInfoClick = () => {
    setUseTextInput(!useTextInput);
    handleReset();
  };

  const handleTextChange = (e) => {
    setTextAnswer(e.target.value);
    setShowSubmit(e.target.value.trim().length > 0);
  };

  const handleMicClick = () => {
    // Don't allow clicking mic if transcript already exists (unless reset is clicked)
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

    // If currently recording, stop it
    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        // Ignore if already stopped
      }
      return;
    }

    // Start new recording
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

    const userInput = useTextInput
      ? textAnswer.trim().toLowerCase()
      : (transcript || "").trim().toLowerCase();

    const correct =
      typeof question?.correctAnswer === "string"
        ? question.correctAnswer
        : question?.correctAnswer?.value || "";
    const correctNormalized = (correct || "").trim().toLowerCase();

    if (userInput && userInput === correctNormalized) {
      setShowCorrect(true);
    } else {
      if (showWrongOverlay) {
        setShowWrong(true);
      } else {
        setTranscript("");
        setTextAnswer("");
        setShowSubmit(false);
        setShowTryAgainModal(true);
      }
    }

    setShowSubmit(false);
  };

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setTranscript("");
    setTextAnswer("");
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setTranscript("");
    setTextAnswer("");
    if (onWrongAnswer) {
      onWrongAnswer();
    }
  };

  // Check if mic should be disabled
  const isMicDisabled = transcript && !isRecording;

  return (
    <>
      <div className="flex flex-col items-center justify-start px-4 pt-2 gap-4 overflow-y-auto h-full">
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

        <div className="flex flex-row items-center gap-2 w-full max-w-md">
          <div className="flex flex-col relative">
            <img src={characterImage} alt="" />
          </div>
        </div>
        <div
          className="font-medium text-right text-xl text-white drop-shadow-[2px_3px_1px_black]  w-full max-w-md px-16"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
        >
          {characterName}
        </div>
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <span
              className="font-medium text-center text-xl text-black drop-shadow-[2px_2px_0px_white]  w-full max-w-md px-10"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: "bold",
              }}
            >
              Pakinggan at bigkasin.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center w-full">
          <button onClick={handleInfoClick} className="flex-shrink-0">
            <img src={Info} alt="Info" className="w-10 h-10" />
          </button>
          <button
            onClick={handlePlay}
            disabled={!question?.voice}
            className="flex-shrink-0"
          >
            <Volume2 className="text-white" size={40} />
          </button>
          <p className="text-2xl sm:text-4xl font-semibold text-white text-center">
            {question?.question}
          </p>
        </div>

        {useTextInput ? (
          <form
            className="w-full max-w-xs sm:max-w-sm flex flex-col items-center px-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="I-type ang sagot"
              value={textAnswer}
              onChange={handleTextChange}
              className="w-full bg-white text-black text-center font-bold mb-4 py-2 sm:py-3 px-4 rounded-full border-3 border-black text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <img
                className={`${
                  isMicDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
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

            {transcript && !isRecording && (
              <div className="text-white text-base sm:text-lg font-bold text-center">
                <span>Sinabi mo: </span>
                <span className="bg-yellow-200 text-black px-2 rounded">
                  {transcript}
                </span>
              </div>
            )}
          </>
        )}

        <div className="flex flex-row items-center gap-2 w-full max-w-md">
          <div className="flex flex-col relative">
            <img src={ConvoImage} alt="" />
          </div>
        </div>

        {showSubmit && (
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs mb-5">
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
      {showWrongOverlay && (
        <WrongAnswerModal
          isOpen={showWrong}
          onClose={handleCloseWrongModal}
          correctAnswer={question.correctAnswer}
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

export default SituationQuestionWithVoice;
