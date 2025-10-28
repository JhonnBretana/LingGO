import React from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Mic, Volume2 } from "lucide-react";
import ChickenLitte from "../../../assets/Chickenlittle.png";

function QuestionWith3Choices() {
  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-80 mb-4">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-medium">Alin sa mga sumusunod ang Kanan?</p>
          </div>
        </div>

        <div className="w-100 flex flex-col gap-5 items-center justify-center mt-4">
          <div className="w-60 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
            <img
              src={ChickenLitte}
              alt="Chicken Little"
              className="w-25 mx-auto"
            />
            <p>Tuo</p>
          </div>
          <div className="w-60 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
            <img
              src={ChickenLitte}
              alt="Chicken Little"
              className="w-25 mx-auto"
            />
            <p>Bugas</p>
          </div>
          <div className="w-60 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
            <img
              src={ChickenLitte}
              alt="Chicken Little"
              className="w-25 mx-auto"
            />
            <p>Wala</p>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default QuestionWith3Choices;
