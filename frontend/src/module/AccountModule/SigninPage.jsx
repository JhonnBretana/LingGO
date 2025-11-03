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
        userId = doc.id; // Get the document ID
      }
    });

    if (foundUser) {
      // Only store the user ID, not all data
      localStorage.setItem("linggoUserId", userId);
      // Don't store password!
      navigate("/startpage1");
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

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-black text-center font-bold py-2 rounded-full border-3 border-black text-lg focus:outline-none"
          />
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
