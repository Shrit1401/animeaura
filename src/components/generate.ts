"use server";
import { Client } from "@gradio/client";

export const generateImage = async (
  textPrompt: string,
  caption: string,
  width: number,
  height: number
) => {
  try {
    const client = await Client.connect("mukaist/DALLE-4K");
    const result = await client.predict("/run", {
      prompt: textPrompt,
      style: "Anime",
      seed: 0,
      width: width,
      height: height,
      guidance_scale: 6,
      randomize_seed: true,
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
