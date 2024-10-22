import { Router } from "express";
import adminCheckAuth from "../../Middleware/adminCheckAuth.js";
import * as FeedbackController from './controller/userfeedback.controller.js'

const router = Router();

router.post('/ask/owners',adminCheckAuth,FeedbackController.askFeedbackOwner);
router.post('/ask/renters',adminCheckAuth,FeedbackController.askFeedbackRenter);
router.get('/OStoreFB',adminCheckAuth,FeedbackController.getUserEmailFeedback);
router.get('/RStoreFB',adminCheckAuth,FeedbackController.getRenterEmailFeedback);

export default router;