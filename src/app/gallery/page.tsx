// src/app/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';

const GalleryPage = () => {
  const [media, setMedia] = useState<any[]>([]);

  // Fetch uploaded media data
  useEffect(() => {
    async function fetchMedia() {
      const response = await fetch('/api/media');
      const data = await response.json();
      setMedia(data);
    }

    fetchMedia();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Uploaded Media</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.length > 0 ? (
          media.map((item, index) => (
            <div key={index} className="border p-2 rounded">
              {item.type.startsWith('image') ? (
                <img src={item.url} alt={`Uploaded media ${index}`} className="w-full h-40 object-cover" />
              ) : (
                <video className="w-full h-40 object-cover" controls>
                  <source src={item.url} />
                </video>
              )}
            </div>
          ))
        ) : (
          <p>No media uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
