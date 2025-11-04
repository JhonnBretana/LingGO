import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import Bird from "../../assets/LingoLogo Standing.png";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function SigninPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let foundUser = null;
    let userId = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.Username === username.trim() &&
        data.Password === password.trim()
      ) {
        foundUser = data;
        userId = doc.id;
      }
    });

    if (foundUser) {
      localStorage.setItem("linggoUserId", userId);
      navigate("/welcome");
    } else {
      setShowModal(true);
    }
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div>
          <img className="h-70 w-75" src={Bird} alt="LingGO Logo" />
        </div>
        <div className="flex flex-col gap-4 w-72 mx-auto">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value.toUpperCase())}
            className="w-full bg-white text-black text-center font-bold py-2 rounded-full border-3 border-black text-lg focus:outline-none"
          />

          {/* Password Input with Eye Toggle */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value.toUpperCase())}
              className="w-full bg-white text-black text-center font-bold py-2 px-12 rounded-full border-3 border-black text-lg focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye with slash (password visible)
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                // Eye open (password hidden)
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleSignin}
          className="w-50 mt-5 bg-white text-black text-lg font-bold py-2 px-4 rounded-lg border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
        >
          Sumunod
        </button>
      </div>
      {/* Modal for incorrect credentials */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Mali ang detalye!
            </h2>
            <p className="mb-6 text-black">
              Pakisubukang muli. Ang username o password ay mali.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-[#f2d919] text-black font-bold py-2 px-6 rounded-xl border-2 border-black hover:bg-yellow-400"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </BackgroundLayout>
  );
}

export default SigninPage;
