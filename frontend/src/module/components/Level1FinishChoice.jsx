import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import PageHeaderLayout from "../components/PageHeaderLayout";
import StarLocked1 from "/assets/ImageChoices/Starlocked1.png";
import StarLocked2 from "/assets/ImageChoices/Starlocked2.png";
import StarLocked3 from "/assets/ImageChoices/Starlocked3.png";
import StarUnlocked2 from "/assets/ImageChoices/StarUnlocked2.png";
import Star1Finished from "/assets/ImageChoices/level1finish.png";
import Star2Finished from "/assets/ImageChoices/level2finish.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import questions from "../../constant/questions_data.js";
import questionsLevel2 from "../../constant/questionsl2_data.js";

function LevelSelection1Finished() {
  const navigate = useNavigate();
  const [level1Completed, setLevel1Completed] = useState(false);
  const [level2Unlocked, setLevel2Unlocked] = useState(false);
  const [level2Completed, setLevel2Completed] = useState(false);

  useEffect(() => {
    const checkLevelCompletion = async () => {
      const userId = localStorage.getItem("linggoUserId");
      if (!userId) return;
      
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;
      
      const data = userSnap.data();
      const level1Questions = data.Level1Questions || {};
      const level1ReviewCompleted = data.Level1ReviewCompleted || false;
      const level2Questions = data.Level2Questions || {};
      const level2ReviewCompleted = data.Level2ReviewCompleted || false;
      
      // Check Level 1 completion
      const allLevel1QuestionsAnswered = questions.every((q) =>
        ["Correct", "Wrong"].includes(level1Questions[`Level1Question${q.id}`])
      );
      
      if (!allLevel1QuestionsAnswered) {
        setLevel1Completed(false);
        setLevel2Unlocked(false);
        setLevel2Completed(false);
        return;
      }
      
      // Find Level 1 wrong questions
      const wrongQuestionsLevel1 = questions.filter(
        (q) => level1Questions[`Level1Question${q.id}`] === "Wrong"
      );
      
      // Mark Level 1 as completed
      setLevel1Completed(true);
      
      // Unlock Level 2 if Level 1 is completed
      if (wrongQuestionsLevel1.length === 0 || level1ReviewCompleted) {
        setLevel2Unlocked(true);
        
        // Check Level 2 completion
        const allLevel2QuestionsAnswered = questionsLevel2.every((q) =>
          ["Correct", "Wrong"].includes(level2Questions[`Level2Question${q.id}`])
        );
        
        if (allLevel2QuestionsAnswered) {
          const wrongQuestionsLevel2 = questionsLevel2.filter(
            (q) => level2Questions[`Level2Question${q.id}`] === "Wrong"
          );
          
          // Mark Level 2 as completed if all correct or review completed
          if (wrongQuestionsLevel2.length === 0 || level2ReviewCompleted) {
            setLevel2Completed(true);
          }
        }
      } else {
        setLevel2Unlocked(false);
        setLevel2Completed(false);
      }
    };
    
    checkLevelCompletion();
  }, []);

  const levels = [
    {
      number: 1,
      title: "MGA SALITA",
      locked: false,
      starImage: level1Completed ? Star1Finished : StarLocked1,
    },
    {
      number: 2,
      title: "MGA PARIRALA",
      locked: !level2Unlocked,
      starImage: level2Completed ? Star2Finished : (level2Unlocked ? StarUnlocked2 : StarLocked2),
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
        // Pass level 1 info to see the score
        navigate("/level1-return", { state: { level: 1 } });
      } else if (level.number === 2) {
        // If Level 2 is completed, go to see score with level 2 info
        if (level2Completed) {
          navigate("/level1-return", { state: { level: 2 } });
        } else {
          // If not completed, go to level 2 quiz
          navigate("/level-two");
        }
      }
    }
  };

  return (
    <BackgroundLayout>
      {/* Changed to allow scrolling on mobile/tablet */}
      <div className="overflow-auto w-full min-h-screen flex flex-col">
        <PageHeaderLayout />
        <div className="flex-1 flex flex-col items-center justify-center lg:justify-start text-center px-3 py-8 lg:pt-12">
          <div
            className="flex flex-col lg:flex-row justify-center items-center 
                          gap-8 lg:gap-8 xl:gap-12 
                          w-full max-w-[95rem] px-2 pb-12"
          >
            {levels.map((level) => (
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

export default LevelSelection1Finished;