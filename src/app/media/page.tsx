import MediaList from '@/components/MediaList';
import UploadForm from '@/components/UploadForm';

export default function MediaPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Media</h1>
      <UploadForm />
      <MediaList />
    </main>
  );
}
