import React from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Mic, Volume2, Turtle } from "lucide-react";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function TypeWithVoiceAndSlow() {
  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">
              I-Type and iyong narinig
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 my-4">
          <div className="bg-orange-300 p-2 rounded-xl">
            <Volume2 className="text-black" size={80} />
          </div>
          <div className="bg-orange-300 p-2 rounded-xl">
            <Turtle className="text-black" size={80} />
          </div>
        </div>
        <div className="w-100 flex flex-col items-center my-4">
          <input
            type="text"
            placeholder="(TYPE)"
            className="w-50 bg-white text-black text-center font-bold py-2 rounded-full border-3 border-black text-lg focus:outline-none"
          />
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default TypeWithVoiceAndSlow;
