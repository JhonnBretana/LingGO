import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import BackgroundLayout from "../components/BackgroundLayout";
import Logo from "../../assets/LingGO Logo.png";
import TextBubble from "../../assets/Text Bubble.png";

function WelcomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("linggoUserId");
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, []);

  const getDisplayName = () => {
    if (!user) return "JUAN";
    return user["Unang Pangalan"] || user.Username || "JUAN";
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center text-center m-3 p-3">
        <div className="mb-1">
          <p
            className="text-5xl text-white text-shadow-md font-extrabold mb-3"
            style={{
              WebkitTextStroke: "1px black",
            }}
          >
            {getDisplayName()}
          </p>
          <p
            className="text-2xl text-white text-shadow-md font-extrabold"
            style={{
              WebkitTextStroke: "0.7px black",
            }}
          >
            Maligayang Pagbabalik!
          </p>
        </div>
        <div>
          <img className="h-50 w-50" src={Logo} alt="LingGO Logo" />
        </div>
        <div
          className="relative flex justify-center items-center"
          style={{ height: "160px", width: "280px" }}
        >
          <img className="h-45 w-80" src={TextBubble} alt="Text Bubble" />
          <div
            className="absolute inset-0 flex items-center justify-center px-8 pt-6 text-black font-bold text-xl"
            style={{
              pointerEvents: "none",
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            Sagutan muna ang ilang detalye para makapagpatuloy.
          </div>
        </div>
        <div className="mt-5 pt-5">
          <button
            onClick={() => navigate("/choose-level")}
            className="w-40 bg-white text-black text-lg font-bold py-2 px-4 rounded-2xl border-2 border-black mt-5 hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200"
          >
            MAGPATULOY
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default WelcomePage;
