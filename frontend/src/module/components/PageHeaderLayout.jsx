// ...existing code...
import React from "react";
import Logo from "../../assets/LingGO Logo.png";
import Star from "../../assets/star.png";

function PageHeaderLayout({}) {
  return (
    <div className="flex justify-center gap-15 items-center h-10 py-10 px-1 mt-2">
      <div className="flex items-center gap-4 h-10">
        <div>
          {/* fixed: use w-auto and object-contain to preserve aspect ratio */}
          <img src={Logo} alt="" className="h-20 w-auto object-contain" />
        </div>

        <div>
          <div className="font-bold w-40">
            <span>Pangkat {""}</span>
            <span>At {""}</span>
            <span>Baitang</span>
          </div>

          <div className="font-bold">
            <span>Name</span>
          </div>
        </div>
      </div>

      <div>
        <img src={Star} alt="" className="h-25 w-auto object-contain" />
      </div>
    </div>
  );
}

export default PageHeaderLayout;
