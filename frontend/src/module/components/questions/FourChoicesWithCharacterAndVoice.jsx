import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../BackgroundLayout";
import PageHeaderLayout from "../PageHeaderLayout";
import VoiceCharacterGrid from "../VoiceCharacterGrid";
import Char from "../../../assets/char.png";
import QuestionsBar from "../../../assets/clickbar.png";
import { Mic, Volume2 } from "lucide-react";

function FourChoicesWithCharacterAndVoice() {
  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">Pakinggan at Bigkasin</span>
          </div>
        </div>
        <div>
          <img src={Char} alt="" />
        </div>
        <div className="w-100 flex flex-col gap-5 items-center justify-center mt-4">
          <div className="w-70 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 flex items-center justify-center gap-2">
            <Volume2 className="mr-2" />
            <p className="mb-0">Bigas</p>
          </div>
          <div className="w-70 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 flex items-center justify-center gap-2">
            <Volume2 className="mr-2" />
            <p>Ulam</p>
          </div>
          <div className="w-70 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 flex items-center justify-center gap-2">
            <Volume2 className="mr-2" />
            <p>Gulay</p>
          </div>
          <div className="w-70 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 flex items-center justify-center gap-2">
            <Volume2 className="mr-2" />
            <p>Kanin</p>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default FourChoicesWithCharacterAndVoice;
