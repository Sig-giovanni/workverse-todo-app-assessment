import { pusher } from "@/lib/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const payload = await req.json();

  await pusher.trigger("presence-cache-task", "tasks-updated", payload);

  return NextResponse.json({ status: 200 });
}
