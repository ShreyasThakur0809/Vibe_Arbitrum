import express from 'express';
import * as matchController from '../controllers/matchController.js';

const router = express.Router();

router.post('/', matchController.createMatchRequest);
router.get('/user/:userId', matchController.getUserMatches);
router.patch('/:matchId', matchController.updateMatchStatus);

export default router;