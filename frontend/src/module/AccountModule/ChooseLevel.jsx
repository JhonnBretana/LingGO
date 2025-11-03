import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import BackgroundLayout from "../components/BackgroundLayout";
import StarLocked1 from "/assets/ImageChoices/Starlocked1.png";
import StarLocked2 from "/assets/ImageChoices/Starlocked2.png";
import StarLocked3 from "/assets/ImageChoices/Starlocked3.png";
import Logo from "../../assets/LingGO Logo.png";

function LevelSelection() {
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

    const getGradeNumber = (baitang) => {
        if (!baitang) return "";

        const gradeMap = {
            "Ikapitong Baitang": "7",
            "Ika-walong Baitang": "8",
            "Ika-siyam na Baitang": "9",
            "Ika-sampung Baitang": "10"
        };

        return gradeMap[baitang] || "";
    };

    const getFullName = () => {
        if (!user) return "Juan Dela Cruz";

        const firstName = user["Unang Pangalan"] || "";
        const lastName = user["Apelyido"] || "";

        if (firstName && lastName) {
            return `${firstName} ${lastName}`;
        }

        return firstName || lastName || user.Username || "Juan Dela Cruz";
    };

    const gradeDisplay = user
        ? `${getGradeNumber(user.Baitang)}-${user.Pangkat}`
        : "Pangkat at Baitang";

    const levels = [
        {
            number: 1,
            title: "MGA SALITA",
            locked: false,
            starImage: StarLocked1
        },
        {
            number: 2,
            title: "MGA PARIRALA",
            locked: true,
            starImage: StarLocked2
        },
        {
            number: 3,
            title: "DISKURSO",
            locked: true,
            starImage: StarLocked3
        }
    ];

    const handleLevelClick = (level) => {
        if (!level.locked) {
            if (level.number === 1) {
                navigate("/level-one");
            }
        }
    };

    if (loading) {
        return (
            <BackgroundLayout>
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            </BackgroundLayout>
        );
    }

    return (
        <BackgroundLayout>
            <div className="flex flex-col min-h-screen">
                <div className="flex items-center px-4 py-4 gap-2 sm:gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                        <img
                            src={Logo}
                            alt="LingGO Logo"
                            className="h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-20"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="font-bold text-black text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap">
                            {gradeDisplay}
                        </div>
                        <div className="font-bold text-white text-lg sm:text-xl md:text-2xl lg:text-3xl whitespace-nowrap drop-shadow-md" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                            {getFullName()}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-3 py-8">
                    <div
                        className="flex flex-col md:flex-row justify-center items-center md:items-center 
                          gap-8 xs:gap-10 sm:gap-12 md:gap-4 lg:gap-8 xl:gap-12 
                          w-full max-w-[95rem] px-2 pb-12"
                    >
                        <button
                            onClick={() => handleLevelClick(levels[0])}
                            className="relative w-48 xs:w-52 sm:w-60 md:w-44 lg:w-60 xl:w-72 flex-shrink-0 
                           transition-all duration-300 ease-in-out
                           hover:scale-110 hover:-translate-y-2
                           active:scale-105 active:translate-y-0
                           cursor-pointer group"
                        >
                            <img
                                src={levels[0].starImage}
                                alt="Star 1"
                                className="w-full h-auto drop-shadow-lg 
                             group-hover:drop-shadow-2xl group-hover:brightness-110
                             transition-all duration-300"
                            />
                            <p
                                className="absolute -bottom-8 xs:-bottom-9 sm:-bottom-10 md:-bottom-8 lg:-bottom-10 xl:-bottom-12
                             left-0 right-0 text-center text-black font-black 
                             text-xs xs:text-sm sm:text-base md:text-xs lg:text-base xl:text-lg
                             tracking-wide"
                            >
                                {levels[0].title}
                            </p>
                        </button>

                        <button
                            onClick={() => handleLevelClick(levels[1])}
                            className={`relative w-48 xs:w-52 sm:w-60 md:w-44 lg:w-60 xl:w-72 flex-shrink-0 
                            transition-all duration-300 ease-in-out
                            ${levels[1].locked
                                    ? 'cursor-not-allowed opacity-90'
                                    : 'cursor-pointer hover:scale-110 hover:-translate-y-2'}
                            active:scale-105 active:translate-y-0
                            group`}
                            disabled={levels[1].locked}
                        >
                            <img
                                src={levels[1].starImage}
                                alt="Star 2 - Locked"
                                className="w-full h-auto drop-shadow-lg
                             group-hover:drop-shadow-2xl group-hover:brightness-110
                             transition-all duration-300"
                            />
                            <p
                                className="absolute -bottom-8 xs:-bottom-9 sm:-bottom-10 md:-bottom-8 lg:-bottom-10 xl:-bottom-12
                             left-0 right-0 text-center text-black font-black 
                             text-xs xs:text-sm sm:text-base md:text-xs lg:text-base xl:text-lg
                             tracking-wide"
                            >
                                {levels[1].title}
                            </p>
                        </button>

                        <button
                            onClick={() => handleLevelClick(levels[2])}
                            className={`relative w-48 xs:w-52 sm:w-60 md:w-44 lg:w-60 xl:w-72 flex-shrink-0
                            transition-all duration-300 ease-in-out
                            ${levels[2].locked
                                    ? 'cursor-not-allowed opacity-90'
                                    : 'cursor-pointer hover:scale-110 hover:-translate-y-2'}
                            active:scale-105 active:translate-y-0
                            group`}
                            disabled={levels[2].locked}
                        >
                            <img
                                src={levels[2].starImage}
                                alt="Star 3 - Locked"
                                className="w-full h-auto drop-shadow-lg
                             group-hover:drop-shadow-2xl group-hover:brightness-110
                             transition-all duration-300"
                            />
                            <p
                                className="absolute -bottom-8 xs:-bottom-9 sm:-bottom-10 md:-bottom-8 lg:-bottom-10 xl:-bottom-12
                             left-0 right-0 text-center text-black font-black 
                             text-xs xs:text-sm sm:text-base md:text-xs lg:text-base xl:text-lg
                             tracking-wide"
                            >
                                {levels[2].title}
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default LevelSelection;