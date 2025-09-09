import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createMatch = async (user1Id, user2Id) => {
    if (user1Id === user2Id) {
        throw new Error('Users cannot match with themselves.');
    }

    return await prisma.$transaction(async (tx) => {
        const reverseMatch = await tx.match.findFirst({
            where: {
                user1Id: user2Id,
                user2Id: user1Id,
            },
        });

        if (reverseMatch) {
            console.log(`Mutual match found! Updating match ID: ${reverseMatch.id}`);
            return await tx.match.update({
                where: { id: reverseMatch.id },
                data: { status: 'accepted' },
            });
        }

        const existingMatch = await tx.match.findFirst({
            where: {
                user1Id: user1Id,
                user2Id: user2Id,
            },
        });

        if (existingMatch) {
            console.log('Match request already sent.');
            return existingMatch;
        }

        console.log('Creating new pending match request.');
        return await tx.match.create({
            data: {
                user1Id: user1Id,
                user2Id: user2Id,
                status: 'pending',
            },
        });
    });
};

export const getMatchesForUser = async (userId) => {
    return await prisma.match.findMany({
        where: {
            OR: [{ user1Id: userId }, { user2Id: userId }],
        },
        include: {
            user1: { select: { id: true, username: true } },
            user2: { select: { id: true, username: true } },
        },
    });
};

export const updateMatch = async (matchId, status) => {
    if (!['accepted', 'rejected'].includes(status)) {
        throw new Error('Invalid status.');
    }
    return await prisma.match.update({ where: { id: matchId }, data: { status } });
};