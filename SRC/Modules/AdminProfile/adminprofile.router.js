import { Router } from "express";
import * as AdminController from './controller/adminprofile.controller.js';
import adminCheckAuth from "../../Middleware/adminCheckAuth.js";

const router = Router();

router.put('/',adminCheckAuth,AdminController.updateAdminProfile);

router.put('/owner/:id',adminCheckAuth,AdminController.updateOwnerProfile);
router.put('/renter/:id',adminCheckAuth,AdminController.updateRenterProfile);
router.put('/delivery/:id',adminCheckAuth,AdminController.updateDeliveryProfile);

router.delete('/',adminCheckAuth,AdminController.destroyAdmin);

router.delete('/owner/:id',adminCheckAuth,AdminController.destroyOwner);
router.delete('/renter/:id',adminCheckAuth,AdminController.destroyRenter);
router.delete('/delivery/:id',adminCheckAuth,AdminController.destroyDelivery);

router.get('/OFB',adminCheckAuth,AdminController.OwnersFeedbacks);
router.get('/RFB',adminCheckAuth,AdminController.RentersFeedbacks);
router.get('/FB',adminCheckAuth,AdminController.allFeedbacks);

// filters routeers
router.get('/allOwners',adminCheckAuth,AdminController.getAllOWners);
router.get('/allRenters',adminCheckAuth,AdminController.getAllRenters);
router.get('/allProducts',adminCheckAuth,AdminController.getAllProducts);
router.get('/allRentals',adminCheckAuth,AdminController.getAllRentals);
router.get('/allDeliverys',adminCheckAuth,AdminController.getAllDeliverys);
router.get('/allProductsCat',adminCheckAuth,AdminController.getAllCatProducts);
router.get('/allCatRentals',adminCheckAuth,AdminController.getAllCatRentals);

export default router;