# Vibe ✨

*A modern social platform that bridges the online-to-offline gap using the trust and transparency of Web3.*

## The Problem We're Solving

Modern social apps have a problem. They've become a game of endless, superficial swiping that rarely leads to real-life connections, leaving users feeling burnt out and isolated. Furthermore, users are forced to trust these centralized platforms with their data, identity, and payments, with little to no transparency.

## Our Solution: Vibe

Vibe is a social connection platform built on two core principles: **authentic experiences** and **verifiable trust**.

1.  **Experience-Driven:** We shift the focus from endless swiping to shared real-world activities. A match isn't the end goal; it's the invitation to an **Event**, closing the online-to-offline gap.
2.  **Trust-Driven:** We use Web3 to solve the trust deficit. Identity is secured by a user's wallet, and premium features are handled by a transparent smart contract, giving users full control and visibility.

---

## 🔑 Key Features

- **📱 Modern & Dynamic UI:** A beautiful, responsive glassmorphism UI built with Next.js and Tailwind CSS, featuring a dynamic theme switcher for light and dark modes.
- **❤️ Intelligent Swiping:** A "dating app" style card-swiping interface that dynamically fetches real user profiles from the backend, complete with high-quality images hosted on a scalable cloud bucket.
- **🤝 Mutual Matching System:** An advanced backend that intelligently detects mutual "likes" and automatically upgrades a pending request to an "accepted" match in real-time.
- **🔐 Web3-Powered Identity:** Secure, passwordless authentication using a crypto wallet (via RainbowKit & Wagmi), with a seamless backend sync to create and retrieve user profiles.
- **💎 On-Chain Premium Memberships:** A "Go Premium" feature that interacts with a live **Solidity smart contract** on the Arbitrum Sepolia testnet to process payments transparently.
- **🏛️ Privacy-by-Design Architecture:** A hybrid model that keeps all sensitive user data (profiles, messages) secure and private in an off-chain database while leveraging the blockchain for trust.

---

## 🛠️ Tech Stack & Architecture

| Category        | Technology                                               |
| :-------------- | :------------------------------------------------------- |
| **Frontend** | Next.js, React, Tailwind CSS, Wagmi, RainbowKit, Swiper.js |
| **Backend** | Node.js, Express.js                                      |
| **Database** | PostgreSQL with Prisma ORM                               |
| **Blockchain** | Solidity, Hardhat, Ethers.js, Arbitrum                   |
| **Cloud Storage** | Amazon S3                                                |
| **Deployment** | Vercel (Frontend, Backend, PostgreSQL)                   |

#### Architecture Diagram
```

[User on Frontend] \<--\> [Vercel-hosted Next.js App]
|                      |
| (API Calls)          | (Wallet Actions)
v                      v
[Vercel-hosted Node.js API] \<--\> [Arbitrum Smart Contract]
|                      | (Indexer Listens)
v                      |
[Vercel PostgreSQL DB] \<--\> [Amazon S3 Image Bucket]
(Private Data)             (Public Media)

````

---

## 🚀 How to Demo (Core User Flow)

1.  **Connect Wallet:** Visit the live app and connect your wallet. A user profile will be automatically created in the backend.
2.  **Swipe Right:** Swipe right or click the heart button on a few profiles. This sends a "pending" match request to the backend.
3.  **Create a Mutual Match:** To simulate a mutual match for the demo, use Postman to send a reverse "like" from one of the profiles you just liked (e.g., `{ "user1Id": 2, "user2Id": 1 }`).
4.  **View Matches:** Navigate to the "Matches" page. You will see your new, accepted match appear, with their real image pulled from the S3 bucket.
5.  **Go Premium (The Web3 Magic):** Click the "Go Premium" button in the navbar. Approve the 10 ARB transaction in your wallet. The UI will instantly update to show your new "Premium" status.

---

## ⚙️ Getting Started: Local Setup

To run this project locally, you will need two separate terminal windows.

### 1. Backend
```bash
# In /backend directory
npm install

# Create and configure your .env file with your database URL,
# Alchemy URL, private key, and deployed contract address.
cp .env.example .env

# Set up the database
npx prisma migrate dev

# Start the server
npm run dev
````

### 2\. Frontend

```bash
# In /frontend directory
npm install

# Create and configure your .env.local file with your backend URL,
# WalletConnect Project ID, and deployed contract address.
touch .env.local

# Start the server
npm run dev
```
