import React, { useMemo } from "react";
import Arrow from "../../assets/Arrow.png";

function WrongAnswerModal({ isOpen, onClose, correctAnswer }) {
    const characterImages = [
        "/assets/ImageChoices/UnifGirl1.png",
        "/assets/ImageChoices/UnifGirl2.png",
        "/assets/ImageChoices/UnifGirl3.png"
    ];

    const randomImage = useMemo(() => {
        if (!isOpen) return "";
        const randomIndex = Math.floor(Math.random() * characterImages.length);
        return characterImages[randomIndex];
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-end justify-start z-50 bg-transparent"
            onClick={onClose}
        >
            {/* Bottom full-width card */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full bg-white/95 border-t-4 border-orange-500 rounded-t-3xl shadow-2xl p-6 pb-16 text-center animate-slide-up sm:rounded-t-[2rem]"
            >
                {/* “MALI” header */}
                <h2 className="text-2xl font-extrabold text-orange-500 mb-4 tracking-wide">
                    MALI
                </h2>

                {/* Character + Text Row */}
                <div className="flex items-center justify-center gap-4 flex-wrap sm:flex-nowrap">
                    <img
                        src={randomImage}
                        alt="Wrong"
                        className="w-24 h-24 object-contain"
                    />
                    <div className="text-left">
                        <p className="text-base font-semibold mb-2">Tamang Sagot:</p>
                        <p className="text-lg font-bold border-b-4 border-black inline-block pb-1">
                            {correctAnswer || "—"}
                        </p>
                    </div>
                </div>

                {/* Arrow icon (bottom-right corner) */}
                <img
                    src={Arrow} // ✅ use imported Arrow image
                    alt="Next"
                    className="absolute right-6 bottom-4 w-12 h-12 object-contain cursor-pointer hover:scale-105 transition-transform"
                    onClick={onClose}
                />
            </div>

            {/* Animation */}
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
            `}</style>
        </div>
    );
}

export default WrongAnswerModal;
