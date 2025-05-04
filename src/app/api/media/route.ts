// src/app/api/media/route.ts
import fs from 'fs';
import path from 'path';

export async function GET() {
  const uploadDirectory = path.join(process.cwd(), 'public/uploads');

  // Check if the uploads directory exists, create it if not
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
  }

  // Read files from the uploads directory
  const files = fs.readdirSync(uploadDirectory);

  // Map over the files and return their details
  const media = files.map((file) => {
    const filePath = path.join(uploadDirectory, file);
    const fileStats = fs.statSync(filePath);

    return {
      url: `/uploads/${file}`,  // URL for accessing the file in public directory
      type: file.split('.').pop(), // Extract file extension for type (image or video)
      name: file,  // File name
    };
  });

  // Return the media list as a JSON response
  return new Response(JSON.stringify(media), {
    headers: { 'Content-Type': 'application/json' },
  });
}
