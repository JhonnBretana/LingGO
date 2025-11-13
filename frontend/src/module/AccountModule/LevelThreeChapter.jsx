import React, { useEffect, useState } from "react";
import BackgroundLayout from "../components/BackgroundLayout";
import { useNavigate } from "react-router-dom";

import Star from "../../assets/star1.png";
import Logo from "../../assets/LingGO Logo.png";
import PageHeaderLayout from "../components/PageHeaderLayout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import situation1Questions from "../../constant/Level3/SituationalQuestion1_data.js";
import situation2Questions from "../../constant/Level3/SituationalQuestion2_data.js";
import situation3Questions from "../../constant/Level3/SituationalQuestion3_data.js";

function LevelThreeChapter() {
  const navigate = useNavigate();
  const [situationStatus, setSituationStatus] = useState({
    situation1Complete: false,
    situation2Complete: false,
    situation3Complete: false,
    situation1HasWrong: false,
    situation2HasWrong: false,
    situation3HasWrong: false,
    allComplete: false,
  });

  useEffect(() => {
    const userId = localStorage.getItem("linggoUserId");
    if (!userId) return;

    const fetchSituationStatus = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const answers = userSnap.data().Level3Questions || {};

        // Check if all questions in a situation are answered
        const isComplete = (questions) =>
          questions.every((q) => 
            ["Correct", "Wrong"].includes(answers[`Level3Question${q.id}`])
          );

        // Check if situation has wrong answers
        const hasWrong = (questions) =>
          questions.some((q) => answers[`Level3Question${q.id}`] === "Wrong");

        const s1Complete = isComplete(situation1Questions);
        const s2Complete = isComplete(situation2Questions);
        const s3Complete = isComplete(situation3Questions);

        setSituationStatus({
          situation1Complete: s1Complete,
          situation2Complete: s2Complete,
          situation3Complete: s3Complete,
          situation1HasWrong: hasWrong(situation1Questions),
          situation2HasWrong: hasWrong(situation2Questions),
          situation3HasWrong: hasWrong(situation3Questions),
          allComplete: s1Complete && s2Complete && s3Complete,
        });
      }
    };

    fetchSituationStatus();
  }, []);

  // Determine if a situation should be clickable
  const isSituation1Clickable = () => {
    // In review mode: only if has wrong answers
    if (situationStatus.allComplete) {
      return situationStatus.situation1HasWrong;
    }
    // First-time mode: always clickable
    return true;
  };

  const isSituation2Clickable = () => {
    // In review mode: only if has wrong answers
    if (situationStatus.allComplete) {
      return situationStatus.situation2HasWrong;
    }
    // First-time mode: clickable after Situation 1 complete
    return situationStatus.situation1Complete;
  };

  const isSituation3Clickable = () => {
    // In review mode: only if has wrong answers
    if (situationStatus.allComplete) {
      return situationStatus.situation3HasWrong;
    }
    // First-time mode: clickable after Situation 2 complete
    return situationStatus.situation2Complete;
  };

  return (
    <BackgroundLayout>
      <div className="w-full h-screen flex flex-col overflow-y-auto">
        <PageHeaderLayout />

        <div className="flex flex-col gap-4 sm:gap-6 items-center mt-12 sm:mt-20 px-4 pb-8">
          <div
            className="font-medium text-center text-2xl sm:text-4xl text-white drop-shadow-[2px_3px_1px_black] mb-4 sm:mb-8 px-4 sm:px-10"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
          >
            Level 3: Mga Sitwasyon
          </div>

          {/* Sitwasyon 1: Sa Bahay */}
          <div
            className={`w-full max-w-[320px] sm:max-w-md lg:max-w-lg bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-lg flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 transition-transform ${
              isSituation1Clickable()
                ? "hover:scale-105 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              isSituation1Clickable() && navigate("/level3-situation1")
            }
          >
            <img src={Logo} alt="Chapter Icon" className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div
                className="font-bold text-lg sm:text-xl text-yellow-800"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Sitwasyon 1: Sa Bahay
              </div>
              <div className="flex items-center gap-1 mt-1">
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
              </div>
            </div>
          </div>

          {/* Sitwasyon 2: Sa Palengke */}
          <div
            className={`w-full max-w-[320px] sm:max-w-md lg:max-w-lg bg-green-100 border-2 border-green-400 rounded-xl shadow-lg flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 transition-transform ${
              isSituation2Clickable()
                ? "hover:scale-105 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              isSituation2Clickable() && navigate("/level3-situation2")
            }
          >
            <img src={Logo} alt="Chapter Icon" className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div
                className="font-bold text-lg sm:text-xl text-green-800"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Sitwasyon 2: Sa Palengke
              </div>
              <div className="flex items-center gap-1 mt-1 flex-wrap">
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
              </div>
            </div>
          </div>

          {/* Sitwasyon 3: Sa Messenger */}
          <div
            className={`w-full max-w-[320px] sm:max-w-md lg:max-w-lg bg-blue-100 border-2 border-blue-400 rounded-xl shadow-lg flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 transition-transform ${
              isSituation3Clickable()
                ? "hover:scale-105 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              isSituation3Clickable() && navigate("/level3-situation3")
            }
          >
            <img src={Logo} alt="Chapter Icon" className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div
                className="font-bold text-lg sm:text-xl text-blue-800"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Sitwasyon 3: Sa Messenger
              </div>
              <div className="flex items-center gap-1 mt-1 flex-wrap">
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
                <img src={Star} alt="star" className="w-4 h-4 sm:w-5 sm:h-5 opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default LevelThreeChapter;