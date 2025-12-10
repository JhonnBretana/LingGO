import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import Bird from "../../assets/LingoLogo Standing.png";

function NameDetail() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Check if inputs are valid (not empty after trimming)
  const isFormValid = firstName.trim() && lastName.trim();

  const handleSubmit = () => {
    // Trim whitespace and check if inputs are empty
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      setShowModal(true);
      return;
    }

    // Save to localStorage and navigate
    localStorage.setItem("firstName", trimmedFirstName.replace(/\s/g, ""));
    localStorage.setItem("lastName", trimmedLastName.replace(/\s/g, ""));
    navigate("/agedetail");
  };

  const closeModal = () => {
    setShowModal(false);
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
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-50 mt-5 bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          Sumunod
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-black mb-4">
                Kulang na Impormasyon
              </h3>
              <p className="text-black mb-6">Pakipunan ang lahat ng patlang!</p>
              <button
                onClick={closeModal}
                className="bg-[#f2d919] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-200"
              >
                Sige
              </button>
            </div>
          </div>
        </div>
      )}
    </BackgroundLayout>
  );
}

export default NameDetail;
