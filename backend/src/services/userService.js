import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userSelectFields = {
    id: true,
    uuid: true,
    walletAddress: true,
    username: true,
    profilePictureUrl: true,
    bio: true,
    isPremium: true,
};

export const findOrCreateUser = async (userData) => {
    const user = await prisma.user.findUnique({
        where: { walletAddress: userData.walletAddress.toLowerCase() },
        select: userSelectFields,
    });

    if (user) return user;

    return await prisma.user.create({
        data: {
            walletAddress: userData.walletAddress.toLowerCase(),
            username: `user_${userData.walletAddress.slice(0, 6)}...`,
        },
        select: userSelectFields,
    });
};

export const findAllUsers = async () => {
    return await prisma.user.findMany({ select: userSelectFields });
};

export const createUser = async (userData) => {
    return await prisma.user.create({
        data: {
            walletAddress: userData.walletAddress,
            username: userData.username,
            bio: userData.bio,
            profilePictureUrl: userData.profilePictureUrl,
        },
        select: userSelectFields,
    });
};

export const updateUserProfile = async (userId, profileData) => {
    return await prisma.user.update({
        where: { id: userId },
        data: profileData,
        select: userSelectFields,
    });
};

export const recordPremiumPayment = async (paymentData) => {
    const user = await prisma.user.findUnique({
        where: { walletAddress: paymentData.walletAddress },
    });
    if (!user) throw new Error(`User with wallet address ${paymentData.walletAddress} not found.`);

    return await prisma.$transaction(async (tx) => {
        await tx.payment.create({
            data: {
                userId: user.id,
                txHash: paymentData.txHash,
                amount: paymentData.amount,
                paidAt: paymentData.paidAt,
                status: 'completed',
            },
        });
        const updatedUser = await tx.user.update({
            where: { id: user.id },
            data: { isPremium: true },
        });
        return updatedUser;
    });
};