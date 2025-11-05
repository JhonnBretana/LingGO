import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import PageHeaderLayout from "../components/PageHeaderLayout"; // Import header
import Star from "../../assets/Star2.png";
import Arrow from "/assets/ImageChoices/arrow2.png";

function LevelOne() {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate("/level1");
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col min-h-screen">
        {/* Use the reusable header */}
        <PageHeaderLayout />

        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem]">
            <img
              src={Star}
              alt="Star"
              className="w-full h-full drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Back arrow button - positioned higher */}
        <div className="flex items-center justify-end px-4 pb-8">
          <button
            onClick={handleArrowClick}
            className="flex-shrink-0 transition-transform hover:scale-110 active:scale-95"
          >
            <img
              src={Arrow}
              alt="Back Arrow"
              className="h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-20"
            />
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default LevelOne;