import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import PageHeaderLayout from "../components/PageHeaderLayout"; // Import header
import StarLocked1 from "/assets/ImageChoices/Starlocked1.png";
import StarLocked2 from "/assets/ImageChoices/Starlocked2.png";
import StarLocked3 from "/assets/ImageChoices/Starlocked3.png";

function LevelSelection() {
  const navigate = useNavigate();

  const levels = [
    {
      number: 1,
      title: "MGA SALITA",
      locked: false,
      starImage: StarLocked1,
    },
    {
      number: 2,
      title: "MGA PARIRALA",
      locked: true,
      starImage: StarLocked2,
    },
    {
      number: 3,
      title: "DISKURSO",
      locked: true,
      starImage: StarLocked3,
    },
  ];

  const handleLevelClick = (level) => {
    if (!level.locked) {
      if (level.number === 1) {
        navigate("/level-one");
      }
    }
  };

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-3 py-8">
        <div
          className="flex flex-col md:flex-row justify-center items-center md:items-center 
                        gap-8 xs:gap-10 sm:gap-12 md:gap-4 lg:gap-8 xl:gap-12 
                        w-full max-w-[95rem] px-2 pb-12"
        >
          {levels.map((level, idx) => (
            <button
              key={level.number}
              onClick={() => handleLevelClick(level)}
              className={`relative w-48 mt-5 xs:w-52 sm:w-60 md:w-44 lg:w-60 xl:w-72 flex-shrink-0 
                transition-all duration-300 ease-in-out
                ${
                  level.locked
                    ? "cursor-not-allowed opacity-90"
                    : "cursor-pointer hover:scale-110 hover:-translate-y-2"
                }
                active:scale-105 active:translate-y-0
                group`}
              disabled={level.locked}
            >
              <img
                src={level.starImage}
                alt={`Star ${level.number}${level.locked ? " - Locked" : ""}`}
                className="w-full h-auto drop-shadow-lg
                  group-hover:drop-shadow-2xl group-hover:brightness-110
                  transition-all duration-300"
              />
              <p
                className="absolute -bottom-8 xs:-bottom-9 sm:-bottom-10 md:-bottom-8 lg:-bottom-10 xl:-bottom-12
                  left-0 right-0 text-center text-black font-black 
                  text-xl xs:text-sm sm:text-base md:text-xs lg:text-base xl:text-lg
                  tracking-wide"
              >
                {level.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default LevelSelection;
