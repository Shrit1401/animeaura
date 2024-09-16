"use server";
import { createClient } from "@/utils/supabase/server";
import OpenAI from "openai";

const supabase = createClient();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TEST_MODE = false;

const GENRES = {
  aesthetic: `Create a stunning anime wallpaper featuring a serene landscape with soft pastel colors, gentle sunlight, and elegant cherry blossoms. The scene should be calming and visually appealing, with a dreamy atmosphere. Use a blend of anime and manga art styles, showcasing characters with large, expressive eyes, exaggerated proportions, and dynamic poses. Employ soft cell shading to create a gentle, rounded appearance, and include intricate background details with atmospheric lighting reminiscent of visual novels. This wallpaper should merge traditional and contemporary artistic methods, presenting a modern, stylized interpretation of anime and manga.`,
  horror: `Design a chilling anime wallpaper set in a misty mansion with eerie shadows and dim lighting to create an unsettling atmosphere. Use a dark color palette with hints of deep red to set a creepy tone. Depict the main character with an unsettling form and intense, glowing eyes. Include chaotic lines to suggest confusion and mysterious abstract shapes in the background to hint at hidden forces. Add a distorted logo for a touch of warped familiarity and unusual forms to enhance the otherworldly nature of the scene. This wallpaper should blend traditional anime style with surreal, nightmarish elements, emphasizing a sense of fear and intrigue.`,
  weird: `Generate a surreal and bizarre anime wallpaper featuring a world with reversed gravity, floating islands connected by glowing, twisted vines, and fantastical creatures. Use a colorful, strange sky and a creepy glitch aesthetic with distorted pixels, digital artifacts, and unnatural glowing colors like toxic greens and electric blues. Include warped faces or body parts emerging from static-like textures and corrupted text with unsettling symbols. Blur the edges and smear details to create an uneasy atmosphere. Hidden, creepy elements in the background should invite closer inspection while repelling the viewer. This wallpaper should merge digital corruption with unsettling imagery for a visually striking, deeply disturbing effect.`,
  motivating: `Create an empowering and motivating anime wallpaper featuring a heroic character standing on a mountain peak, gazing at a radiant sunrise. The scene should be vibrant and energetic, symbolizing strength, courage, and determination. Use bold, harmonious colors to create a visually captivating composition. The character's silhouette should convey strength and confidence, inspiring viewers to persevere and strive for greatness. Incorporate motivational text seamlessly into the image to enhance the message of empowerment. The abstract background should represent challenges while infusing elements of hope and possibility. This wallpaper should radiate a powerful message of perseverance and success.`,
};

const generatePrompt = (textPrompt: string, genre: keyof typeof GENRES) =>
  `${GENRES[genre]} Incorporate the following user prompt: ${textPrompt}`;

const fetchGeneratedImage = async (prompt: string) => {
  if (TEST_MODE) return "https://i.imgur.com/mMYrZPz.jpeg";

  const response = await client.images.generate({
    prompt,
    size: "1024x1024",
    model: "dall-e-3",
    n: 1,
  });

  const imageUrl = response.data[0]?.url;
  if (!imageUrl) throw new Error("Image URL not found in the response");
  return imageUrl;
};

const uploadImage = async (
  imageUrl: string,
  textprompt: string,
  w: number,
  h: number
) => {
  const { data, error } = await supabase.storage
    .from("posts")
    .upload(`${textprompt}.png`, imageUrl, { contentType: "image/png" });

  if (error) throw new Error("Error uploading image: " + error.message);

  const { data: publicUrlData } = supabase.storage
    .from("posts")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

const insertPost = async (
  userId: string | number,
  textPrompt: string,
  imageUrl: string
) => {
  const { data: postData, error: postsError } = await supabase
    .from("posts")
    .insert({
      name: textPrompt,
      pfp: imageUrl,
      wallpaperurl: imageUrl,
    })
    .select();

  if (postsError)
    throw new Error("Error inserting post: " + postsError.message);
  return postData;
};

export const generateAestheticAnimeImage = async (
  textPrompt: string,
  width: number,
  height: number,
  userId: string,
  genre: keyof typeof GENRES
) => {
  try {
    if (typeof window !== "undefined") {
      const generatedCount = parseInt(
        localStorage.getItem("generatedImageCount") || "0"
      );
      if (generatedCount >= 5)
        throw new Error("You have reached the limit of 5 image generations.");
    }

    const prompt = generatePrompt(textPrompt, genre);
    const imageUrl = await fetchGeneratedImage(prompt);
    const publicUrl = await uploadImage(imageUrl, textPrompt, width, height);
    await insertPost(userId, textPrompt, publicUrl);

    if (typeof window !== "undefined") {
      const currentCount = parseInt(
        localStorage.getItem("generatedImageCount") || "0"
      );
      localStorage.setItem(
        "generatedImageCount",
        (currentCount + 1).toString()
      );
    }

    return publicUrl;
  } catch (error: any) {
    console.error("Error generating aesthetic anime image:", error);
    return null;
  }
};
