import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import PageHeaderLayout from "../components/PageHeaderLayout";
import ChoiceGrid from "../components/ChoiceGrid";
import SpeakerIcon from "../../assets/speakerIcon.png";

function Choice_Voice() {
  const [selectedChoice, setSelectedChoice] = useState(null);

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div>
        <div className="flex align-center justify-center mt-10 gap-2">
          <div>
            <button>
              <img src={SpeakerIcon} alt="" className="h-25" />
            </button>
          </div>

          <div className="ml-10 mt-5 text-white text-3xl font-bold">
            <span className="">Kanin</span>
          </div>
        </div>

        <ChoiceGrid 
          selectedChoice={selectedChoice} 
          onSelectChoice={setSelectedChoice}
        />
      </div>
    </BackgroundLayout>
  );
}

export default Choice_Voice;