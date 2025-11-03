import React, { useMemo } from "react";

function CorrectAnswerModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-white/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <img
          src={randomImage}
          alt="Correct"
          className="max-w-md w-full object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
}

export default CorrectAnswerModal;
