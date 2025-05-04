// src/app/api/posts/create/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Define a type for the expected body structure
interface PostBody {
  mediaUrl: string;
  caption: string;
  type: "image" | "video"; // Assuming only "image" and "video" are allowed
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body: PostBody = await req.json(); // Explicitly type the body

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { mediaUrl, caption, type } = body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newPost = await prisma.post.create({
      data: {
        mediaUrl,
        caption,
        type,
        author: { connect: { id: user.id } },
      },
    });

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (err) {
    console.error("Post creation error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
