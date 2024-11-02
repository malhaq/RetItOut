import { Router } from "express";
import * as TestController from './controller/test.controller.js';

const router = Router();

router.post('/test',TestController.create);

export default  router;