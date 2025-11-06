import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import PageHeaderLayout from "../components/PageHeaderLayout";
import Star from "../../assets/Star2.png";
import Arrow from "/assets/ImageChoices/arrow2.png";
import questions from "../../constant/questions_data.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

function LevelOne() {
  const navigate = useNavigate();

  const handleArrowClick = async () => {
    const userId = localStorage.getItem("linggoUserId");
    
    if (!userId) {
      navigate("/level1");
      return;
    }

    // Fetch fresh data from Firestore
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      navigate("/level1");
      return;
    }

    const data = userSnap.data();
    const level1Questions = data.Level1Questions || {};
    const level1ReviewCompleted = data.Level1ReviewCompleted || false;
    
    // Check if all questions are answered
    const allQuestionsAnswered = questions.every((q) =>
      ["Correct", "Wrong"].includes(level1Questions[`Level1Question${q.id}`])
    );
    
    // If not all questions answered, go to quiz
    if (!allQuestionsAnswered) {
      navigate("/level1");
      return;
    }
    
    // Find wrong questions
    const wrongQuestions = questions.filter(
      (q) => level1Questions[`Level1Question${q.id}`] === "Wrong"
    );
    
    // If no wrong questions (all correct) OR review completed, proceed to finish
    if (wrongQuestions.length === 0 || level1ReviewCompleted) {
      navigate("/level1-return");
    } else {
      // Still have wrong questions that need review
      navigate("/level1");
    }
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col min-h-screen">
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