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
  const [wrongStatus, setWrongStatus] = useState({
    situation1: false,
    situation2: false,
    situation3: false,
  });

  useEffect(() => {
    const userId = localStorage.getItem("linggoUserId");
    if (!userId) return;

    const fetchWrongStatus = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const answers = userSnap.data().Level3Questions || {};

        const hasWrong = (questions) =>
          questions.some((q) => answers[`Level3Question${q.id}`] === "Wrong");

        setWrongStatus({
          situation1: hasWrong(situation1Questions),
          situation2: hasWrong(situation2Questions),
          situation3: hasWrong(situation3Questions),
        });
      }
    };

    fetchWrongStatus();
  }, []);

  return (
    <BackgroundLayout>
      <div className="w-full h-screen flex flex-col overflow-hidden ">
        <PageHeaderLayout />

        <div className="flex flex-col gap-6 items-center mt-20 ">
          <div
            className="font-medium text-center text-4xl text-white drop-shadow-[2px_3px_1px_black] mb-15  px-10"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
          >
            Level 3: Mga Sitwasyon
          </div>
          {/* Chapter 1 sa Bahay */}
          <div
            className={`w-100 h-25 bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-lg flex items-center gap-4 px-6 py-4 w-80 transition-transform ${
              wrongStatus.situation1
                ? "hover:scale-105 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              wrongStatus.situation1 &&
              navigate("/level3-situation1", { state: { review: true } })
            }
          >
            <img src={Logo} alt="Chapter Icon" className="w-12 h-12" />
            <div className="flex-1">
              <div
                className="font-bold text-xl text-yellow-800"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Sitwasyon 1: Sa Bahay
              </div>
              <div className="flex items-center gap-1 mt-1">
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
              </div>
            </div>
          </div>
          {/* Chapter 2 sa Palengke */}
          <div
            className={`w-100 h-25 bg-green-100 border-2 border-green-400 rounded-xl shadow-lg flex items-center gap-4 px-6 py-4 w-80 transition-transform ${
              wrongStatus.situation2
                ? "hover:scale-105 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              wrongStatus.situation2 &&
              navigate("/level3-situation2", { state: { review: true } })
            }
          >
            <img src={Logo} alt="Chapter Icon" className="w-12 h-12" />
            <div className="flex-1">
              <div
                className="font-bold text-xl text-green-800"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Sitwasyon 2: Sa Palengke
              </div>
              <div className="flex items-center gap-1 mt-1">
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
              </div>
            </div>
          </div>
          {/* Chapter 3 sa Messenger */}
          <div
            className={`w-100 h-25 bg-blue-100 border-2 border-blue-400 rounded-xl shadow-lg flex items-center gap-4 px-6 py-4 w-80 transition-transform ${
              wrongStatus.situation3
                ? "hover:scale-105 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              wrongStatus.situation3 &&
              navigate("/level3-situation3", { state: { review: true } })
            }
          >
            <img src={Logo} alt="Chapter Icon" className="w-12 h-12" />
            <div className="flex-1">
              <div
                className="font-bold text-xl text-blue-800"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Sitwasyon 3: Sa Messenger
              </div>
              <div className="flex items-center gap-1 mt-1">
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
                <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default LevelThreeChapter;
