'use client';

import SwipeContainer from "./components/SwipeContainer";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";
import GlassCard from "./components/GlassCard";
import PageTitle from "./components/PageTitle";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-full">
      {!user ? (
        <GlassCard className="text-center max-w-md mx-auto mt-20">
          <PageTitle title="Welcome to Vibe" />
          <p className="opacity-80">Please connect your wallet to start discovering new people.</p>
        </GlassCard>
      ) : (
        <div className="h-[calc(100vh-8rem)] -m-8">
          <SwipeContainer />
        </div>
      )}
    </div>
  );
}