import 'dotenv/config';
import * as ethers from 'ethers';
import * as userService from '../services/userService.js';

import contractJson from '../../artifacts/contracts/VibePayments.sol/VibePayments.json' with { type: 'json' };

const contractABI = contractJson.abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
// This is the crucial line that reads from your .env file
const rpcUrl = process.env.ARBITRUM_SEPOLIA_RPC_URL;

export async function startIndexer() {
    if (!contractAddress || !rpcUrl) {
        console.warn('ARBITRUM_SEPOLIA_RPC_URL or CONTRACT_ADDRESS not found in .env. Indexer will not start.');
        return;
    }

    console.log('🚀 Starting blockchain indexer...');
    // This line uses the rpcUrl variable defined above
    const provider = new ethers.JsonRpcProvider(rpcUrl); 
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    console.log(`   Listening to contract at: ${contractAddress}`);
    console.log(`   Using RPC endpoint: ${rpcUrl}`); // This log will now show your Alchemy URL

    contract.on('MembershipPurchased', async (payer, amount, timestamp, event) => {
        console.log('--- 🎉 MembershipPurchased Event Received! ---');
        const paymentData = {
            walletAddress: payer.toLowerCase(),
            txHash: event.log.transactionHash,
            amount: parseFloat(ethers.formatUnits(amount, 18)),
            paidAt: new Date(Number(timestamp) * 1000),
        };
        try {
            await userService.recordPremiumPayment(paymentData);
            console.log(`✅ Successfully processed payment and upgraded user.`);
        } catch (error) {
            console.error('❌ Error processing event:', error.message);
        }
    });

    console.log('   Indexer is now live and listening for events...');
}