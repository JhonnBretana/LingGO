import React, { useMemo, useEffect, useRef } from "react";
import RightSound from "../../assets/RightSound.mp3";

function CorrectAnswerModal({ isOpen, onClose }) {
  const audioRef = useRef(null);

  const characterImages = [
    "/assets/ImageChoices/Unifboy1.png",
    "/assets/ImageChoices/Unifboy2.png",
    "/assets/ImageChoices/Unifboy3.png",
  ];

  const randomImage = useMemo(() => {
    if (!isOpen) return "";
    const randomIndex = Math.floor(Math.random() * characterImages.length);
    return characterImages[randomIndex];
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.log("Audio play failed:", err);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <audio ref={audioRef} src={RightSound} preload="auto" />
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-6 p-6">
          <img
            src={randomImage}
            alt="Correct"
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-2xl"
          />
          <button
            onClick={onClose}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            Sunod
          </button>
        </div>
      </div>
    </>
  );
}

export default CorrectAnswerModal;