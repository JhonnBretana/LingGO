import React from "react";
import SpeakerIcon2 from "../../assets/speakerIcon2.png";

function VoiceCharacterGrid({ selectedVoice, onSelectVoice }) {
  const voices = [
    { id: 1, label: "Napulo" },
    { id: 2, label: "Usa" },
    { id: 3, label: "Unum" },
    { id: 4, label: "Tulo" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto px-8">
      {voices.map((voice) => (
        <button
          key={voice.id}
          onClick={() => onSelectVoice(voice.id)}
          className={`flex items-center justify-start gap-10 px-8 py-1 rounded-2xl border-3 transition-all ${
            selectedVoice === voice.id
              ? "bg-yellow-400 border-yellow-600"
              : "bg-white border-gray-300"
          }`}
        >
          <img src={SpeakerIcon2} alt="speaker" className="h-15 w-10" />
          <span className={`font-bold text-lg ${
            selectedVoice === voice.id
              ? "text-gray-800"
              : "text-black"
          }`}>{voice.label}</span>
        </button>
      ))}
    </div>
  );
}

export default VoiceCharacterGrid;