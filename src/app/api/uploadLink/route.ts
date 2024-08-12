import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: NextRequest) {
  const { link } = await req.json();

  if (!link) {
    return NextResponse.json({ error: "Link is required" }, { status: 400 });
  }

  try {
    const clientId = process.env.IMGUR_CLIENT_ID;

    if (!clientId) {
      return NextResponse.json(
        { error: "Imgur client ID not configured" },
        { status: 500 }
      );
    }

    const response = await axios.post(
      "https://api.imgur.com/3/image",
      {
        image: link,
        type: "url",
      },
      {
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error uploading link to Imgur:", error);
    return NextResponse.json(
      { error: "Failed to upload link to Imgur" },
      { status: 500 }
    );
  }
}
