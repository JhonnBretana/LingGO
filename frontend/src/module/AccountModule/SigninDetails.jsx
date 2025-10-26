import React from "react";
import BackgroundLayout from "../components/BackgroundLayout";
import LogoStanding from "../../assets/LingoLogo Standing.png";

function SigninDetails() {
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
            <input
              type="text"
              className="w-full bg-white text-black text-center font-bold py-2 rounded-2xl border-3 border-black text-lg focus:outline-none"
            />
            <span
              className="text-white font-extrabold text-lg text-shadow-md"
              style={{ WebkitTextStroke: "0.5px black" }}
            >
              PANGKAT
            </span>
          </div>
          {/* Baitang Dropdown */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              className="w-full bg-white text-black text-center font-bold py-2 rounded-2xl border-3 border-black text-lg focus:outline-none"
            />
            <span
              className="text-white font-extrabold text-lg text-shadow-md"
              style={{ WebkitTextStroke: "0.5px black" }}
            >
              BAITANG
            </span>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default SigninDetails;
