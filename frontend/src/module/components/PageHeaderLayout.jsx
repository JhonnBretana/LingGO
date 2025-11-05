import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Logo from "../../assets/LingGO Logo.png";
import Star from "../../assets/star.png";
import { useNavigate } from "react-router-dom";
import useBackgroundMusic from "../../hooks/useBackgroundMusic";

function PageHeaderLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("linggoRole");
  const { playMusic, stopMusic } = useBackgroundMusic();

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

  useEffect(() => {
    if (musicOn) {
      // Only create if not already playing
      if (!window._bgMusicAudio) {
        window._bgMusicAudio = new Audio("/assets/AppSounds/BgMusicLingGo.mp3");
        window._bgMusicAudio.loop = true;
        window._bgMusicAudio.volume = 1;
        window._bgMusicAudio.addEventListener("ended", () => {
          window._bgMusicAudio.currentTime = 0;
          window._bgMusicAudio.play();
        });
      }
      window._bgMusicAudio.play().catch(() => {});
    } else {
      // Always pause and reset if exists
      if (window._bgMusicAudio) {
        window._bgMusicAudio.pause();
        window._bgMusicAudio.currentTime = 0;
      }
    }
  }, [musicOn]);

  // Patch playMusic to store audio ref globally
  function patchedPlayMusic() {
    if (!window._bgMusicAudio) {
      window._bgMusicAudio = new Audio("/assets/AppSounds/BgMusicLingGo.mp3");
      window._bgMusicAudio.loop = true;
      window._bgMusicAudio.volume = 1;
      window._bgMusicAudio.addEventListener("ended", () => {
        window._bgMusicAudio.currentTime = 0;
        window._bgMusicAudio.play();
      });
    }
    window._bgMusicAudio.play().catch(() => {});
  }

  // Use patchedPlayMusic instead of hook for global control
  useEffect(() => {
    if (musicOn) playMusic();
    else stopMusic();
    // do not recreate audio here
  }, [musicOn, playMusic, stopMusic]);

  useEffect(() => {
    return () => {
      // ensure audio is stopped when header unmounts (optional)
      stopMusic();
    };
  }, [stopMusic]);

  const getFullName = () => {
    if (role === "Instructor") return "Guro";
    if (role === "Others") return "Iba pa";
    if (role === "Researchers") return "Mananaliksik";
    if (!user) return "Juan Dela Cruz";
    const firstName = user.FirstName || "";
    return firstName || user.Username || "Juan Dela Cruz";
  };

  // Grade and section display
  const gradeDisplay =
    role === "Instructor" || role === "Others" || role === "Researchers"
      ? "Bisita"
      : user
      ? `${user.Grade || ""}${user.Section ? "-" + user.Section : ""}`
      : "Baitang-Seksyon";

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  if (loading) {
    return <div className="px-3 py-4">Loading...</div>;
  }

  async function clearLevel1Questions() {
    const userId = localStorage.getItem("linggoUserId");
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { Level1Questions: {} });
  }

  const handleClearRecords = async () => {
    await clearLevel1Questions();
    window.location.reload(); // or re-fetch user data
  };

  return (
    <div className="flex justify-between items-center px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="flex-shrink-0">
          <img
            src={Logo}
            alt="LingGO Logo"
            className="h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-20"
            onClick={() => setShowModal(true)}
          />
        </div>

        <div className="flex flex-col">
          <div className="font-bold text-black text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap">
            {gradeDisplay}
          </div>
          <div
            className="font-bold text-white text-sm sm:text-xl md:text-2xl lg:text-3xl whitespace-nowrap drop-shadow-md cursor-pointer"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            onClick={() => setShowModal(true)}
          >
            {getFullName()}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center flex-shrink-0">
        <img
          src={Star}
          alt="Star"
          className="h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-20"
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
          <div
            className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] relative"
            style={{
              border: "6px solid #FFD700",
              boxShadow: "0 4px 24px rgba(228, 99, 99, 0.15)",
            }}
          >
            <button
              className="absolute top-1 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center gap-4">
              <img src={Logo} alt="LingGO Logo" className="h-16 w-auto mb-2" />
              <div className="font-bold text-xl text-gray-800">
                {getFullName()}
              </div>
              <div className="font-semibold text-lg text-gray-600">
                {gradeDisplay}
              </div>
              <button
                className="my-1 px-4 py-2 bg-orange-400 text-white rounded hover:bg-red-600"
                onClick={handleClearRecords}
              >
                I-clear ang Records
              </button>
              <button
                className="my-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
              {/* Music Toggle Button */}
              <button
                className={`my-1 px-4 py-2 rounded ${
                  musicOn ? "bg-green-500" : "bg-gray-400"
                } text-white font-bold`}
                onClick={() => setMusicOn((prev) => !prev)}
              >
                {musicOn ? "Patayin ang Musika" : "Buksan ang Musika"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageHeaderLayout;
