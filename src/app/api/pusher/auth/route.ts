import { pusher } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";

export async function POST(req: NextRequest) {
  const text = await new Response(req.body).text();
  const data = qs.parse(text);
  console.log(data);

  // Type assertion and default value
  const socket_id = data.socket_id as string;
  const channel_name = data.channel_name as string;
  const username = data.username as string;
  const avatar = data.avatar as string;

  const randomString = Math.random().toString(36).slice(2);

  const presenceData = {
    user_id: randomString,
    user_info: {
      name: username,
      avatar,
    },
  };

  try {
    const authResponse = pusher.authenticate(
      socket_id,
      channel_name,
      presenceData
    );
    console.log(authResponse);
    return NextResponse.json(authResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
