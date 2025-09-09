import * as matchService from '../services/matchService.js';

export const createMatchRequest = async (req, res) => {
    try {
        const { user1Id, user2Id } = req.body;
        const match = await matchService.createMatch(user1Id, user2Id);
        res.status(201).json(match);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserMatches = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const matches = await matchService.getMatchesForUser(userId);
        res.status(200).json(matches);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateMatchStatus = async (req, res) => {
    try {
        const matchId = parseInt(req.params.matchId);
        const { status } = req.body;
        const updatedMatch = await matchService.updateMatch(matchId, status);
        res.status(200).json(updatedMatch);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};