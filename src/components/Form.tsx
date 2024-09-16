"use client";
import React from "react";
import { generateAestheticAnimeImage } from "./generate";
import { handleError } from "./utils";

const GenerateForm = ({ userid }: { userid: string }) => {
  const [textPrompt, setTextPrompt] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [deviceType, setDeviceType] = React.useState<"mobile" | "desktop">(
    "mobile"
  );
  const [genre, setGenre] = React.useState<
    "aesthetic" | "horror" | "weird" | "motivating"
  >("motivating");
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [data, setData] = React.useState<any>(null);

  const handleTextPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextPrompt(e.target.value.toLowerCase());
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value.toLowerCase());
  };

  const handleDeviceTypeChange = (device: "mobile" | "desktop") => {
    setDeviceType(device);
  };

  const handleGenreChange = (
    genre: "aesthetic" | "horror" | "weird" | "motivating"
  ) => {
    setGenre(genre);
  };

  let width = deviceType === "mobile" ? 1080 : 1920;
  let height = deviceType === "mobile" ? 1920 : 1080;

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 100 / 59;
      });
    }, 1000);

    const result = await generateAestheticAnimeImage(
      textPrompt,
      width,
      height,
      userid,
      genre
    );

    clearInterval(interval);
    setData(result);

    setLoading(false);
    setProgress(0);
    if (!result) {
      handleError(
        "Please don't use any inappropriate words in the text prompt"
      );
      setTextPrompt("");
    }
  };

  return (
    <form>
      <div className="flex flex-col gap-3">
        <label className="text-white">Text Prompt</label>
        <input
          type="text"
          value={textPrompt}
          onChange={handleTextPromptChange}
          placeholder="Be As Detailed As Possible"
          className="input font-medium border-dotted outline-none border-2 border-white/40 p-2 rounded"
        />
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <label className="text-white">Caption</label>
        <input
          type="text"
          value={caption}
          onChange={handleCaptionChange}
          placeholder="A caption for your wallpaper (optional)"
          className="input font-medium border-dotted outline-none border-2 border-white/40 p-2 rounded"
        />
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <label className="text-white">Device Type</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="radio"
              name="device"
              value="mobile"
              checked={deviceType === "mobile"}
              onChange={() => handleDeviceTypeChange("mobile")}
              className="appearance-none border-dotted border-2 border-white/40 w-4 h-4 checked:border-dotted checked:border-2 checked:bg-white"
            />
            Mobile
          </label>
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="radio"
              name="device"
              value="desktop"
              checked={deviceType === "desktop"}
              onChange={() => handleDeviceTypeChange("desktop")}
              className="appearance-none border-dotted border-2 border-white/40 w-4 h-4 checked:border-dotted cursor-pointer checked:border-2 checked:bg-white"
            />
            Desktop
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <label className="text-white">Genre</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="radio"
              name="genre"
              value="aesthetic"
              checked={genre === "aesthetic"}
              onChange={() => handleGenreChange("aesthetic")}
              className="appearance-none border-dotted border-2 border-white/40 w-4 h-4 checked:border-dotted checked:border-2 checked:bg-white"
            />
            Aesthetic
          </label>
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="radio"
              name="genre"
              value="horror"
              checked={genre === "horror"}
              onChange={() => handleGenreChange("horror")}
              className="appearance-none border-dotted border-2 border-white/40 w-4 h-4 checked:border-dotted checked:border-2 checked:bg-white"
            />
            Horror
          </label>
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="radio"
              name="genre"
              value="weird"
              checked={genre === "weird"}
              onChange={() => handleGenreChange("weird")}
              className="appearance-none border-dotted border-2 border-white/40 w-4 h-4 checked:border-dotted checked:border-2 checked:bg-white"
            />
            Weird
          </label>
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="radio"
              name="genre"
              value="motivating"
              checked={genre === "motivating"}
              onChange={() => handleGenreChange("motivating")}
              className="appearance-none border-dotted border-2 border-white/40 w-4 h-4 checked:border-dotted checked:border-2 checked:bg-white"
            />
            Motivating
          </label>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="btn btn-primary mt-4"
        disabled={loading}
      >
        Generate
      </button>
      {loading && (
        <div className="mt-2">
          {progress > 0 && progress < 100 ? (
            <span className="text-white/80">
              {progress.toFixed(2)}% complete
            </span>
          ) : null}
          <br />
          <small className="text-white/80">
            Note: average time taken is 1 minute to generate the wallpaper
          </small>
          <div className="progress-bar mt-4">
            <div
              className="progress-bar-inner"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {data && (
        <>
          <h1 className="text-white mt-4 text-2xl">Your Generated Image</h1>
          <img
            className="mt-4 w-96 object-cover object-center rounded-[5px] border-2 border-white/30"
            src={data}
          />
          {data}
        </>
      )}
    </form>
  );
};

export default GenerateForm;
