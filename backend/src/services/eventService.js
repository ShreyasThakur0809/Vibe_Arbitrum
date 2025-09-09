import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createEvent = async (eventData) => {
    return await prisma.event.create({
        data: {
            eventName: eventData.eventName,
            description: eventData.description,
            location: eventData.location,
            eventDate: new Date(eventData.eventDate),
            maxParticipants: eventData.maxParticipants,
        },
    });
};

export const findAllEvents = async () => {
    return await prisma.event.findMany({
        orderBy: { eventDate: 'asc' },
        include: { _count: { select: { participants: true } } },
    });
};

export const findEventById = async (eventId) => {
    return await prisma.event.findUnique({
        where: { id: eventId },
        include: { participants: { include: { user: { select: { id: true, username: true } } } } },
    });
};

export const addParticipant = async (eventId, userId) => {
    const existing = await prisma.eventParticipant.findUnique({
        where: { userId_eventId: { userId, eventId } },
    });
    if (existing) {
        throw new Error('User is already registered for this event.');
    }
    return await prisma.eventParticipant.create({ data: { eventId, userId } });
};

export const removeParticipant = async (eventId, userId) => {
    return await prisma.eventParticipant.delete({
        where: { userId_eventId: { userId, eventId } },
    });
};

export const findParticipantsByEvent = async (eventId) => {
    return await prisma.eventParticipant.findMany({
        where: { eventId: eventId },
        include: { user: { select: { id: true, username: true, profilePictureUrl: true } } },
    });
};