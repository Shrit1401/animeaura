"use server";
import { Client } from "@gradio/client";
import toast from "react-hot-toast";

import axios from "axios";

export const uploadImage = async (url: string) => {
  try {
    console.log("Uploading image to Imgur...", url);

    const res = await axios.post("/api/uploadLink", { url });
    return res.data.link;
  } catch (err) {
    console.log(err);
  }
};

export const generateAestheticAnimeImage = async (
  textPrompt: string,
  width: number,
  height: number,
  model: "dalle" | "midjourney" | "stable-diffusion"
): Promise<string[] | null> => {
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

    //   [
    //     [
    //         {
    //             "image": {
    //                 "path": "/tmp/gradio/b8045f17807a7d8625979268ba696fb9d07cf997/83f6c9d5-571c-4f3b-b7e5-a7111229754d.png",
    //                 "url": "https://mukaist-dalle-4k.hf.space/file=/tmp/gradio/b8045f17807a7d8625979268ba696fb9d07cf997/83f6c9d5-571c-4f3b-b7e5-a7111229754d.png",
    //                 "size": null,
    //                 "orig_name": "83f6c9d5-571c-4f3b-b7e5-a7111229754d.png",
    //                 "mime_type": null,
    //                 "is_stream": false,
    //                 "meta": {
    //                     "_type": "gradio.FileData"
    //                 }
    //             },
    //             "caption": null
    //         },
    //         {
    //             "image": {
    //                 "path": "/tmp/gradio/13b8fe99dc0e203ef654c433b08ca8253b31c137/bbfac7c1-c93c-4417-b24f-61531ab39556.png",
    //                 "url": "https://mukaist-dalle-4k.hf.space/file=/tmp/gradio/13b8fe99dc0e203ef654c433b08ca8253b31c137/bbfac7c1-c93c-4417-b24f-61531ab39556.png",
    //                 "size": null,
    //                 "orig_name": "bbfac7c1-c93c-4417-b24f-61531ab39556.png",
    //                 "mime_type": null,
    //                 "is_stream": false,
    //                 "meta": {
    //                     "_type": "gradio.FileData"
    //                 }
    //             },
    //             "caption": null
    //         }
    //     ],
    //     1557919644
    // ]

    // log the url
    console.log(res.data[0][0].image.url);

    console.log(res.data);

    return res.data;
  } catch (error: any) {
    console.error("Error generating aesthetic anime image:", error);
    return null;
  }
};
