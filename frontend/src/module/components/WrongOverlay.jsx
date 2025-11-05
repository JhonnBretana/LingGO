import React, { useMemo, useEffect, useRef } from "react";
import Arrow from "../../assets/Arrow.png";
import WrongSound from "../../assets/WrongSound.mp3";

function WrongAnswerModal({
  isOpen,
  onClose,
  correctAnswer,
  isTryAgain = false,
}) {
  const audioRef = useRef(null);

  const characterImages = [
    "/assets/ImageChoices/UnifGirl1.png",
    "/assets/ImageChoices/Unifgirl3.png",
  ];

  const randomImage = useMemo(() => {
    if (!isOpen) return "";
    const randomIndex = Math.floor(Math.random() * characterImages.length);
    return characterImages[randomIndex];
  }, [isOpen]);

  const formattedAnswer = useMemo(() => {
    if (!correctAnswer) return "—";
    if (Array.isArray(correctAnswer)) {
      return correctAnswer;
    }
    return correctAnswer;
  }, [correctAnswer]);

  const isArrayAnswer = Array.isArray(correctAnswer);

  // Play sound when modal opens
  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch(err => {
        console.log("Audio play failed:", err);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // If in review mode, show Try Again modal
  if (isTryAgain) {
    return (
      <>
        <audio ref={audioRef} src={WrongSound} preload="auto" />
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl border-2 border-black">
            <h2 className="text-2xl font-bold text-black text-center">
              Subukan muli!
            </h2>
            <p className="text-lg text-black text-center mb-4">
              Pakiulit po ang pagsagot sa tanong.
            </p>
            <button
              className="px-6 py-2 bg-[#f2d919] text-black font-bold rounded-xl border-2 border-black hover:bg-yellow-300 transition-all"
              onClick={onClose}
            >
              Okay
            </button>
          </div>
        </div>
      </>
    );
  }

  // Default wrong answer modal
  return (
    <>
      <audio ref={audioRef} src={WrongSound} preload="auto" />
      <div className="fixed inset-0 flex items-end justify-start z-50 bg-black/30">
        <div className="relative w-full bg-white/95 border-t-4 border-orange-500 rounded-t-3xl shadow-2xl p-6 pb-16 text-center animate-slide-up sm:rounded-t-[2rem]">
          <h2 className="text-2xl font-extrabold text-orange-500 mb-4 tracking-wide">
            MALI
          </h2>

          <div className="flex items-center justify-center gap-4 flex-wrap sm:flex-nowrap">
            <img
              src={randomImage}
              alt="Wrong"
              className="w-24 h-24 object-contain"
            />
            <div className="text-left max-w-md">
              <p className="text-base font-semibold mb-2">Tamang Sagot:</p>
              {isArrayAnswer ? (
                <div className="space-y-2">
                  {formattedAnswer.map((pair, index) => (
                    <div
                      key={index}
                      className="text-sm font-bold border-b-2 border-black pb-1"
                    >
                      {pair.word1} ↔ {pair.word2}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg font-bold border-b-4 border-black inline-block pb-1">
                  {formattedAnswer}
                </p>
              )}
            </div>
          </div>

          <div className="absolute right-6 bottom-4">
            <img
              src={Arrow}
              alt="Next"
              className="w-14 h-14 object-contain cursor-pointer animate-bounce-subtle hover:scale-110 active:scale-95 transition-transform drop-shadow-lg"
              onClick={onClose}
            />
          </div>
        </div>

        <style>{`
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.35s ease-out;
                }
                @keyframes bounce-subtle {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s ease-in-out infinite;
                }
            `}</style>
      </div>
    </>
  );
}

export default WrongAnswerModal;