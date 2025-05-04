import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Check if the user is logged in
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { receiverId, content } = await req.json();
  const senderId = session.user.id;

  // Ensure receiverId and content are provided
  if (!receiverId || !content) {
    return NextResponse.json({ error: "Receiver or message content is missing" }, { status: 400 });
  }

  // Send the message
  const message = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
  });

  return NextResponse.json({ message: "Message sent successfully", message });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Get messages for the logged-in user
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId },
      ],
    },
    include: {
      sender: { select: { name: true, email: true } },
      receiver: { select: { name: true, email: true } },
    },
    orderBy: {
      createdAt: "asc", // Order messages by timestamp
    },
  });

  return NextResponse.json({ messages });
}
