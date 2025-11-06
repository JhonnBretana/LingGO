import React from "react";
import { useNavigate } from "react-router-dom";

import BackgroundLayout from "../components/BackgroundLayout";
import Logo from "../../assets/LingGO Logo.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div>
          <img className="h-70 w-75" src={Logo} alt="LingGO Logo" />
        </div>
        <div className="flex flex-col">
          <button
            onClick={() => navigate("/role-selection")}
            className="w-70 bg-white text-black text-sm font-bold py-3 px-4 rounded-2xl border-2 border-black mt-3 hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
          >
            MAGSIMULA
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="w-70 bg-white text-black text-sm font-bold py-3 px-4 rounded-2xl border-2 border-black mt-3 hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
          >
            MAG-SIGN IN SA ACCOUNT KO
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default LandingPage;
