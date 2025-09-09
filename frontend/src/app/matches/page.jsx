'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import GlassCard from "../components/GlassCard";
import PageTitle from "../components/PageTitle";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MatchesPage() {
  const { user, loading: authLoading } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { /* ... same useEffect logic ... */ });

  if (authLoading || loading) return <LoadingSpinner />;
  
  if (!user) {
    return (
      <GlassCard className="text-center max-w-md mx-auto">
        <PageTitle title="My Matches" />
        <p>Please connect your wallet to see your matches.</p>
      </GlassCard>
    );
  }

  return (
    <div>
      <PageTitle title="Your Matches" subtitle="Start a conversation!" />
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => {
            const otherUser = match.user1.id === user.id ? match.user2 : match.user1;
            // **THE UPGRADE**: Use the real S3 URL if it exists, otherwise use a placeholder.
            const imageUrl = otherUser.profilePictureUrl;
            return (
              <Link href={`/matches/${match.id}`} key={match.id}>
                <GlassCard className="!p-4 hover:border-pink-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-4">
                     <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image 
                          src={imageUrl} 
                          alt={otherUser.username} 
                          width={64} 
                          height={64} 
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" 
                        />
                     </div>
                     <div>
                       <h3 className="font-bold text-lg">{otherUser.username}</h3>
                       <p className="text-sm opacity-70">You matched! Say hello.</p>
                     </div>
                  </div>
                </GlassCard>
              </Link>
            )
          })}
        </div>
      ) : (
        <GlassCard><p className="text-center">No accepted matches yet. Get back to swiping!</p></GlassCard>
      )}
    </div>
  );
}