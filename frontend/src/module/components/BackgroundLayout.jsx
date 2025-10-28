import React from "react";
import FlagBackground from "../../assets/LingGO Background.png";

function BackgroundLayout({ children }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={FlagBackground}
        alt="Flag Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "blur(2px)" }}
      />
      {/* Color Overlay */}
      <div className="absolute inset-0 bg-[#ff5757] opacity-60 z-10"></div>
      {/* Page Content */}
      <div className="relative z-20 w-full flex flex-col">{children}</div>
    </div>
  );
}

export default BackgroundLayout;
