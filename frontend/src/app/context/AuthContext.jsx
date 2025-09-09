'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { address, isConnected, isConnecting } = useAccount();

  useEffect(() => {
    const syncUser = async () => {
      // 1. Check if a wallet is connected and we have an address
      if (isConnected && address) {
        console.log(`AuthContext: Wallet connected with address ${address}. Attempting to sync...`);
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          console.log(`AuthContext: Calling backend API at ${apiUrl}/users/sync`);

          // 2. Call our backend to get the full user profile
          const response = await fetch(`${apiUrl}/users/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: address }),
          });
          
          const userData = await response.json();

          if (response.ok) {
            // 3. Success! Save the user profile in our app's central state
            console.log('AuthContext: Sync successful. User profile received:', userData);
            setUser(userData);
          } else {
            // This handles errors sent from the backend (like validation errors)
            throw new Error(userData.error || `Server responded with status ${response.status}`);
          }
        } catch (error) {
          // This handles network errors (like if the backend is not running)
          console.error("AuthContext: Sync Error!", error);
          setUser(null); // Ensure user is logged out on any error
        }
      } else if (!isConnecting) {
        // 4. If no wallet is connected, clear the user state
        setUser(null);
      }
    };

    syncUser().finally(() => {
        setLoading(false)
        console.log("AuthContext: Initial auth check complete.");
    });

  }, [address, isConnected, isConnecting]);

  const value = { user, setUser, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

