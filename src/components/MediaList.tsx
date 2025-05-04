'use client';

import { useEffect, useState } from 'react';

type MediaItem = {
  name: string;
  url: string;
  type: 'image' | 'video';
};

export default function MediaList() {
  const [media, setMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const res = await fetch('/api/media');
      const data = await res.json();
      setMedia(data);
    };
    fetchMedia();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">📸 Uploaded Media Gallery</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {media.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative group">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="p-3 bg-gray-50 text-center">
              <p className="text-sm font-medium text-gray-700 truncate">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
