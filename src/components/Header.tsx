import React from "react";

const Header = () => {
  return (
    <div className="flex justify-around items-center h-[10vh] border-b-2 border-dotted border-white/10">
      <div className="font-bold btn btn-ghost text-white text-2xl">
        anime aura
      </div>
      <div>
        <button className="btn ">Home</button>
        <button className="btn btn-primary font-extrabold">
          Create Wallpaper
        </button>
      </div>
    </div>
  );
};

export default Header;
