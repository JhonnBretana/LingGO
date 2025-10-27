import React from "react";
import BackgroundLayout from "../components/BackgroundLayout";
import Logo from "../../assets/LingGO Logo.png";
import TextBubble from "../../assets/Text Bubble.png";
import { useNavigate } from "react-router-dom";

function StartPage1() {
  const navigate = useNavigate();
  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        {/* <svg
          viewBox="0 0 400 400"
          width="500"
          height="400"
          className="absolute top-25 "
          style={{ pointerEvents: "none" }}
        >
          <defs>
            <path
              id="curve"
              d="M 75, 200 A 120, 120 0 0, 1 325, 200"
              fill="none"
            />
            <filter id="textShadow">
              <feDropShadow dx="5" dy="5" stdDeviation="5" floodOpacity="0.5" />
            </filter>
          </defs>
          <text
            fontSize="30"
            fontWeight="bold"
            fill="white"
            filter="url(#textShadow)"
            style={{ WebkitTextStroke: "0.7px black" }}
          >
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              Kaibigan, Kumusta ka?
            </textPath>
          </text>
        </svg> */}
        <div>
          <p
            className="text-2xl text-white text-shadow-md font-extrabold"
            style={{
              WebkitTextStroke: "0.5px black",
            }}
          >
            Kaibigan, Kamusta Ka?
          </p>
        </div>
        <div>
          <img className="h-50 w-50" src={Logo} alt="LingGO Logo" />
        </div>
        <div
          className="relative flex justify-center items-center"
          style={{ height: "150px", width: "270px" }}
        >
          <img className="h-55 w-100" src={TextBubble} alt="Text Bubble" />
          <div
            className="absolute inset-0 flex items-center justify-center px-10 pt-7 text-black font-bold text-xl"
            style={{
              pointerEvents: "none", // ensures image is clickable if needed
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            Bago tayo magsimula may ilang bagay lamang akong nais malaman.{" "}
          </div>
        </div>
        <div className="mt-5 pt-5">
          <button
            onClick={() => navigate("/namedetail")}
            className="w-40 bg-white text-black text-lg font-bold py-2 px-4 rounded-2xl border-2 border-black mt-5 hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
          >
            MAGPATULOY
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default StartPage1;
