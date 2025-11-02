import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import LogoStanding from "../../assets/LingoLogo Standing.png";
import { gradeCategories } from "../../constant/grade_category";
import { sectionCategories } from "../../constant/section_category";
import Bird from "../../assets/LingoLogo Standing.png";

function GradeSectionDetail() {
  const [section, setSection] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();

  const isFormComplete = section !== "" && grade !== "";

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div className="mb-5">
          <p
            className="text-3xl text-white text-shadow-md font-extrabold"
            style={{
              WebkitTextStroke: "0.5px black",
            }}
          >
            Ano ang iyong pangkat at baitang?
          </p>
        </div>
        <div>
          <img className="h-70 w-75" src={Bird} alt="LingGO Logo" />
        </div>
        <div className="flex flex-col gap-4 w-72 mx-auto">
          {/* Pangkat Dropdown */}
          <div className="flex flex-col items-center">
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full bg-white text-black text-center font-bold py-2 rounded-2xl border-3 border-black text-lg focus:outline-none max-h-64 overflow-y-auto"
            >
              <option value="">SELECT</option>
              {sectionCategories.map((sec, index) => (
                <option key={index} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
            <span
              className="text-white font-extrabold text-lg text-shadow-md"
              style={{ WebkitTextStroke: "0.5px black" }}
            >
              PANGKAT
            </span>
          </div>
          {/* Baitang Dropdown */}
          <div className="flex flex-col items-center">
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full bg-white text-black text-center font-bold py-2 rounded-2xl border-3 border-black text-lg focus:outline-none max-h-64 overflow-y-auto"
            >
              <option value="">SELECT</option>
              {gradeCategories.map((gr, index) => (
                <option key={index} value={gr}>
                  {gr}
                </option>
              ))}
            </select>
            <span
              className="text-white font-extrabold text-lg text-shadow-md"
              style={{ WebkitTextStroke: "0.5px black" }}
            >
              BAITANG
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/language-preference")}
          disabled={!isFormComplete}
          className={`border px-4 py-3 w-50 sm:w-60 rounded-lg font-bold text-lg mt-8 transition duration-300 ${
            isFormComplete
              ? "bg-white hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Magpatuloy
        </button>
      </div>
    </BackgroundLayout>
  );
}

export default GradeSectionDetail;
