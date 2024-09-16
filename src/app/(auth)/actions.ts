"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { handleError } from "@/components/utils";

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    handleError(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);
  const { error: insertError } = await supabase.from("users").insert([
    {
      name: data.email.split("@")[0],
      email: data.email,
      pfp: "https://i.imgur.com/VLrM7tw.png",
    },
  ]);

  if (error) {
    handleError(error);
  }
  if (insertError) {
    handleError(insertError);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
