import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import Bird from "../../assets/LingoLogo Standing.png";

function AgeDetail() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");

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
            Ilang taon ka na?
          </p>
        </div>
        <div>
          <img className="h-70 w-75" src={Bird} alt="LingGO Logo" />
        </div>

        <div className="flex flex-col gap-4 w-72 mx-auto">
          <input
            type="text"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full bg-white text-black text-center font-bold py-2 rounded-full border-3 border-black text-lg focus:outline-none"
          />
        </div>

        <button
          onClick={() => {
            localStorage.setItem("age", age);
            navigate("/gradesectiondetail");
          }}
          disabled={!age}
          className="w-50 mt-5 bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
        >
          Sumunod
        </button>
      </div>
    </BackgroundLayout>
  );
}

export default AgeDetail;
