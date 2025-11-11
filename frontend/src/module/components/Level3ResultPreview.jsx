import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import situational_questions1 from "../../constant/Level3/SituationalQuestion1_data.js";
import situational_questions2 from "../../constant/Level3/SituationalQuestion2_data.js";
import situational_questions3 from "../../constant/Level3/SituationalQuestion3_data.js";
import Logo from "../../assets/LingGO Logo.png";
import BackgroundLayout from "./BackgroundLayout.jsx";
import PageHeaderLayout from "./PageHeaderLayout.jsx";

function Level3ResultPreview({ onReviewWrongQuestions }) {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Combine all questions from the three files
  const questions = [
    ...situational_questions1,
    ...situational_questions2,
    ...situational_questions3,
  ];

  useEffect(() => {
    const userId = localStorage.getItem("linggoUserId");
    if (!userId) return;
    const fetchAnswers = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setAnswers(userSnap.data().Level3Questions || {});
      }
      setLoading(false);
    };
    fetchAnswers();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  // Calculate total possible points
  const totalPoints = questions.length * 2;

  // Calculate earned points
  const earnedPoints = questions.reduce((sum, q) => {
  const answer = answers[`Level3Question${q.id}`];
  return sum + (answer === "Correct" ? 2 : 0);
}, 0);

  const wrongQuestions = questions.filter(
    (q) => answers[`Level3Question${q.id}`] === "Wrong"
  );

  const percentage = ((earnedPoints / totalPoints) * 100).toFixed(1);
  const isPerfectScore = wrongQuestions.length === 0;

  // Handle reviewing wrong questions
  const handleReviewWrongQuestions = () => {
    if (wrongQuestions.length === 0) return;
    
    // Store review flag in localStorage
    localStorage.setItem("reviewAnswered", JSON.stringify([]));
    
    // Determine which situation has wrong questions and navigate there
    const situation1Ids = situational_questions1.map(q => q.id);
    const situation2Ids = situational_questions2.map(q => q.id);
    const situation3Ids = situational_questions3.map(q => q.id);
    
    const hasWrongInSituation1 = wrongQuestions.some(q => situation1Ids.includes(q.id));
    const hasWrongInSituation2 = wrongQuestions.some(q => situation2Ids.includes(q.id));
    const hasWrongInSituation3 = wrongQuestions.some(q => situation3Ids.includes(q.id));
    
    // Navigate to the first situation with wrong questions
    if (hasWrongInSituation1) {
      navigate("/level3-situation1");
    } else if (hasWrongInSituation2) {
      navigate("/level3-situation2");
    } else if (hasWrongInSituation3) {
      navigate("/level3-situation3");
    }
  };

  return (
    <BackgroundLayout>
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <PageHeaderLayout />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl text-white shadow-black text-shadow-2xl font-bold mb-4 text-center">
              Level 3 Results
            </h2>

            <div className="mb-6 p-4 bg-white border-2 border-black rounded-lg text-center">
              <div className="text-3xl font-bold text-black">
                {earnedPoints} / {totalPoints}
              </div>
              <div className="text-lg text-black">Score: {percentage}%</div>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center">
                <img className="h-50 w-52" src={Logo} alt="LingGO Logo" />
                <div className="my-5 text-center">
                  <p className="text-2xl shadow-black text-white text-shadow-2xl font-bold my-2">
                    Magaling kaibigan!
                  </p>
                  {isPerfectScore ? (
                    <>
                      <p className="text-xl shadow-black text-white text-shadow-2xl font-medium my-2">
                        Perfect ka! Tapos na ang Level 3!
                      </p>
                      <button
                        className="w-35 bg-white text-black text-lg font-bold mt-5 py-2 px-4 rounded-2xl border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
                        onClick={() => navigate("/level1-finish")}
                      >
                        Magpatuloy
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-xl shadow-black text-white text-shadow-2xl font-medium my-2">
                        Ngayon balikan natin ang ilang katanungan.
                      </p>
                      <button
                        className="w-35 bg-white text-black text-lg font-bold mt-5 py-2 px-4 rounded-2xl border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
                        onClick={handleReviewWrongQuestions}
                      >
                        Magpatuloy
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Level3ResultPreview;