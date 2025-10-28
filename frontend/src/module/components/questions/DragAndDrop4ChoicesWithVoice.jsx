import React from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Mic, Volume2 } from "lucide-react";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function DragAndDrop4ChoicesWithVoice() {
  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">I-Drag ang hinihingi</span>
          </div>
        </div>
        <div className="flex items-center gap-4 my-4">
          <Volume2 className="text-white" size={54} />
          <p className="text-2xl font-bold text-white">BUGAS</p>
        </div>
        <div className="flex items-center gap-4 my-4">
          <div className="border-b-white border-b-4 w-60 pb-2 text-center">
            {/* Drop Here */}
          </div>
        </div>
        <div className="w-100 flex flex-col gap-5 items-center justify-center mt-4">
          <div className="w-80 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
            Bigas
          </div>
          <div className="w-80 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
            Ulam
          </div>
          <div className="w-80 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
            Gulay
          </div>
          <div className="w-80 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
            Kanin
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default DragAndDrop4ChoicesWithVoice;
