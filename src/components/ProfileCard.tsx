import React from "react";

// Define the properties (props) the ProfileCard component will accept
interface ProfileCardProps {
  name: string;
  image: string;
  followersCount: number;
  followingCount: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, image, followersCount, followingCount }) => {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={image} alt={name} className="rounded-full w-32 h-32" />
      </div>
      <div className="profile-info">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-500">Followers: {followersCount}</p>
        <p className="text-gray-500">Following: {followingCount}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
