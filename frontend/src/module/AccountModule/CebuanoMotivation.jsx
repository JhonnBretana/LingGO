import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import ClickBar from "../../assets/clickbar.png";
import Logo from "../../assets/LingGO Logo.png";

function CebuanoMotivation() {
  const navigate = useNavigate();

  const handleCardClick = (motivation) => {
    console.log(`Selected motivation: ${motivation}`);
    // Navigate to ReadyPage
    navigate("/ready");
  };

  return (
    <BackgroundLayout>
      {/* Logo - top-right on desktop only */}
      <div className="hidden md:block absolute top-4 right-4 md:w-24 md:h-24 lg:top-6 lg:right-6 lg:w-28 lg:h-28 xl:top-8 xl:right-8 xl:w-32 xl:h-32 z-20">
        <img src={Logo} alt="LingGO Logo" className="w-full h-full" />
      </div>

      <div className="flex flex-col items-center justify-center px-4 min-h-screen py-8">
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
            textShadow: "3px 3px 0px rgba(0,0,0,0.3)",
          }}
        >
          Bakit mo nais matuto ng Cebuano,
          <br />
          kaibigan?
        </h1>

        {/* Cards Container */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 w-full max-w-4xl px-2">
          {/* Card 1 */}
          <button
            onClick={() => handleCardClick("expand-knowledge")}
            className="relative w-full max-w-2xl sm:max-w-3xl
                                 transition-all duration-300 ease-out
                                 hover:scale-105 hover:-translate-y-1
                                 active:scale-100 active:translate-y-0
                                 cursor-pointer group"
          >
            <img
              src={ClickBar}
              alt="Motivation Option"
              className="w-full h-auto drop-shadow-xl
                                     group-hover:drop-shadow-2xl group-hover:brightness-105
                                     transition-all duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 md:px-12">
              <p
                className="text-black font-bold text-center leading-snug
                                         text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                                         group-hover:scale-105 transition-transform duration-300"
              >
                Upang mapalawak ang aking kaalaman sa
                <br className="hidden sm:block" />
                iba't-ibang wikang mayroon sa Pilipinas.
              </p>
            </div>
          </button>

          {/* Card 2 */}
          <button
            onClick={() => handleCardClick("connect-people")}
            className="relative w-full max-w-2xl sm:max-w-3xl
                                 transition-all duration-300 ease-out
                                 hover:scale-105 hover:-translate-y-1
                                 active:scale-100 active:translate-y-0
                                 cursor-pointer group"
          >
            <img
              src={ClickBar}
              alt="Motivation Option"
              className="w-full h-auto drop-shadow-xl
                                     group-hover:drop-shadow-2xl group-hover:brightness-105
                                     transition-all duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 md:px-12">
              <p
                className="text-black font-bold text-center leading-snug
                                         text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                                         group-hover:scale-105 transition-transform duration-300"
              >
                Upang makakonekta sa mas maraming tao na
                <br className="hidden sm:block" />
                nagsasalita ng Cebuano gaya ng mga kaibigan o kaklase.
              </p>
            </div>
          </button>

          {/* Card 3 */}
          <button
            onClick={() => handleCardClick("communicate-better")}
            className="relative w-full max-w-2xl sm:max-w-3xl
                                 transition-all duration-300 ease-out
                                 hover:scale-105 hover:-translate-y-1
                                 active:scale-100 active:translate-y-0
                                 cursor-pointer group"
          >
            <img
              src={ClickBar}
              alt="Motivation Option"
              className="w-full h-auto drop-shadow-xl
                                     group-hover:drop-shadow-2xl group-hover:brightness-105
                                     transition-all duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 md:px-12">
              <p
                className="text-black font-bold text-center leading-snug
                                         text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                                         group-hover:scale-105 transition-transform duration-300"
              >
                Upang magamit sa pakikipagkomunikasyon
                <br className="hidden sm:block" />
                kapag napadpad sa lugar na may mga Cebuano.
              </p>
            </div>
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default CebuanoMotivation;
