"use server";
import { Client } from "@gradio/client";
import toast from "react-hot-toast";

export const generateAestheticAnimeImage = async (
  textPrompt: string,
  width: number,
  height: number,
  model: "dalle" | "midjourney" | "stable-diffusion"
) => {
  try {
    const client = await Client.connect("mukaist/DALLE-4K");
    const res: any = await client.predict("/run", {
      prompt: `${textPrompt}, aesthetic, soft lighting, delicate details, elegant composition, muted colors, Studio Ghibli style`,
      style: "Anime",
      seed: 0,
      width: width,
      height: height,
      guidance_scale: 7.5,
      randomize_seed: true,
    });

    // const resData: any = [
    //   [
    //     {
    //       image: {
    //         path: "/tmp/gradio/b6e212221d77be2c6ca4d89f1aad06f0294d8a13/e76b25bd-afd5-477e-a04d-285781432596.png",
    //         url: "https://mukaist-dalle-4k.hf.space/file=/tmp/gradio/b6e212221d77be2c6ca4d89f1aad06f0294d8a13/e76b25bd-afd5-477e-a04d-285781432596.png",
    //         size: null,
    //         orig_name: "e76b25bd-afd5-477e-a04d-285781432596.png",
    //         mime_type: null,
    //         is_stream: false,
    //         meta: { _type: "gradio.FileData" },
    //       },
    //       caption: null,
    //     },
    //     {
    //       image: {
    //         path: "/tmp/gradio/649ef193e656c5887938f75315033c4a0ef71a79/3d89f4d6-8edd-4f5a-849e-e481573bd9a9.png",
    //         url: "https://mukaist-dalle-4k.hf.space/file=/tmp/gradio/649ef193e656c5887938f75315033c4a0ef71a79/3d89f4d6-8edd-4f5a-849e-e481573bd9a9.png",
    //         size: null,
    //         orig_name: "3d89f4d6-8edd-4f5a-849e-e481573bd9a9.png",
    //         mime_type: null,
    //         is_stream: false,
    //         meta: { _type: "gradio.FileData" },
    //       },
    //       caption: null,
    //     },
    //   ],
    //   25602384,
    // ];

    // log the url
    return res.data[0][0].image.url;
  } catch (error: any) {
    console.error("Error generating aesthetic anime image:", error);
    return null;
  }
};
