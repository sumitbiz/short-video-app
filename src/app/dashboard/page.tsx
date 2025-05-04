'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const earnings = {
  adEarnings: 150.5,
  customAdsEarnings: 75.2,
};

const posts = [
  { id: 1, title: 'My First Post', views: 120, likes: 30 },
  { id: 2, title: 'Another Great Video', views: 200, likes: 50 },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (status === 'loading') {
    return <p className="text-center mt-10 text-xl font-semibold">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="text-center mt-10">
        <p className="text-2xl font-bold">Access Denied</p>
        <p className="mt-2 text-gray-500">Please sign in to continue.</p>
      </div>
    );
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile as File); // 👈 added 'as File'

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert('File uploaded successfully: ' + data.url);
        setSelectedFile(null); // 👈 now no error here
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* Profile Section */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={session.user?.image || '/default-avatar.png'}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-blue-400"
          />
          <div>
            <h1 className="text-3xl font-bold">{session.user?.name}</h1>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="ml-auto px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Earnings Section */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-100 p-6 rounded-xl text-center">
            <h2 className="text-xl font-bold text-green-800">Ad Earnings</h2>
            <p className="mt-2 text-2xl font-semibold">${earnings.adEarnings.toFixed(2)}</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-xl text-center">
            <h2 className="text-xl font-bold text-purple-800">Custom Ads Earnings</h2>
            <p className="mt-2 text-2xl font-semibold">${earnings.customAdsEarnings.toFixed(2)}</p>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="text-center mb-8">
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 border p-2 rounded-lg"
          />
          <button
            onClick={handleFileUpload}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Upload New Post
          </button>
        </div>

        {/* My Posts Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">My Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600">Views: {post.views} | Likes: {post.likes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Withdraw Earnings Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition">
            Withdraw Earnings (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
