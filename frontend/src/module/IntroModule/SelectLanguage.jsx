import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import Bird from "../../assets/LingoLogo Standing.png";
import Logo from "../../assets/LingGO Logo.png";

function SelectLanguage() {
  return (
    <BackgroundLayout>
      
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div className="mb-3">
          <img src={Logo} alt="LingGO Logo" className="h-40" />
        </div>
        <div className="mb-10">
          <p
            className="text-2xl text-white text-shadow-md font-extrabold"
            style={{
              WebkitTextStroke: "0.5px black",
            }}
          >
            Anong wika ang gusto mo matutunan, kaibigan?
          </p>
        </div>
        <div className="flex flex-col">
          <button className="w-70 bg-white text-black text-sm font-bold py-3 px-4 rounded-full border-2 border-black mt-3 hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200">
            Cebuano
          </button>
          <button className="w-70 bg-white text-black text-sm font-bold py-3 px-4 rounded-full border-2 border-black mt-3 hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200">
            Filipino
          </button>
          <button className="w-70 bg-white text-black text-sm font-bold py-3 px-4 rounded-full border-2 border-black mt-3 hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200">
            English
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default SelectLanguage;
