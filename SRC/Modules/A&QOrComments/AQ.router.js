import { Router } from "express";
import renterCheckAuth from "../../Middleware/renterCheckAuth.js";
import * as AQController from './controller/AQ.controller.js';
import ownerCheckAuth from "../../Middleware/ownerCheckAuth.js";
import adminCheckAuth from "../../Middleware/adminCheckAuth.js";

const router = Router();

// for specific owner
router.post('/askQ',renterCheckAuth,AQController.addComment);
router.post('/answerQ',ownerCheckAuth,AQController.AnswerQuestion);


router.get('/renter/responses',renterCheckAuth,AQController.renterViewResposes);
router.get('/owner/questions',ownerCheckAuth,AQController.ownerViewQuestions);
router.get('/owner/comments',ownerCheckAuth,AQController.ownerViewComments);

router.post('/writeComment',renterCheckAuth,AQController.writeComment);

router.get('/RentersviewProductComment',renterCheckAuth,AQController.viewProductComments);
router.get('/OwnersviewProductComment',ownerCheckAuth,AQController.viewProductComments);

router.get('/getAllComments',adminCheckAuth,AQController.viewProductComments);

router.get('/myComments',renterCheckAuth,AQController.viewMyComments);
router.delete('/destroyMyComment',renterCheckAuth,AQController.destroyMyComment);
router.delete('/deleteComment',adminCheckAuth,AQController.destroyMyComment);

export default router;