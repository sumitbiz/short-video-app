import { useEffect, useState } from "react";
import FollowButton from "@/components/FollowButton"; // Ensure the correct import path

// Define the User interface
interface User {
  id: string;
  name: string;
  bio: string | null;  // Bio can be null or string
  // Add other fields as needed
}

const UserProfilePage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params; // Get the userId from the URL
  const [user, setUser] = useState<User | null>(null); // Type the user state as User | null
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // Error handling state

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch(`/api/users/${userId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await res.json();
        setUser(data.user);
        setIsFollowing(data.isFollowing); // Set initial follow state
      } catch (err) {
        setError("There was an issue fetching user data.");
      } finally {
        setLoading(false); // Stop loading after data is fetched or error occurs
      }
    }

    fetchUserData();
  }, [userId]);

  // If still loading, show loading indicator
  if (loading) return <div>Loading...</div>;

  // If error occurs, display error message
  if (error) return <div>{error}</div>;

  // If user data is missing, handle that gracefully
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>{user.bio || "No bio available"}</p>

      {/* Include the FollowButton component */}
      <FollowButton targetUserId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserProfilePage;
