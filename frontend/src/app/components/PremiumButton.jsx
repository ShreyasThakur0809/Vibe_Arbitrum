'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { VibePaymentsABI } from '../../../contracts/VibePaymentsABI.js'; // CORRECTED PATH
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const PremiumButton = () => {
  const { user, setUser } = useAuth();
  const { data: hash, isPending, writeContract } = useWriteContract();

  const handlePurchase = () => {
    writeContract({
      address: contractAddress,
      abi: VibePaymentsABI,
      functionName: 'purchaseMembership',
      value: parseEther('10'),
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  
  useEffect(() => {
    if (isConfirmed && user) {
        setUser({ ...user, isPremium: true });
    }
  }, [isConfirmed, user, setUser]);

  // Don't show the button if there is no user or if they are already premium.
  if (!user || user.isPremium) {
    // If they are premium, show the badge. Otherwise, show nothing.
    return user?.isPremium ? (
        <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-yellow-400 bg-yellow-400/10 rounded-full">
            <Star size={16} className="fill-yellow-400" />
            <span>Premium</span>
        </div>
    ) : null;
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={isPending || isConfirming}
      className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-pink-600 rounded-full hover:bg-pink-700 transition-all duration-300 disabled:opacity-50"
    >
      <Star size={16} />
      <span>
        {isPending && 'Check Wallet...'}
        {isConfirming && 'Confirming...'}
        {!isPending && !isConfirming && 'Go Premium'}
      </span>
    </button>
  );
};

export default PremiumButton;