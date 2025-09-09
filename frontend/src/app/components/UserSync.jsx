'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

const UserSync = () => {
  const { address, isConnected } = useAccount();
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    if (isConnected && address && !isSynced) {
      const syncUser = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              walletAddress: address, 
              username: `user_${address.slice(0, 6)}...` 
            }),
          });

          if (response.ok || response.status === 400) { 
            console.log('User synced successfully or already exists.');
            setIsSynced(true);
          } else {
             const errorData = await response.json();
             console.error('Failed to sync user:', errorData.error);
          }
        } catch (error)          {
          console.error('An error occurred while syncing user:', error);
        }
      };
      syncUser();
    } else if (!isConnected) {
        setIsSynced(false);
    }
  }, [address, isConnected, isSynced]);

  return null; 
};

export default UserSync;
