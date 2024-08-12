"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Home = () => {
  return (
    <div>
      <section className="h-[44vh] flex-col gap-7 w-full flex justify-center items-center text-center px-10">
        <div className="flex gap-3 flex-col">
          <h1 className="text-white text-5xl">
            Get Anime Wallpapers Through AI
          </h1>
          <p className="text-white/80 font-medium">
            Generate and download anime wallpapers with AI. That too for free.
          </p>
        </div>
        <div className="flex gap-5">
          <button className="btn border-2 border-dotted border-white/30 font-extrabold">
            Get Started
          </button>
          <button className="btn btn-primary font-extrabold">
            Create Wallpaper
          </button>
        </div>
      </section>

      {/* Image Slider */}
      <section className="w-full mt-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={50}
          slidesPerView={1}
          className="h-[60vh]"
        >
          <SwiperSlide>
            <img
              src="https://i.imgur.com/OeZWb4Z.jpeg "
              alt="Wallpaper 1"
              className="w-full h-full object-cover origin-top "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://i.imgur.com/902VFc1.png"
              alt="Wallpaper 2"
              className="w-full h-full object-cover origin-top"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://i.imgur.com/1JFdwJJ.png"
              alt="Wallpaper 3"
              className="w-full h-full object-cover origin-top"
            />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Footer */}
      <footer className="w-full border-t-2 border-dotted border-white/10 text-white py-6 mt-10">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2024 Anime Wallpaper Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
