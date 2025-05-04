import MediaList from '@/components/MediaList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center p-4">Uploaded Media</h1>
      <MediaList />
    </main>
  );
}
