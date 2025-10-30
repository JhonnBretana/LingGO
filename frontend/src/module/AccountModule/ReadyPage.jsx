import React from "react";
import BackgroundLayout from "../components/BackgroundLayout";
import BirdMascot from "../../assets/Chickenlittle.png";
import CardWithFlag from "../../assets/clickbar.png";
import { useNavigate } from "react-router-dom";

function ReadyPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log("Magpatuloy clicked");
    // Add your navigation logic here
    navigate("/level1");
  };

  return (
    <BackgroundLayout>
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center min-h-screen px-4 overflow-hidden">
        {/* Left Column - Title and Button */}
        <div className="flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20 flex-1">
          {/* Title */}
          <h1
            className="text-white font-extrabold text-center
                         text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                         px-2 leading-tight"
            style={{
              WebkitTextStroke: "2px black",
              textShadow: "3px 3px 0px rgba(0,0,0,0.3)",
            }}
          >
            Handa kana ba,
            <br />
            Juan?
          </h1>

          {/* Continue Button */}
          <div className="relative group">
            <img
              src={CardWithFlag}
              alt="Continue Button Background"
              className="w-64 xs:w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] h-auto
                             drop-shadow-xl
                             transition-all duration-300 ease-out
                             group-hover:scale-110 group-hover:drop-shadow-2xl group-hover:brightness-105
                             group-active:scale-100 group-active:translate-y-1
                             cursor-pointer"
            />
            <button
              onClick={handleContinue}
              className="absolute inset-0 w-full h-full
                             text-black font-black text-center
                             text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
                             flex items-center justify-center
                             cursor-pointer
                             uppercase tracking-wide"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              MAGPATULOY
            </button>
          </div>
        </div>

        {/* Right Column - Bird Mascot */}
        <div className="flex items-center justify-center flex-1">
          <img
            src={BirdMascot}
            alt="Lingo Bird Mascot"
            className="w-48 xs:w-56 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] h-auto
                         drop-shadow-2xl
                         animate-bounce"
            style={{
              animationDuration: "2s",
            }}
          />
        </div>
      </div>

      {/* Mobile Layout - FIXED */}
      <div className="flex md:hidden flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
        <div className="flex flex-col items-center gap-10 max-w-md w-full">
          {/* Title */}
          <h1
            className="text-white font-extrabold text-center
                         text-4xl leading-tight"
            style={{
              WebkitTextStroke: "2px black",
              textShadow: "3px 3px 0px rgba(0,0,0,0.3)",
            }}
          >
            Handa kana ba,
            <br />
            Juan?
          </h1>

          {/* Bird Mascot */}
          <img
            src={BirdMascot}
            alt="Lingo Bird Mascot"
            className="w-64 h-auto drop-shadow-2xl animate-bounce"
            style={{
              animationDuration: "2s",
            }}
          />

          {/* Continue Button */}
          <div className="relative group w-full">
            <img
              src={CardWithFlag}
              alt="Continue Button Background"
              className="w-full h-auto
                             drop-shadow-xl
                             transition-all duration-300 ease-out
                             group-hover:scale-105 group-hover:drop-shadow-2xl group-hover:brightness-105
                             group-active:scale-95 group-active:translate-y-1
                             cursor-pointer"
            />
            <button
              onClick={handleContinue}
              className="absolute inset-0 w-full h-full
                             text-black font-black text-center text-xl
                             flex items-center justify-center
                             cursor-pointer uppercase tracking-wide"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              MAGPATULOY
            </button>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default ReadyPage;
