import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
const Header = async ({
  transparent = false,
}: { transparent?: boolean } = {}) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <div
      className={`flex justify-around items-center h-[10vh] border-b-2 border-dotted border-white/10 ${
        transparent
          ? "backdrop-filter backdrop-blur-lg bg-opacity-50"
          : "bg-opacity-100"
      }`}
    >
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
            {data?.user ? "Create Wallpaper" : "Create Account"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
