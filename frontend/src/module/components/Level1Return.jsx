import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import BackgroundLayout from "../components/BackgroundLayout";
import Logo from "../../assets/LingGO Logo.png";
import PageHeaderLayout from "../components/PageHeaderLayout";
import questions from "../../constant/questions_data.js";

function Level1Finish() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("linggoUserId");
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUser(userDoc.data());
            setAnswers(userDoc.data().Level1Questions || {});
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const playLevelCompleteSound = () => {
      const audio = new Audio("/assets/AppSounds/Level1Complete.mp3");
      audio.play().catch(() => {});
    };
    playLevelCompleteSound();
  }, []);

  const totalPoints = questions.reduce((sum, q) => {
    if (
      q.type === "MatchingWordsWithWords" ||
      q.type === "MatchingWordsWithImage"
    ) {
      return sum + q.correctAnswer.length;
    }
    return sum + 1;
  }, 0);

  const earnedPoints = questions.reduce((sum, q) => {
    const answer = answers[`Level1Question${q.id}`];
    if (answer === "Correct") {
      if (
        q.type === "MatchingWordsWithWords" ||
        q.type === "MatchingWordsWithImage"
      ) {
        return sum + q.correctAnswer.length;
      }
      return sum + 1;
    }
    return sum;
  }, 0);

  const percentage = ((earnedPoints / totalPoints) * 100).toFixed(1);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <BackgroundLayout>
        <div className="overflow-auto w-full min-h-screen flex flex-col">
          <PageHeaderLayout />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white text-xl">Loading...</p>
          </div>
        </div>
      </BackgroundLayout>
    );
  }

  return (
    <BackgroundLayout>
      <div className="overflow-auto w-full min-h-screen flex flex-col">
        <PageHeaderLayout />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-3 py-8">
          <div className="max-w-2xl mx-auto w-full px-4">
            {/* Title with glow effect */}
            <h2 
              className="text-5xl md:text-6xl text-white font-black mb-8 text-center animate-pulse" 
              style={{
                textShadow: "0 0 20px rgba(242, 217, 25, 0.8), 3px 3px 8px rgba(0,0,0,0.9), 0 0 40px rgba(242, 217, 25, 0.4)"
              }}
            >
              Unang Antas
            </h2>

            {/* Enhanced Score Box with gradient and glow */}
            <div 
              className="mb-8 p-8 bg-gradient-to-br from-white via-yellow-50 to-white border-4 border-black rounded-3xl text-center relative overflow-hidden"
              style={{
                boxShadow: "0 0 30px rgba(242, 217, 25, 0.6), 0 10px 40px rgba(0,0,0,0.4)"
              }}
            >
              {/* Decorative corner accents */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-yellow-400 rounded-tl-xl"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-yellow-400 rounded-tr-xl"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-yellow-400 rounded-bl-xl"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-yellow-400 rounded-br-xl"></div>
              
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 mb-4 tracking-wider">
                MARKA
              </div>
              <div className="text-7xl md:text-8xl font-black text-black mb-3 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-black via-gray-800 to-black">
                  {earnedPoints}
                </span>
                <span className="text-gray-300 mx-2">/</span>
                <span className="text-gray-600">{totalPoints}</span>
              </div>
              <div 
                className="text-2xl font-bold text-gray-700"
                style={{
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                Score: <span className="text-3xl font-black text-yellow-600">{percentage}%</span>
              </div>
            </div>

            {/* Enhanced Button with glow */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-full max-w-xs">
                <button
                  className="w-full bg-gradient-to-br from-white via-yellow-100 to-white text-black text-2xl font-black py-5 px-8 rounded-3xl border-4 border-black hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-300 hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden group"
                  onClick={handleLogout}
                  style={{
                    boxShadow: "0 0 25px rgba(242, 217, 25, 0.7), 0 8px 30px rgba(0,0,0,0.4)"
                  }}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-shine"></div>
                  BUMALIK SA<br/>SUSUNOD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Level1Finish;