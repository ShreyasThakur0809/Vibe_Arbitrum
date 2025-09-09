'use client';

import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import PageTitle from '../../components/PageTitle';
import GlassCard from '../../components/GlassCard';

export default function ChatPage({ params }) {
  const matchName = "Priya";

  return (
    <div>
      <div className="flex items-center gap-4">
        <Link href="/matches" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft />
        </Link>
        <PageTitle title={`Chat with ${matchName}`} />
      </div>
      
      <GlassCard className="h-[calc(100vh-16rem)] mt-4 !p-0 flex flex-col overflow-hidden">
        <div className="flex-grow p-4 sm:p-6 space-y-6 overflow-y-auto">
          {/* Example Messages */}
          <div className="flex justify-start"><div className="bg-gray-700/50 p-3 rounded-t-xl rounded-br-xl max-w-xs">Hey! So glad we matched. 😊</div></div>
          <div className="flex justify-end"><div className="bg-[rgb(var(--pink-primary))] bg-opacity-80 text-white p-3 rounded-t-xl rounded-bl-xl max-w-xs">Me too! Your profile is awesome.</div></div>
        </div>
        <div className="p-4 border-t border-white/20 bg-black/10">
          <div className="relative">
            <input type="text" placeholder="Type a message..." className="w-full bg-white/10 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--pink-primary))]" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/70 hover:bg-pink-500/50 hover:text-white transition-colors">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}