'use client';

import React from 'react';
import {
  RainbowKitProvider,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { arbitrumSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const config = getDefaultConfig({
  appName: 'Vibe Social',
  projectId: 'YOUR_PROJECT_ID', // IMPORTANT: Get a free ID from https://cloud.walletconnect.com
  chains: [arbitrumSepolia],
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

