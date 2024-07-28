import React from "react";

const Home = () => {
  return (
    <section className="h-[44vh] flex-col gap-7 w-full flex justify-center items-center text-center px-10">
      <div className="flex gap-3 flex-col">
        <h1 className="text-white text-5xl">Get Anime Wallpapers Through AI</h1>
        <p className="text-white/80 font-medium">
          Generate and download anime wallpapers with AI. That too for free.
        </p>
      </div>
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
