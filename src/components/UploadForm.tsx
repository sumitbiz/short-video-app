'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/media', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Upload successful!');
      location.reload(); // Refresh to show in MediaList
    } else {
      alert('Upload failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex gap-2 items-center">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
    </form>
  );
}
