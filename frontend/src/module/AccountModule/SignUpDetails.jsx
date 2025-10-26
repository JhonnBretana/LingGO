import React, { useState } from "react";
import BackgroundLayout from "../components/BackgroundLayout";
import LogoStanding from "../../assets/LingoLogo Standing.png";
import { gradeCategories } from "../../constant/grade_category";
import { sectionCategories } from "../../constant/section_category";

function SigninDetails() {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [grade, setGrade] = useState("");

  const isFormComplete = name.trim() !== "" && section !== "" && grade !== "";

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div className="mb-5">
          <img className="h-60 w-60" src={LogoStanding} alt="LingGO Logo" />
        </div>
        <div className="flex flex-col gap-4 w-72 mx-auto">
          {/* Name Input */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="(TYPE)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white text-black text-center font-bold py-2 rounded-2xl border-3 border-black text-lg focus:outline-none"
            />
            <span
              className="text-white font-extrabold text-lg text-shadow-md"
              style={{ WebkitTextStroke: "0.5px black" }}
            >
              PANGALAN
            </span>
          </div>
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
          disabled={!isFormComplete}
          className={`border px-4 py-3 w-50 sm:w-60 bg-white rounded-lg font-bold text-lg mt-8 transition duration-300 ${
            isFormComplete
              ? "hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Magpatuloy
        </button>
      </div>
    </BackgroundLayout>
  );
}

export default SigninDetails;
