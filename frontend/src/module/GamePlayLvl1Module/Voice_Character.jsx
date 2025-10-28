import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import PageHeaderLayout from "../components/PageHeaderLayout";
import VoiceCharacterGrid from "../components/VoiceCharacterGrid";
import Char from "../../assets/char.png";

function Voice_Character() {
  const [selectedVoice, setSelectedVoice] = useState(null);

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col justify-center items-center text-white text-2xl font-bold gap-8 pt-10 mt-5">
        <div>
          <span>I-type ang iyong narinig</span>
        </div>

        <div>
            <img src={Char} alt="" />
        </div>

        <VoiceCharacterGrid 
          selectedVoice={selectedVoice} 
          onSelectVoice={setSelectedVoice}
        />
      </div>
    </BackgroundLayout>
  );
}

export default Voice_Character;