import { Router } from "express";
import renterCheckAuth from "../../Middleware/renterCheckAuth.js";
import * as AQController from './controller/AQ.controller.js';
import ownerCheckAuth from "../../Middleware/ownerCheckAuth.js";

const router = Router();

router.post('/askQ',renterCheckAuth,AQController.addComment);
router.post('/answerQ',ownerCheckAuth,AQController.AnswerQuestion);

router.get('/renter/responses',renterCheckAuth,AQController.renterViewResposes);
router.get('/owner/questions',ownerCheckAuth,AQController.ownerViewQuestions);

export default router;