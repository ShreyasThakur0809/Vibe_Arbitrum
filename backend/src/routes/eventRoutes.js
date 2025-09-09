import express from 'express';
import * as eventController from '../controllers/eventController.js';

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);
router.post('/:eventId/join', eventController.joinEvent);
router.delete('/:eventId/leave', eventController.leaveEvent);
router.get('/:eventId/participants', eventController.getEventParticipants);

export default router;