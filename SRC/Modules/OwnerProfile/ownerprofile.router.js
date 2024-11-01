import { Router } from "express";
import * as OwnerController from "./controller/ownerprofile.controller.js";
import ownerCheckAuth from "../../Middleware/ownerCheckAuth.js";

const router = Router();

router.put('/',ownerCheckAuth,OwnerController.updateOwnerProfile);
router.delete('/',ownerCheckAuth,OwnerController.destroyOwner);
router.post('/logout',ownerCheckAuth,OwnerController.ownerLogOut);

export default router;