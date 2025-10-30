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

  return (
    <div className="flex justify-between gap-15 items-center h-10 py-10 px-1 mt-2">
      <div className="flex items-center gap-4 h-10">
        <div>
          <img src={Logo} alt="" className="h-25 w-auto object-contain" />
        </div>

        <div>
          <div className="font-bold w-40">
            <span>{user ? user.Pangkat : "Pangkat"} </span>
            <span>At </span>
            <span>{user ? user.Baitang : "Baitang"}</span>
          </div>

          <div className="font-bold">
            <span>
              {user ? user["Unang Pangalana"] || user.Username : "Name"}
            </span>
          </div>
        </div>
      </div>

      <div>
        <img src={Star} alt="" className="h-15 w-auto object-contain" />
      </div>
    </div>
  );
}

export default PageHeaderLayout;
