import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import PageHeaderLayout from "../components/PageHeaderLayout";
import StarLocked1 from "/assets/ImageChoices/Starlocked1.png";
import StarLocked2 from "/assets/ImageChoices/Starlocked2.png";
import StarLocked3 from "/assets/ImageChoices/Starlocked3.png";
import StarUnlocked2 from "/assets/ImageChoices/StarUnlocked2.png";
import Star1Finished from "/assets/ImageChoices/Star1Finished.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

function LevelSelection() {
  const navigate = useNavigate();
  const [level2Unlocked, setLevel2Unlocked] = useState(false);

  useEffect(() => {
    const checkLevel1Completion = async () => {
      const userId = localStorage.getItem("linggoUserId");
      if (!userId) return;
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;
      const data = userSnap.data();
      const wrongQuestionsAnswered = data.WrongQuestionsAnswered || {};
      // Get all Level1Question keys
      const level1Keys = Object.keys(wrongQuestionsAnswered).filter((k) =>
        k.startsWith("Level1Question")
      );
      // If all Level1Question keys are true and there is at least one Level1Question
      if (
        level1Keys.length > 0 &&
        level1Keys.every((k) => wrongQuestionsAnswered[k] === true)
      ) {
        setLevel2Unlocked(true);
      }
    };
    checkLevel1Completion();
  }, []);

  const levels = [
    {
      number: 1,
      title: "MGA SALITA",
      locked: false,
      starImage: level2Unlocked ? Star1Finished : StarLocked1,
    },
    {
      number: 2,
      title: "MGA PARIRALA",
      locked: !level2Unlocked,
      starImage: level2Unlocked ? StarUnlocked2 : StarLocked2,
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
      } else if (level.number === 2) {
        navigate("/level-two");
      }
    }
  };

  return (
    <BackgroundLayout>
      {/* Changed h-screen to min-h-screen to allow scrolling */}
      <div className="overflow-auto w-full min-h-screen flex flex-col">
        <PageHeaderLayout />
        <div className="flex-1 flex flex-col items-center justify-center lg:justify-start text-center px-3 py-8 lg:pt-12">
          <div
            className="flex flex-col lg:flex-row justify-center items-center 
                          gap-8 lg:gap-8 xl:gap-12 
                          w-full max-w-[95rem] px-2 pb-12"
          >
            {levels.map((level, idx) => (
              <button
                key={level.number}
                onClick={() => handleLevelClick(level)}
                className={`relative w-64 h-64 flex-shrink-0 
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
                  className="w-full h-full object-contain drop-shadow-lg
                    group-hover:drop-shadow-2xl group-hover:brightness-110
                    transition-all duration-300"
                />
                <p
                  className="absolute -bottom-10
                    left-0 right-0 text-center text-black font-black 
                    text-lg
                    tracking-wide"
                >
                  {level.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default LevelSelection;
