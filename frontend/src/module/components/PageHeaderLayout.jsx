import React, { useEffect, useState } from "react";
import Logo from "../../assets/LingGO Logo.png";
import Star from "../../assets/star.png";

function PageHeaderLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("linggoUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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

  const gradeDisplay = user
    ? `${getGradeNumber(user.Baitang)}-${user.Pangkat}`
    : "Pangkat at Baitang";

  return (
    <div className="flex justify-between items-center px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
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
            {user ? user["Unang Pangalana"] || user.Username : "Juan Dela Cruz"}
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
    </div>
  );
}

export default PageHeaderLayout;