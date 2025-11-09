import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import PageHeaderLayout from "../components/PageHeaderLayout";
import Star from "../../assets/Star2.png";
import Arrow from "/assets/ImageChoices/arrow2.png";
import questions from "../../constant/questions_data.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import StarLevel3 from "/assets/ImageChoices/StarLevelThree.png";

function LevelThree() {
  const navigate = useNavigate();

  // Helper to check if all questions are answered
//   const isLevel3Complete = () => {
//     const answers = JSON.parse(localStorage.getItem("answers")) || {};
//     return questions.every((q) =>
//       ["Correct", "Wrong"].includes(answers[`Level1Question${q.id}`])
//     );
//   };

  // Helper to check if review is complete
//   const isReviewComplete = () => {
//     const answers = JSON.parse(localStorage.getItem("answers")) || {};
//     const wrongQuestions = questions.filter(
//       (q) => answers[`Level1Question${q.id}`] === "Wrong"
//     );
//     if (wrongQuestions.length === 0) return true;
//     const reviewAnswered =
//       JSON.parse(localStorage.getItem("reviewAnswered")) || [];
//     return wrongQuestions.every((q) => reviewAnswered.includes(q.id));
//   };

  // NEW: Check WrongQuestionsAnswered in Firestore
//   const checkWrongQuestionsAnswered = async () => {
//     const userId = localStorage.getItem("linggoUserId");
//     if (!userId) return false;
//     const userRef = doc(db, "users", userId);
//     const userSnap = await getDoc(userRef);
//     if (!userSnap.exists()) return false;
//     const data = userSnap.data();
//     const wrongQuestionsAnswered = data.WrongQuestionsAnswered || {};
//     // Only check for questions that were originally wrong
//     const answers = JSON.parse(localStorage.getItem("answers")) || {};
//     const wrongQuestions = questions.filter(
//       (q) => answers[`Level1Question${q.id}`] === "Wrong"
//     );
//     return wrongQuestions.every(
//       (q) => wrongQuestionsAnswered[`Level1Question${q.id}`] === true
//     );
//   };

  //   const handleArrowClick = async () => {
  //     // Check Firestore for WrongQuestionsAnswered
  //     if (await checkWrongQuestionsAnswered()) {
  //       navigate("/level1-return");
  //     } else if (isLevel1Complete() && isReviewComplete()) {
  //       navigate("/level1-return");
  //     } else {
  //       navigate("/level1");
  //     }
  //   };

  const handleArrowClick = async () => {
    navigate("/level3");
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col min-h-screen">
        <PageHeaderLayout />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem]">
            <img
              src={StarLevel3}
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

export default LevelThree;
