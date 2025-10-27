import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import LogoStanding from "../../assets/LingoLogo Standing.png";
import { gradeCategories } from "../../constant/grade_category";
import { sectionCategories } from "../../constant/section_category";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const gradeToNumber = {
  "Unang Baitang": "1",
  "Ikalawang Baitang": "2",
  "Ikatlong Baitang": "3",
  "Ikaapat na Baitang": "4",
  "Ika-limang Baitang": "5",
  "Ika-anim na Baitang": "6",
  "Ikapitong Baitang": "7",
  "Ika-walong Baitang": "8",
  "Ika-siyam na Baitang": "9",
  "Ika-sampung Baitang": "10",
};

function SignUpDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [section, setSection] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const isFormComplete =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    section !== "" &&
    grade !== "";

  const handleSignUp = async () => {
    if (!isFormComplete) return;
    setLoading(true);

    const username = firstName.trim();
    const gradeNum = gradeToNumber[grade] || "";
    const password = `${lastName.trim()}${gradeNum}${section}`;

    try {
      await addDoc(collection(db, "users"), {
        "Unang Pangalan": firstName.trim(),
        Apelyido: lastName.trim(),
        Pangkat: section,
        Baitang: grade,
        Username: username,
        Password: password,
      });
      setShowModal(true);
      setFirstName("");
      setLastName("");
      setSection("");
      setGrade("");
    } catch (error) {
      setErrorMsg("Error registering user: " + error.message);
      setShowModal(true);
    }
    setLoading(false);
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div className="mb-5">
          <img className="h-60 w-60" src={LogoStanding} alt="LingGO Logo" />
        </div>
        <div className="flex flex-col gap-4 w-72 mx-auto">
          {/* First Name Input */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="(TYPE)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.toUpperCase())}
              className="w-full bg-white text-black text-center font-bold py-2 rounded-2xl border-3 border-black text-lg focus:outline-none"
            />
            <span
              className="text-white font-extrabold text-lg text-shadow-md"
              style={{ WebkitTextStroke: "0.5px black" }}
            >
              UNANG PANGALAN
            </span>
          </div>
          {/* Last Name Input */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="(TYPE)"
              value={lastName}
              onChange={(e) => setLastName(e.target.value.toUpperCase())}
              className="w-full bg-white text-black text-center font-bold py-2 rounded-2xl border-3 border-black text-lg focus:outline-none"
            />
            <span
              className="text-white font-extrabold text-lg text-shadow-md"
              style={{ WebkitTextStroke: "0.5px black" }}
            >
              APELYIDO
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
          disabled={!isFormComplete || loading}
          onClick={handleSignUp}
          className={`w-40 bg-white text-black text-lg font-bold py-2 px-4 rounded-2xl border-2 border-black mt-5 transition-colors duration-200 ${
            isFormComplete && !loading
              ? "hover:bg-[#f2d919] active:bg-[#f2d919]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Loading..." : "MAGPATULOY"}
        </button>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
            <h2
              className={`text-2xl font-bold mb-4 ${
                errorMsg ? "text-red-600" : "text-green-600"
              }`}
            >
              {errorMsg ? "May kaunting problema kaibigan" : "Magaling!"}
            </h2>
            <p className="mb-6 text-black">
              {errorMsg ? errorMsg : "Mayroon ka ng account kaibigan."}
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                if (!errorMsg) navigate("/signin");
              }}
              className="bg-[#f2d919] text-black font-bold py-2 px-6 rounded-xl border-2 border-black hover:bg-yellow-400"
            >
              Salamat!
            </button>
          </div>
        </div>
      )}
    </BackgroundLayout>
  );
}

export default SignUpDetails;
