'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ThemeSwitcher from './ThemeSwitcher';
import PremiumButton from './PremiumButton'; // Import our new button
import { useAccount } from 'wagmi'; // Import the base hook from wagmi

const navItems = [
  { href: '/', label: 'Swipe' },
  { href: '/matches', label: 'Matches' },
  { href: '/events', label: 'Events' },
  { href: '/settings', label: 'Settings' },
];

const Navbar = () => {
  const pathname = usePathname();
  // We use the useAccount hook to get the connection status directly.
  const { isConnected } = useAccount(); 

  return (
    <header className="sticky top-0 z-50 w-full bg-white/5 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-[rgb(var(--pink-primary))]">
          Vibe
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={label} href={href} className={`font-semibold transition-colors duration-200 relative ${isActive ? 'text-[rgb(var(--pink-primary))]' : 'hover:text-[rgb(var(--pink-primary))]'}`}>
                {label}
                {isActive && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[rgb(var(--pink-primary))] rounded-full"></span>}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          {/* We only show the Premium button if a wallet is connected */}
          {isConnected && <PremiumButton />}
          <div className="hidden md:block">
            <ConnectButton showBalance={false} chainStatus="icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;