import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Logo from "../../assets/LingGO Logo.png";
import Star from "../../assets/star.png";
import Star2 from "../../assets/StarLevelTwo.png";
import Star3 from "../../assets/StarLevelThree.png";
import BlankStar from "../../assets/blankStar.png";
import { useNavigate, useLocation } from "react-router-dom";

function PageHeaderLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentStar, setCurrentStar] = useState(Star);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("linggoRole");

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
    const path = location.pathname;

    // Level 1 routes
    if (path.includes("/level1") || path.includes("/level-one")) {
      // Check if it's the finish route or return route
      if (path.includes("/level1-finish") || path.includes("/level1-return")) {
        setCurrentStar(BlankStar);
        localStorage.removeItem("linggoCurrentStar");
      } else {
        setCurrentStar(Star);
        localStorage.setItem("linggoCurrentStar", "star1");
      }
    }
    // Level 2 routes
    else if (path.includes("/level2") || path.includes("/level-two")) {
      setCurrentStar(Star2);
      localStorage.setItem("linggoCurrentStar", "star2");
    }
    // Level 3 routes
    else if (
      path.includes("/level3") ||
      path.includes("/level-three") ||
      path.includes("/level3-situation1") ||
      path.includes("/level3-situation2") ||
      path.includes("/level3-situation3")
    ) {
      setCurrentStar(Star3);
      localStorage.setItem("linggoCurrentStar", "star3");
    }
    // Special case for level1-finish-choice to maintain previous star
    else if (path.includes("/level1-finish-choice")) {
      const savedStar = localStorage.getItem("linggoCurrentStar");
      if (savedStar === "star2") {
        setCurrentStar(Star2);
      } else if (savedStar === "star3") {
        setCurrentStar(Star3);
      } else {
        setCurrentStar(Star);
      }
    }
    // Default case - show blank star for routes not related to levels
    else {
      setCurrentStar(BlankStar);
      localStorage.removeItem("linggoCurrentStar");
    }
  }, [location.pathname]);

  const gradeDisplay =
    user && user.Role === "Mag-aaral"
      ? `${user.Grade || ""}${user.Section ? "-" + user.Section : ""}`
      : user
      ? user.Role
      : "Bisita";

  const getFullName = () => {
    if (!user) return "Juan Dela Cruz";
    return user.Name || "Juan Dela Cruz";
  };

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
    window.location.reload();
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
          src={currentStar}
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
              {/* <button
                className="my-1 px-4 py-2 bg-orange-400 text-white rounded hover:bg-red-600"
                onClick={handleClearRecords}
              >
                I-clear ang Records
              </button> */}
              <button
                className="my-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageHeaderLayout;
