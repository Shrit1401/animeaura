import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-around items-center h-[10vh] border-b-2 border-dotted border-white/10">
      <Link href="/">
        <div className="font-bold btn btn-ghost text-white text-2xl">
          animeaura
        </div>
      </Link>
      <div className="flex gap-2">
        <Link href="/">
          <button className="btn btn-ghost">Home</button>
        </Link>

        <Link href="/create">
          <button className="btn btn-primary font-extrabold">
            Create Wallpaper
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
