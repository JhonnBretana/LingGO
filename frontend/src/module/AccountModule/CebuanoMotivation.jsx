import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import ClickBar from "../../assets/clickbar.png";
import Logo from "../../assets/LingGO Logo.png";
import PageHeaderLayout from "../components/PageHeaderLayout";

function CebuanoMotivation() {
  const navigate = useNavigate();

  const handleCardClick = (motivation) => {
    console.log(`Selected motivation: ${motivation}`);
    navigate("/ready");
  };

  return (
      <BackgroundLayout>
        <PageHeaderLayout />
        <div className="hidden lg:block absolute top-4 right-4 lg:top-6 lg:right-6 lg:w-28 lg:h-28 xl:top-8 xl:right-8 xl:w-32 xl:h-32 z-20">
          <img src={Logo} alt="LingGO Logo" className="w-full h-full" />
        </div>

        <div className="flex flex-col items-center text-center px-4 pt-4 pb-4 lg:pt-20 lg:pb-6 h-screen overflow-y-hidden">
          <img
            src={Logo}
            alt="LingGO Logo"
            className="w-24 h-24 md:w-28 md:h-28 lg:hidden mb-2 md:mb-3"
          />

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
            Bakit mo nais matuto ng Cebuano,
            <br />
            kaibigan?
          </h1>

          <div className="flex flex-col items-center gap-2 md:gap-2.5 lg:gap-7 w-full max-w-sm md:max-w-lg lg:max-w-4xl px-2">
            <button
              onClick={() => handleCardClick("expand-knowledge")}
              className="relative w-full
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
              <div className="absolute inset-0 flex items-center justify-center px-3 md:px-8 lg:px-12">
                <p
                  className="text-black font-bold text-center leading-tight
                                           text-[0.6rem] md:text-sm lg:text-xl xl:text-2xl
                                           group-hover:scale-105 transition-transform duration-300"
                >
                  Upang mapalawak ang aking kaalaman sa iba't-ibang wikang mayroon
                  sa Pilipinas.
                </p>
              </div>
            </button>

            <button
              onClick={() => handleCardClick("connect-people")}
              className="relative w-full
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
              <div className="absolute inset-0 flex items-center justify-center px-3 md:px-8 lg:px-12">
                <p
                  className="text-black font-bold text-center leading-tight
                                           text-[0.6rem] md:text-sm lg:text-xl xl:text-2xl
                                           group-hover:scale-105 transition-transform duration-300"
                >
                  Upang makakonekta sa mas maraming tao na nagsasalita ng Cebuano
                  gaya ng mga kaibigan o kaklase.
                </p>
              </div>
            </button>

            <button
              onClick={() => handleCardClick("communicate-better")}
              className="relative w-full
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
              <div className="absolute inset-0 flex items-center justify-center px-3 md:px-8 lg:px-12">
                <p
                  className="text-black font-bold text-center leading-tight
                                           text-[0.6rem] md:text-sm lg:text-xl xl:text-2xl
                                           group-hover:scale-105 transition-transform duration-300"
                >
                  Upang magamit sa pakikipagkomunikasyon kapag napadpad sa lugar
                  na may mga Cebuano.
                </p>
              </div>
            </button>
          </div>
        </div>
      </BackgroundLayout>
  );
}

export default CebuanoMotivation;