import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import Bird from "../../assets/LingoLogo Standing.png";

function NameDetail() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
            Anong pangalan mo, kaibigan?
          </p>
        </div>
        <div>
          <img className="h-70 w-75" src={Bird} alt="LingGO Logo" />
        </div>
        <div className="flex flex-col gap-4 w-72 mx-auto">
          {/* Username Input */}
          <input
            type="text"
            placeholder="PANGALAN"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.toUpperCase())}
            className="w-full bg-white text-black text-center font-bold py-2 rounded-full border-3 border-black text-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="APELYIDO"
            value={lastName}
            onChange={(e) => setLastName(e.target.value.toUpperCase())}
            className="w-full bg-white text-black text-center font-bold py-2 rounded-full border-3 border-black text-lg focus:outline-none"
          />
        </div>

        <button
          onClick={() => {
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            navigate("/agedetail");
          }}
          className="w-50 mt-5 bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
        >
          Sumunod
        </button>
      </div>
    </BackgroundLayout>
  );
}

export default NameDetail;
