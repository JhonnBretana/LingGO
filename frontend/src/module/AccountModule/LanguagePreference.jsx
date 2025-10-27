import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import ClickBar from "../../assets/clickbar.png";
import Logo from "../../assets/LingGO Logo.png";

function LanguagePreference() {
    const navigate = useNavigate();

    const handleCardClick = (language) => {
        console.log(`Selected language: ${language}`);

        if (language === 'cebuano') {
            console.log('Navigating to cebuano-knowledge...'); // Debug log
            navigate('/cebuano-knowledge');
        }
    };

    return (
        <BackgroundLayout>
            {/* Logo - top-right on desktop only */}
            <div className="hidden md:block absolute top-4 right-4 md:w-24 md:h-24 lg:top-6 lg:right-6 lg:w-28 lg:h-28 xl:top-8 xl:right-8 xl:w-32 xl:h-32 z-20">
                <img
                    src={Logo}
                    alt="LingGO Logo"
                    className="w-full h-full"
                />
            </div>

            <div className="flex flex-col items-center justify-center px-4 min-h-screen">
                {/* Logo - centered on mobile only */}
                <img
                    src={Logo}
                    alt="LingGO Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 md:hidden"
                />

                {/* Title */}
                <h1
                    className="text-white font-extrabold text-center
                             text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                             mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16
                             px-2 leading-tight"
                    style={{
                        WebkitTextStroke: "2px black",
                        textShadow: "3px 3px 0px rgba(0,0,0,0.3)"
                    }}
                >
                    Anong wika ang gusto mo matutunan,<br />kaibigan?
                </h1>

                {/* Cards Container */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-full max-w-3xl">
                    {/* Card 1 - Cebuano */}
                    <button
                        onClick={() => handleCardClick('cebuano')}
                        className="relative w-full max-w-xl sm:max-w-2xl
                                 transition-all duration-300 ease-out
                                 hover:scale-105 hover:-translate-y-1
                                 active:scale-100 active:translate-y-0
                                 cursor-pointer group"
                    >
                        <img
                            src={ClickBar}
                            alt="Language Option"
                            className="w-full h-auto drop-shadow-xl
                                     group-hover:drop-shadow-2xl group-hover:brightness-105
                                     transition-all duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span
                                className="text-black font-black text-center
                                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                                         group-hover:scale-105 transition-transform duration-300"
                            >
                                Cebuano
                            </span>
                        </div>
                    </button>

                    {/* Card 2 - Plus Sign (Add Language) */}
                    <button
                        onClick={() => handleCardClick('add-language-1')}
                        className="relative w-full max-w-xl sm:max-w-2xl
                                 transition-all duration-300 ease-out
                                 hover:scale-105 hover:-translate-y-1
                                 active:scale-100 active:translate-y-0
                                 cursor-pointer group"
                    >
                        <img
                            src={ClickBar}
                            alt="Add Language Option"
                            className="w-full h-auto drop-shadow-xl
                                     group-hover:drop-shadow-2xl group-hover:brightness-105
                                     transition-all duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span
                                className="text-black font-black text-center leading-none -mt-4
                                         text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                                         group-hover:scale-105 transition-transform duration-300"
                            >
                                +
                            </span>
                        </div>
                    </button>

                    {/* Card 3 - Plus Sign (Add Language) */}
                    <button
                        onClick={() => handleCardClick('add-language-2')}
                        className="relative w-full max-w-xl sm:max-w-2xl
                                 transition-all duration-300 ease-out
                                 hover:scale-105 hover:-translate-y-1
                                 active:scale-100 active:translate-y-0
                                 cursor-pointer group"
                    >
                        <img
                            src={ClickBar}
                            alt="Add Language Option"
                            className="w-full h-auto drop-shadow-xl
                                     group-hover:drop-shadow-2xl group-hover:brightness-105
                                     transition-all duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span
                                className="text-black font-black text-center leading-none -mt-4
                                         text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                                         group-hover:scale-105 transition-transform duration-300"
                            >
                                +
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default LanguagePreference;