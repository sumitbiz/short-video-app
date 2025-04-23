// src/app/dashboard.tsx
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please sign in first.</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Your email: {session.user?.email}</p>
      <img src={session.user?.image || "/default-avatar.png"} alt="Avatar" />
    </div>
  );
}
