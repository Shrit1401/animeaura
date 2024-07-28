import React from "react";

const Home = () => {
  return (
    <section className="h-[44vh] flex-col gap-10 w-full flex justify-center items-center">
      <h1 className="text-white text-5xl text-center">
        Get Anime Wallpapers Through AI
      </h1>
      <div className="flex gap-5">
        <button className="btn border-2 border-dotted border-white/30  font-extrabold">
          Get Started
        </button>
        <button className="btn btn-primary font-extrabold">
          Create Wallpaper
        </button>
      </div>
    </section>
  );
};

export default Home;
