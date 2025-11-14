import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import questions from "../../constant/questionsl2_data.js";
import Logo from "../../assets/LingGO Logo.png";

function Level2ResultPreview({ onReviewWrongQuestions }) {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("linggoUserId");
    if (!userId) return;
    const fetchAnswers = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setAnswers(userSnap.data().Level2Questions || {});
      }
      setLoading(false);
    };
    fetchAnswers();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  // Calculate total possible points
  const totalPoints = 35;

  // Calculate earned points
  const earnedPoints = questions.reduce((sum, q) => {
  const answer = answers[`Level2Question${q.id}`];
  if (answer === "Correct") {
    if (q.type === "MatchingWordsWithWords" || q.type === "MatchingWordsWithImage") {
      return sum + q.correctAnswer.length;
    } else if (q.type === "SpeechMicWithVoice") {
      return sum + 2;
    }
    return sum + 1;
  }
  return sum;
}, 0);

  const wrongQuestions = questions.filter(
    (q) => answers[`Level2Question${q.id}`] === "Wrong"
  );

  const percentage = ((earnedPoints / totalPoints) * 100).toFixed(1);
  const isPerfectScore = wrongQuestions.length === 0;

  return (
    <div className="overflow-hidden w-full h-screen flex flex-col">
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl text-white shadow-black text-shadow-2xl font-bold mb-4 text-center">
          Level 2 Results
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
                    Perfect ka! Tapos na ang Level 2!
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
                    onClick={() => onReviewWrongQuestions(wrongQuestions)}
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
  );
}

export default Level2ResultPreview;