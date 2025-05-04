import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma import
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Auth configuration

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use 'user.id' with 'as any' if it's not available in the type
  const userIdFromSession = (session.user as any).id;

  if (!userIdFromSession) {
    return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
  }

  // Fetch user details from the database
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check if the current user is following this user
  const isFollowing = await prisma.follow.findUnique({
    where: {
      followerId_followedId: {
        followerId: userIdFromSession, // Now using the session user ID
        followedId: user.id,
      },
    },
  });

  return NextResponse.json({
    user,
    isFollowing: Boolean(isFollowing), // true/false based on follow status
  });
}
