import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import BackgroundLayout from "../components/BackgroundLayout";
import Logo from "../../assets/LingGO Logo.png";
import TextBubble from "../../assets/Text Bubble.png";
import PageHeaderLayout from "../components/PageHeaderLayout";

function Level1Finish() {
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
      <div className="overflow-hidden w-full h-screen flex flex-col">
        <PageHeaderLayout />
        <div className="flex flex-col items-center text-center m-3 p-3">
          <div className="mb-1">
            <p
              className="text-3xl text-white shadow-black text-shadow-lg font-bold my-5"
              // style={{
              //   WebkitTextStroke: "1px black",
              // }}
            >
              Congratulations, Kaibigan!
            </p>
            {/* <p
            className="text-2xl text-white text-shadow-md font-extrabold"
            style={{
              WebkitTextStroke: "0.7px black",
            }}
          >
            Maligayang Pagbabalik!
          </p> */}
          </div>
          <div>
            <img className="h-60 w-65" src={Logo} alt="LingGO Logo" />
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
      </div>
    </BackgroundLayout>
  );
}

export default Level1Finish;
