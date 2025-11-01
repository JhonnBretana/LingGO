import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../module/components/BackgroundLayout";
import Logo from "../assets/LingGO Logo.png";

function DefaultPage() {
  const navigate = useNavigate();

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div className="mb-5">
          <p
            className="text-3xl text-white font-extrabold"
            style={{
              WebkitTextStroke: "1px black",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
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
            className="w-40 bg-white text-black text-lg font-bold py-2 px-4 rounded-2xl border-2 border-black mt-3 hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
            onClick={() => navigate("/landing")}
          >
            MAGSIMULA
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default DefaultPage;