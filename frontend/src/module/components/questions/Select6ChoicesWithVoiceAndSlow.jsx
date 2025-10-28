import React from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Mic, Volume2, Turtle } from "lucide-react";

function Select6ChoicesWithVoiceAndSlow() {
  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              Pindutin and Maririnig mo
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 my-4">
          <div className="bg-orange-300 p-2 rounded-xl">
            <Volume2 className="text-black" size={54} />
          </div>
          <div className="bg-orange-300 p-2 rounded-xl">
            <Turtle className="text-black" size={54} />
          </div>
        </div>
        <div className="w-100 flex flex-col gap-5 items-center justify-center mt-4">
          <div className="w-50 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
            Tuo
          </div>
          <div className="w-50 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
            Sud-an
          </div>
          <div className="w-50 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
            Balay
          </div>
          <div className="w-50 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
            Utan
          </div>
          <div className="w-50 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
            Uwel
          </div>
          <div className="w-50 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2">
            Wala
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Select6ChoicesWithVoiceAndSlow;
