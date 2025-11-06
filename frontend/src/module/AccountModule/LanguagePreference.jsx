import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import ClickBar from "../../assets/clickbar.png";
import Logo from "../../assets/LingGO Logo.png";
import PageHeaderLayout from "../components/PageHeaderLayout";

function LanguagePreference() {
  const navigate = useNavigate();

  const handleCardClick = (language) => {
    localStorage.setItem("languageLearning", language); // Save language
    if (language === "cebuano") {
      navigate("/cebuano-knowledge");
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <BackgroundLayout>
        {/* Logo - top-right on desktop only (lg+ now, instead of md+) */}
        <div className="hidden lg:block absolute right-4 lg:top-6 lg:right-6 lg:w-28 lg:h-28 xl:top-8 xl:right-8 xl:w-32 xl:h-32 z-20">
          <img src={Logo} alt="LingGO Logo" className="w-full h-full" />
        </div>

        <div className="flex flex-col items-center px-4 pt-4 pb-4 lg:pt-20 lg:pb-6 h-screen overflow-y-hidden">
          {/* Logo - centered on mobile and tablet (up to lg-) */}
          <img
            src={Logo}
            alt="LingGO Logo"
            className="w-24 h-24 md:w-28 md:h-28 lg:hidden mb-2 md:mb-3"
          />

          {/* Title */}
          <h1
            className="text-white font-extrabold text-center
                             text-xl md:text-3xl lg:text-5xl xl:text-6xl
                             mb-4 md:mb-6 lg:mb-14 xl:mb-16
                             px-2 leading-snug"
            style={{
              textShadow:
                "3px 3px 0px rgba(0,0,0,0.9), 0px 0px 10px rgba(0,0,0,0.5)",
            }}
          >
            Anong wika ang gusto mo matutunan, kaibigan?
          </h1>

          {/* Cards Container */}
          <div className="flex flex-col items-center gap-2 md:gap-2.5 lg:gap-5 w-full max-w-sm md:max-w-lg lg:max-w-3xl">
            {/* Card 1 - Cebuano */}
            <button
              onClick={() => handleCardClick("cebuano")}
              className="relative w-full
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
                                         text-xl md:text-3xl lg:text-5xl xl:text-6xl
                                         group-hover:scale-105 transition-transform duration-300"
                >
                  Cebuano
                </span>
              </div>
            </button>

            {/* Card 2 - Plus Sign (Add Language) */}
            <button
              onClick={() => handleCardClick("add-language-1")}
              className="relative w-full
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
                  className="text-black font-black text-center leading-none -mt-2 md:-mt-2.5
                                         text-3xl md:text-5xl lg:text-7xl xl:text-8xl
                                         group-hover:scale-105 transition-transform duration-300"
                >
                  +
                </span>
              </div>
            </button>

            {/* Card 3 - Plus Sign (Add Language) */}
            <button
              onClick={() => handleCardClick("add-language-2")}
              className="relative w-full
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
                  className="text-black font-black text-center leading-none -mt-2 md:-mt-2.5
                                         text-3xl md:text-5xl lg:text-7xl xl:text-8xl
                                         group-hover:scale-105 transition-transform duration-300"
                >
                  +
                </span>
              </div>
            </button>
          </div>
        </div>
      </BackgroundLayout>
    </div>
  );
}

export default LanguagePreference;
