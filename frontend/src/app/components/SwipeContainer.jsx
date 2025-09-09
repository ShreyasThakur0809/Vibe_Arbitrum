'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Heart, X, Star } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

import 'swiper/css';
import 'swiper/css/effect-cards';

function SwipeContainer() {
  const { user } = useAuth();
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/users`);
        const allUsers = await response.json();
        const otherUsers = allUsers.filter(u => u.id !== user.id);
        setPotentialMatches(otherUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  const createMatch = async (likedUserId) => {
    // ... same createMatch logic ...
  };

  const handleSwipeAction = (direction) => {
    if (!swiperRef.current || swiperRef.current.isEnd) return;
    const swiper = swiperRef.current;
    const swipedUser = potentialMatches[swiper.activeIndex];
    if (direction === 'right') {
      createMatch(swipedUser.id);
    }
    swiper.slideNext();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // If there are no users to swipe, show the "All Vibed Out" message.
  if (potentialMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h3 className="text-2xl font-bold">All Vibed Out!</h3>
        <p className="opacity-70 mt-2 max-w-sm">There are no new profiles to show right now. Check back later!</p>
      </div>
    );
  }

  // **THE FIX**: The entire UI, including the buttons, is now rendered together.
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[350px] h-[550px]"
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        cardsEffect={{ slideShadows: false }}
      >
        {potentialMatches.map((match) => {
          // This logic now correctly uses your S3 URL first.
          const imageUrl = match.profilePictureUrl;
          return (
            <SwiperSlide key={match.uuid} className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
              <div 
                style={{ backgroundImage: `url(${imageUrl})` }} 
                className="relative w-full h-full bg-cover bg-center"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 w-full p-6 text-white">
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-bold">{match.username}</h3>
                    {match.isPremium && <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />}
                  </div>
                  <p className="text-white/80 mt-1">{match.bio || 'Ready for a new adventure!'}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <SwiperSlide className="rounded-2xl flex items-center justify-center bg-transparent">
          <div className="flex flex-col items-center justify-center h-full text-center glass-card w-full">
            <h3 className="text-2xl font-bold">No More Profiles</h3>
            <p className="opacity-70 mt-2 max-w-sm">You've seen everyone.</p>
          </div>
        </SwiperSlide>
      </Swiper>
      
      {/* These buttons will now always be visible when there are cards to swipe. */}
      <div className="flex items-center gap-6">
        <button onClick={() => handleSwipeAction('left')} className="p-5 rounded-full glass-card hover:border-pink-500/50 transition-all duration-300 hover:scale-110">
          <X size={32} className="text-red-500" />
        </button>
        <button onClick={() => handleSwipeAction('right')} className="p-5 rounded-full glass-card bg-pink-500/20 border-pink-500/50 hover:bg-pink-500/40 transition-all duration-300 hover:scale-110">
          <Heart size={32} className="text-pink-400" />
        </button>
      </div>
    </div>
  );
}

export default SwipeContainer;