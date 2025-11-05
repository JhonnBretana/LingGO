import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import Bird from "../../assets/LingoLogo Standing.png";

function RoleSelection() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    localStorage.setItem("linggoRole", role); // Save role
    if (role === "Student") {
      navigate("/namedetail");
    } else if (role === "Instructor" || role === "Others") {
      navigate("/level1");
    }
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div className="mb-5">
          <p className="text-2xl text-white text-shadow-lg font-extrabold">
            Kamusta Kaibigan! Ano ang iyong role sa pag-aaral ng wikang Cebuano?
          </p>
        </div>
        <div>
          <img className="h-50 w-55" src={Bird} alt="LingGO Logo" />
        </div>
        <div className="flex flex-col gap-4 w-72 mx-auto">
          <label className="text-white text-shadow-lg font-extrabold text-2xl">
            Role:
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full my-5 bg-white text-black text-center font-bold py-2 rounded-full border-3 border-black text-lg focus:outline-none"
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!role}
          className={`w-50 mt-5 bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200 ${
            !role ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Sumunod
        </button>
      </div>
    </BackgroundLayout>
  );
}

export default RoleSelection;
