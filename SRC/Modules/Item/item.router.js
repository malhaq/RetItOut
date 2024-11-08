import express from 'express';
import {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    rentItem,
    returnItem,
    updatePricing
} from './controller/itemController.js';
import { updateRentalDuration } from './controller/itemController.js';

const router = express.Router();


router.post('/', createItem);                
router.get('/', getItems);                    
router.get('/:id', getItemById);             
router.put('/:id', updateItem);              
router.delete('/:id', deleteItem);           
router.post('/:id/rent', rentItem);          
router.post('/:id/return', returnItem);       
router.put('/:id/rentalDuration', updateRentalDuration);

router.put('/:id/pricing', updatePricing);    

export default router;
