import GenerateForm from "@/components/Form";
import React from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const WallpaperCreate = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/signup");
  }

  return (
    <div className="">
      <img src="./bg/one.png" />
      <section className="mt-5 px-5">
        <GenerateForm userid={data.user.id} />
      </section>
    </div>
  );
};

export default WallpaperCreate;
