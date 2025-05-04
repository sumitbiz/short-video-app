import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure correct import
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure auth config is correct

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if the user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId } = await req.json();
    const currentUserEmail = session.user.email;

    // Ensure targetUserId is provided
    if (!targetUserId) {
      return NextResponse.json({ error: "Target user ID is missing" }, { status: 400 });
    }

    // Fetch the current user from the database
    const currentUser = await prisma.user.findUnique({
      where: { email: currentUserEmail },
    });

    // If the current user doesn't exist, return an error
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch the target user to ensure they exist
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    // If the target user doesn't exist, return an error
    if (!targetUser) {
      return NextResponse.json({ error: "Target user not found" }, { status: 404 });
    }

    // Check if the current user is already following the target user
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followedId: {
          followerId: currentUser.id,
          followedId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      // If already following, unfollow the target user
      await prisma.follow.delete({
        where: { id: existingFollow.id },
      });
      return NextResponse.json({ message: "Unfollowed successfully", following: false });
    } else {
      // If not following, follow the target user
      await prisma.follow.create({
        data: {
          followerId: currentUser.id,
          followedId: targetUserId,
        },
      });
      return NextResponse.json({ message: "Followed successfully", following: true });
    }
  } catch (error) {
    console.error("Error processing follow/unfollow:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
