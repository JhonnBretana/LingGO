import React, { useState, useRef } from "react";
import BackgroundLayout from "../components/BackgroundLayout";
import PageHeaderLayout from "../components/PageHeaderLayout";
import Speaker from "../../assets/speaker.png";
import Turtle from "../../assets/turtle.png";
import { SOUND_DATA } from "../../constant/sound_data";

function Voice_SlowGame() {
  const [selectedSound, setSelectedSound] = useState(null);
  const audioRef = useRef(null);

  const handlePlaySound = (sound) => {
    setSelectedSound(sound.id);
    if (audioRef.current) {
      audioRef.current.src = sound.audio;
      audioRef.current.play();
    }
  };

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col justify-center items-center text-white text-2xl font-bold gap-8 pt-10 mt-20">
        <div>
          <span>I-type ang iyong narinig</span>
        </div>

        <div className="flex align-center justify-center gap-8 w-100">
          <button
            onClick={() => handlePlaySound(SOUND_DATA[0])}
            className={
              "w-24 h-24 rounded-lg transition-all transform hover:scale-110 flex items-center justify-center"
            }
          >
            <img src={Speaker} alt="Play Sound" className="h-20 w-50" />
          </button>
          <div className="w-24 h-24 flex items-center justify-center">
            <img src={Turtle} alt="Slow Speed" className="h-20 w-50" />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-72 mx-auto">
          {/* Sound*/}
          <input
            type="text"
            placeholder="(TYPE)"
            className="w-full bg-white text-black text-center font-bold py-2 rounded-full border-3 border-black text-lg focus:outline-none"
          />
        </div>

        <div>
          <button
            onClick={() => navigate("/gradesectiondetail")}
            className="w-50 mt-5 bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
          >
            Sumunod
          </button>
        </div>

        <audio ref={audioRef} />
      </div>
    </BackgroundLayout>
  );
}

export default Voice_SlowGame;
