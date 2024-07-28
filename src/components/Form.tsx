"use client";
import React from "react";
import { generateImage } from "./generate";

const GenerateForm = () => {
  const [textPrompt, setTextPrompt] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [deviceType, setDeviceType] = React.useState<"mobile" | "desktop">(
    "mobile"
  );
  const [loading, setLoading] = React.useState(false);

  const handleTextPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextPrompt(e.target.value.toLowerCase());
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value.toLowerCase());
  };

  const handleDeviceTypeChange = (device: "mobile" | "desktop") => {
    setDeviceType(device);
  };

  const width = deviceType === "mobile" ? 1080 : 1920;
  const height = deviceType === "mobile" ? 1920 : 1080;

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await generateImage(textPrompt, caption, width, height);
      console.log("Generated Image:", result);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
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

      <button
        onClick={handleGenerate}
        className="btn btn-primary mt-4"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
};

export default GenerateForm;
