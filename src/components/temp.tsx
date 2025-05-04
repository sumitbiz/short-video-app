// src/components/temp.jsx
'use client';

import React, { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) {
      alert('Please provide all details.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        alert('File uploaded successfully!');
      } else {
        alert('Upload failed!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium">Title</label>
        <input
          type="text"
          id="title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">Description</label>
        <textarea
          id="description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="file" className="block font-medium">Upload File (Image or Video)</label>
        <input
          type="file"
          id="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload</button>
    </form>
  );
};

export default UploadForm;
