import React from "react";
import BackgroundLayout from "../components/BackgroundLayout";
import { useNavigate } from "react-router-dom";

import Star from "../../assets/star1.png";
import Logo from "../../assets/LingGO Logo.png";
import PageHeaderLayout from "../components/PageHeaderLayout";

function LevelThreeChapter() {
  const navigate = useNavigate();

  return (
    <BackgroundLayout>
      <div className="w-full h-screen flex flex-col overflow-hidden ">
        <PageHeaderLayout />

        <div className="flex flex-col gap-6 items-center mt-20 ">
          {/* Chapter 1 sa Bahay */}

          <div
            className="font-medium text-center text-4xl text-white drop-shadow-[2px_3px_1px_black] mb-15  px-10"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
          >
            Level 3: Mga Sitwasyon
          </div>
          <div
            className="w-100 h-25 bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-lg flex items-center gap-4 px-6 py-4 w-80 hover:scale-105 transition-transform"
            onClick={() => navigate("/level3-situation1")}
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
            className="w-100 h-25 bg-green-100 border-2 border-green-400 rounded-xl shadow-lg flex items-center gap-4 px-6 py-4 w-80 hover:scale-105 transition-transform"
            onClick={() => navigate("/level3-situation2")}
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
            className="w-100 h-25 bg-blue-100 border-2 border-blue-400 rounded-xl shadow-lg flex items-center gap-4 px-6 py-4 w-80 hover:scale-105 transition-transform"
            onClick={() => navigate("/level3-situation3")}
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
