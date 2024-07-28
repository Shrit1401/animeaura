import GenerateForm from "@/components/Form";
import React from "react";

const WallpaperCreate = () => {
  return (
    <div className="px-5">
      <h1 className="text-white text-4xl md:text-5xl">Generate Wallpaper</h1>
      <section className="mt-5">
        <GenerateForm />
      </section>
    </div>
  );
};

export default WallpaperCreate;
