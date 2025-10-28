import React from "react";
import BackgroundLayout from "../BackgroundLayout";
import QuestionsBar from "../../../assets/clickbar.png";
import { Mic, Volume2, Turtle } from "lucide-react";
import PageHeaderLayout from "../../components/PageHeaderLayout";
import ChickenLitte from "../../../assets/Chickenlittle.png";

function SixChoicesWithVoice() {
  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex items-center gap-4 my-4">
          <Volume2 className="text-white" size={60} />
          <p className="text-4xl font-semibold text-white">PERA</p>
        </div>
        <div className="w-100 flex flex-row gap-3 items-center justify-center mt-4">
          <div className="flex flex-col gap-4">
            <div className="w-40 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
              <img
                src={ChickenLitte}
                alt="Chicken Little"
                className="w-25 mx-auto"
              />
            </div>
            <div className="w-40 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
              <img
                src={ChickenLitte}
                alt="Chicken Little"
                className="w-25 mx-auto"
              />
            </div>
            <div className="w-40 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
              <img
                src={ChickenLitte}
                alt="Chicken Little"
                className="w-25 mx-auto"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-40 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
              <img
                src={ChickenLitte}
                alt="Chicken Little"
                className="w-25 mx-auto"
              />
            </div>
            <div className="w-40 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
              <img
                src={ChickenLitte}
                alt="Chicken Little"
                className="w-25 mx-auto"
              />
            </div>
            <div className="w-40 text-center  bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2">
              <img
                src={ChickenLitte}
                alt="Chicken Little"
                className="w-25 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default SixChoicesWithVoice;
