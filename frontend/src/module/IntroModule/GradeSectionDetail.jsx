import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import LogoStanding from "../../assets/LingoLogo Standing.png";
import { gradeCategories } from "../../constant/grade_category";
import { gradeSectionMap } from "../../constant/gradeSectionMap";
import Bird from "../../assets/LingoLogo Standing.png";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

function GradeSectionDetail() {
  const [section, setSection] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();
  const availableSections = gradeSectionMap[grade] || [];

  const isFormComplete = section !== "" && grade !== "";

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
    setSection("");
  };

  const handleSubmit = async () => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const age = localStorage.getItem("age");
    const username = firstName;
    const password = `${lastName}${grade}${section}`;
    const role = "Student";
    const level1Questions = {};

    try {
      const docRef = await addDoc(collection(db, "users"), {
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        Password: password,
        Age: age,
        Role: role,
        Grade: grade,
        Section: section,
        Level1Questions: level1Questions,
      });
      localStorage.setItem("linggoUserId", docRef.id);
      navigate("/language-preference");
    } catch (error) {
      alert("Error saving user: " + error.message);
    }
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div className="mb-5 px-2">
            <p
              className="text-2xl sm:text-3xl text-white font-extrabold leading-relaxed"
              style={{
                textShadow:
                  "2px 2px 0px rgba(0, 0, 0, 0.8), 0px 0px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              Ano ang iyong pangkat at baitang?
            </p>
          </div>
        <div>
          <img className="h-70 w-75" src={Bird} alt="LingGO Logo" />
        </div>
        <div className="flex flex-col gap-4 w-72 mx-auto">
  <div className="flex flex-col items-center">
    <select
      value={grade}
      onChange={handleGradeChange}
      className="w-full bg-white text-black text-center font-bold py-2 rounded-2xl border-3 border-black text-lg focus:outline-none max-h-64 overflow-y-auto"
    >
      <option value="">PUMILI</option>
      {gradeCategories.map((gr, index) => (
        <option key={index} value={gr}>
          {gr}
        </option>
      ))}
    </select>
    <span
      className="text-white font-extrabold text-lg leading-relaxed"
      style={{
        textShadow:
          "2px 2px 0px rgba(0, 0, 0, 0.8), 0px 0px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      BAITANG
    </span>
  </div>

  <div className="flex flex-col items-center">
    <select
      value={section}
      onChange={(e) => setSection(e.target.value)}
      className={`w-full bg-white text-black text-center font-bold py-2 rounded-2xl border-3 border-black text-lg focus:outline-none max-h-64 overflow-y-auto ${
        !grade ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
      }`}
      disabled={!grade}
    >
      <option value="">PUMILI</option>
      {availableSections.map((sec, index) => (
        <option key={index} value={sec}>
          {sec}
        </option>
      ))}
    </select>
    <span
      className="text-white font-extrabold text-lg leading-relaxed"
      style={{
        textShadow:
          "2px 2px 0px rgba(0, 0, 0, 0.8), 0px 0px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      PANGKAT
    </span>
  </div>
</div>


        <button
          onClick={handleSubmit}
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
