import React from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Mic, Volume2 } from "lucide-react";
import Microphone from "../../../assets/Microphone.png";
import PageHeaderLayout from "../../components/PageHeaderLayout";

function SpeechMicWithVoice() {
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
        <div className="flex items-center gap-4 my-4">
          <Volume2 className="text-white" size={60} />
          <p className="text-4xl font-semibold text-white">PERA</p>
        </div>
        {/* <div>
          <Mic className="text-white" size={120} />
        </div> */}
        <div>
          <img className="my-5" src={Microphone} alt="Microphone" />
          <p className="text-lg font-medium text-white">
            I-tap at simulang magsalita
          </p>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default SpeechMicWithVoice;
