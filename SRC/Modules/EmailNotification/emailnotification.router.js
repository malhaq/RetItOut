import { Router } from 'express';
import * as EmailController from './controller/emailnotification.controller.js'

const router = Router();

router.post('/sendEmail',EmailController.EmailNotify);

export default router;
