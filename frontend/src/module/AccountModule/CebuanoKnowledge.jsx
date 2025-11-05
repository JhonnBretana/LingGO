import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import Star from "../../assets/star1.png";
import Logo from "../../assets/LingGO Logo.png";
import PageHeaderLayout from "../components/PageHeaderLayout";

function CebuanoKnowledge() {
  const navigate = useNavigate();

  const handleStarClick = (level) => {
    console.log(`Selected level: ${level}`);
    navigate("/cebuano-motivation");
  };

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="hidden lg:block absolute top-4 right-4 lg:top-6 lg:right-6 lg:w-28 lg:h-28 xl:top-8 xl:right-8 xl:w-32 xl:h-32 z-20">
        <img src={Logo} alt="LingGO Logo" className="w-full h-full" />
      </div>
      <div className="flex flex-col items-center text-center px-3 py-6 min-h-screen justify-center relative">
        <img
          src={Logo}
          alt="LingGO Logo"
          className="w-30 h-30 sm:w-30 sm:h-30 md:w-30 md:h-30 lg:hidden mb-3 sm:mb-4"
        />

        <h1
          className="text-white font-extrabold 
                             text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                             leading-snug mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16
                             px-2"
          style={{
            textShadow:
              "2px 2px 0px rgba(0,0,0,0.9), 0px 0px 8px rgba(0,0,0,0.5)",
          }}
        >
          Gaano kalawak ang iyong
          <br />
          kaalaman sa Cebuano?
        </h1>

        <div
          className="flex flex-col md:flex-row justify-center items-center md:items-end 
                              gap-6 xs:gap-7 sm:gap-8 md:gap-3 lg:gap-10 xl:gap-14 
                              w-full max-w-[95rem] px-2"
        >
          <button
            onClick={() => handleStarClick("beginner")}
            className="relative w-60 xs:w-64 sm:w-72 md:w-52 lg:w-72 xl:w-[22rem] flex-shrink-0 
                                 transition-all duration-300 ease-in-out
                                 hover:scale-110 hover:-translate-y-2
                                 active:scale-105 active:translate-y-0
                                 cursor-pointer group"
          >
            <img
              src={Star}
              alt="Star"
              className="w-full h-auto drop-shadow-lg 
                                     group-hover:drop-shadow-2xl group-hover:brightness-110
                                     transition-all duration-300"
            />
            <p
              className="absolute inset-0 flex items-center justify-center 
                                    px-8 xs:px-9 sm:px-11 md:px-6 lg:px-11 xl:px-14
                                    py-8 pt-13 xs:py-10 sm:py-12 md:py-6 lg:py-12 xl:py-14
                                    text-center text-black font-bold 
                                    text-sm xs:text-base sm:text-lg md:text-xs lg:text-lg xl:text-xl
                                    leading-snug tracking-tight
                                    group-hover:scale-105 transition-transform duration-300"
            >
              Wala pa akong
              <br />
              sapat na
              <br />
              kaalaman sa
              <br />
              Cebuano.
            </p>
          </button>

          <button
            onClick={() => handleStarClick("intermediate")}
            className="relative w-60 xs:w-64 sm:w-72 md:w-52 lg:w-72 xl:w-[22rem] flex-shrink-0 
                                  md:mb-8 lg:mb-14 xl:mb-20
                                  transition-all duration-300 ease-in-out
                                  hover:scale-110 hover:-translate-y-2
                                  active:scale-105 active:translate-y-0
                                  cursor-pointer group"
          >
            <img
              src={Star}
              alt="Star"
              className="w-full h-auto drop-shadow-lg
                                     group-hover:drop-shadow-2xl group-hover:brightness-110
                                     transition-all duration-300"
            />
            <p
              className="absolute inset-0 flex items-center justify-center 
                                    px-7 xs:px-8 sm:px-10 md:px-5 lg:px-10 xl:px-12
                                    py-8 pt-11 xs:py-10 sm:py-12 md:py-6 lg:py-12 xl:py-14
                                    text-center text-black font-bold 
                                    text-sm xs:text-base sm:text-lg md:text-xs lg:text-lg xl:text-xl
                                    leading-snug tracking-tight
                                    group-hover:scale-105 transition-transform duration-300"
            >
              May kaunti,
              <br />
              ngunit limitadong
              <br />
              kaalaman lamang
              <br />
              sa Cebuano.
            </p>
          </button>

          <button
            onClick={() => handleStarClick("advanced")}
            className="relative w-60 xs:w-64 sm:w-72 md:w-52 lg:w-72 xl:w-[22rem] flex-shrink-0
                                 transition-all duration-300 ease-in-out
                                 hover:scale-110 hover:-translate-y-2
                                 active:scale-105 active:translate-y-0
                                 cursor-pointer group"
          >
            <img
              src={Star}
              alt="Star"
              className="w-full h-auto drop-shadow-lg
                                     group-hover:drop-shadow-2xl group-hover:brightness-110
                                     transition-all duration-300"
            />
            <p
              className="absolute inset-0 flex items-center justify-center 
                                        px-6 xs:px-7 sm:px-9 md:px-4 lg:px-9 xl:px-11
                                        py-8 pt-12 xs:py-10 sm:py-12 md:py-6 lg:py-12 xl:py-14
                                        text-center text-black font-bold 
                                        text-sm xs:text-base sm:text-lg md:text-[0.65rem] lg:text-sm xl:text-xl
                                        leading-snug tracking-tight
                                        group-hover:scale-105 transition-transform duration-300"
            >
              Marunong <br />
              ako ng ilang salita at
              <br /> kaya kong makipag-
              <br />
              usap sa simpleng
              <br />
              Cebuano.
            </p>
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default CebuanoKnowledge;
