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
import Star3Finished from "/assets/ImageChoices/level3finish.png";
import Star3 from "/assets/ImageChoices/star3.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import questions from "../../constant/questions_data.js";
import questionsLevel2 from "../../constant/questionsl2_data.js";
import situational_questions1 from "../../constant/Level3/SituationalQuestion1_data.js";
import situational_questions2 from "../../constant/Level3/SituationalQuestion2_data.js";
import situational_questions3 from "../../constant/Level3/SituationalQuestion3_data.js";

function LevelSelection1Finished() {
  const navigate = useNavigate();
  const [level1Completed, setLevel1Completed] = useState(false);
  const [level2Unlocked, setLevel2Unlocked] = useState(false);
  const [level2Completed, setLevel2Completed] = useState(false);
  const [level3Unlocked, setLevel3Unlocked] = useState(false);
  const [level3Completed, setLevel3Completed] = useState(false);

  // Combine all Level 3 questions
  const questionsLevel3 = [
    ...situational_questions1,
    ...situational_questions2,
    ...situational_questions3,
  ];

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
      const level3Questions = data.Level3Questions || {};
      const situation1ReviewCompleted = data.Level3Situation1ReviewCompleted || false;
      const situation2ReviewCompleted = data.Level3Situation2ReviewCompleted || false;
      const situation3ReviewCompleted = data.Level3Situation3ReviewCompleted || false;
      
      // Check Level 1 completion
      const allLevel1QuestionsAnswered = questions.every((q) =>
        ["Correct", "Wrong"].includes(level1Questions[`Level1Question${q.id}`])
      );
      
      if (!allLevel1QuestionsAnswered) {
        setLevel1Completed(false);
        setLevel2Unlocked(false);
        setLevel2Completed(false);
        setLevel3Unlocked(false);
        setLevel3Completed(false);
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
            setLevel3Unlocked(true);
            
            // Check Level 3 completion
            const allLevel3QuestionsAnswered = questionsLevel3.every((q) =>
              ["Correct", "Wrong"].includes(level3Questions[`Level3Question${q.id}`])
            );
            
            if (allLevel3QuestionsAnswered) {
              const wrongQuestionsLevel3 = questionsLevel3.every((q) => 
                level3Questions[`Level3Question${q.id}`] === "Correct"
              );
              
              // Check if all situations with wrong answers have been reviewed
              const wrongInSituation1 = situational_questions1.some((q) => 
                level3Questions[`Level3Question${q.id}`] === "Wrong"
              );
              const wrongInSituation2 = situational_questions2.some((q) => 
                level3Questions[`Level3Question${q.id}`] === "Wrong"
              );
              const wrongInSituation3 = situational_questions3.some((q) => 
                level3Questions[`Level3Question${q.id}`] === "Wrong"
              );
              
              const allReviewsCompleted = 
                (!wrongInSituation1 || situation1ReviewCompleted) &&
                (!wrongInSituation2 || situation2ReviewCompleted) &&
                (!wrongInSituation3 || situation3ReviewCompleted);
              
              // Mark Level 3 as completed if all correct or all reviews completed
              if (wrongQuestionsLevel3 || allReviewsCompleted) {
                setLevel3Completed(true);
              }
            }
          }
        }
      } else {
        setLevel2Unlocked(false);
        setLevel2Completed(false);
        setLevel3Unlocked(false);
        setLevel3Completed(false);
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
      locked: !level3Unlocked,
      starImage: level3Completed ? Star3Finished : (level3Unlocked ? Star3 : StarLocked3),
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
      } else if (level.number === 3) {
        // If Level 3 is completed, go to see score with level 3 info
        if (level3Completed) {
          navigate("/level1-return", { state: { level: 3 } });
        } else {
          // If not completed, redirect to level 3
          navigate("/level3");
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