import * as eventService from '../services/eventService.js';

export const createEvent = async (req, res) => {
    try {
        const event = await eventService.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await eventService.findAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const event = await eventService.findEventById(eventId);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const joinEvent = async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const { userId } = req.body;
        const participation = await eventService.addParticipant(eventId, userId);
        res.status(201).json(participation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const leaveEvent = async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const { userId } = req.body;
        await eventService.removeParticipant(eventId, userId);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getEventParticipants = async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const participants = await eventService.findParticipantsByEvent(eventId);
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};