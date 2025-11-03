import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import BackgroundLayout from "../components/BackgroundLayout";
import BirdMascot from "../../assets/Chickenlittle.png";
import CardWithFlag from "../../assets/clickbar.png";
import { useNavigate } from "react-router-dom";

function ReadyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };

    fetchUser();
  }, []);

  const getFirstName = () => {
    if (!user) return "Juan";
    return user["Unang Pangalan"] || user.Username || "Juan";
  };

  const handleContinue = () => {
    console.log("Magpatuloy clicked");
    navigate("/level1");
  };

  if (loading) {
    return (
      <BackgroundLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </BackgroundLayout>
    );
  }

  return (
    <BackgroundLayout>
      <div className="hidden md:flex items-center justify-center min-h-screen px-4 overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20 flex-1">
          <h1
            className="text-white font-extrabold text-center
                         text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                         px-2 leading-snug"
            style={{
              textShadow: "3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 0px 3px 0px #000, 3px 0px 0px #000, 0px -3px 0px #000, -3px 0px 0px #000",
            }}
          >
            Handa ka na ba,
            <br />
            {getFirstName()}?
          </h1>

          <div className="relative group">
            <img
              src={CardWithFlag}
              alt="Continue Button Background"
              className="w-64 xs:w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] h-auto
                             drop-shadow-xl
                             transition-all duration-300 ease-out
                             group-hover:scale-110 group-hover:drop-shadow-2xl group-hover:brightness-105
                             group-active:scale-100 group-active:translate-y-1
                             cursor-pointer"
            />
            <button
              onClick={handleContinue}
              className="absolute inset-0 w-full h-full
                             text-black font-black text-center
                             text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
                             flex items-center justify-center
                             cursor-pointer
                             uppercase tracking-wide"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              MAGPATULOY
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center flex-1">
          <img
            src={BirdMascot}
            alt="Lingo Bird Mascot"
            className="w-48 xs:w-56 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] h-auto
                         drop-shadow-2xl
                         animate-bounce"
            style={{
              animationDuration: "2s",
            }}
          />
        </div>
      </div>

      <div className="flex md:hidden flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
        <div className="flex flex-col items-center gap-10 max-w-md w-full">
          <h1
            className="text-white font-extrabold text-center
                         text-4xl leading-snug"
            style={{
              textShadow: "3px 3px 0px rgba(0,0,0,0.9), 0px 0px 10px rgba(0,0,0,0.5)",
            }}
          >
            Handa ka na ba,
            <br />
            {getFirstName()}?
          </h1>

          <img
            src={BirdMascot}
            alt="Lingo Bird Mascot"
            className="w-64 h-auto drop-shadow-2xl animate-bounce"
            style={{
              animationDuration: "2s",
            }}
          />

          <div className="relative group w-full">
            <img
              src={CardWithFlag}
              alt="Continue Button Background"
              className="w-full h-auto
                             drop-shadow-xl
                             transition-all duration-300 ease-out
                             group-hover:scale-105 group-hover:drop-shadow-2xl group-hover:brightness-105
                             group-active:scale-95 group-active:translate-y-1
                             cursor-pointer"
            />
            <button
              onClick={handleContinue}
              className="absolute inset-0 w-full h-full
                             text-black font-black text-center text-xl
                             flex items-center justify-center
                             cursor-pointer uppercase tracking-wide"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              MAGPATULOY
            </button>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default ReadyPage;