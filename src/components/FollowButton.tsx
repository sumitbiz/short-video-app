"use client";

import { useState } from "react";

interface FollowButtonProps {
  targetUserId: string; // Target user jise follow ya unfollow karna hai
  isFollowing: boolean; // true/false - Check karna ki follow hai ya nahi
}

export default function FollowButton({ targetUserId, isFollowing }: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing); // Initial follow state
  const [loading, setLoading] = useState(false); // Loading state jab API request ho raha ho

  // Follow ya Unfollow handle karne wali function
  async function handleFollow() {
    setLoading(true); // Loading ko true set karna hai jab request chal rahi ho

    // API request - Follow/Unfollow karne ke liye
    const res = await fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetUserId }), // Target user ka ID send karna hai
    });

    const data = await res.json();

    if (res.ok) {
      setFollowing(prevState => !prevState); // Toggle follow state based on previous state
    } else {
      alert(data.error || "An error occurred"); // Error message user ko dena
    }

    setLoading(false); // Loading ko false set karenge jab API request complete ho
  }

  return (
    <button
      onClick={handleFollow} // Button click par follow/unfollow handle hoga
      disabled={loading} // Loading state par button disable hoga
      className={`px-4 py-2 rounded ${following ? "bg-red-500" : "bg-blue-500"} text-white`} // Button style
    >
      {loading ? "Please wait..." : following ? "Unfollow" : "Follow"} {/* Button text */}
    </button>
  );
}
