import React from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Mic, Volume2, Turtle } from "lucide-react";

function MatchingWordsWithWords() {
  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              Pindutin ang Magkapares
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-5 items-center justify-center mt-4">
            <div className="w-40 text-center bg-blue-400 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Tuo
            </div>
            <div className="w-40 text-center bg-yellow-300 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Sud-an
            </div>
            <div className="w-40 text-center bg-pink-300 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Balay
            </div>
            <div className="w-40 text-center bg-red-400 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Utan
            </div>
            <div className="w-40 text-center bg-purple-500 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Uwel
            </div>
          </div>
          <div className="flex flex-col gap-5 items-center justify-center mt-4">
            <div className="w-40 text-center bg-blue-400 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Tuo
            </div>
            <div className="w-40 text-center bg-yellow-300 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Sud-an
            </div>
            <div className="w-40 text-center bg-pink-300 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Balay
            </div>
            <div className="w-40 text-center bg-red-400 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Utan
            </div>
            <div className="w-40 text-center bg-purple-500 text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
              Uwel
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default MatchingWordsWithWords;
