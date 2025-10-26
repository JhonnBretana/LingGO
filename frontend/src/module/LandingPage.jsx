import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../module/components/BackgroundLayout";
import Logo from "../assets/LingGO Logo.png";

function LandingPage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/signin");
  };

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
            Ang libre, masaya, at lokal na paraan para matuto ng wika!
          </p>
        </div>
        <div>
          <img className="h-70 w-75" src={Logo} alt="LingGO Logo" />
        </div>
        <div>
          <button
            className="w-40 bg-white text-black text-lg font-bold py-2 px-4 rounded-2xl border-2 border-black mt-3  hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
            onClick={handleStartClick}
          >
            MAGSIMULA
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default LandingPage;
