import express from 'express';
import {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    rentItem,
    returnItem
} from './controller/itemController.js';

const router = express.Router();


router.post('/', createItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);


router.post('/:id/rent', rentItem);      
router.post('/:id/return', returnItem);  

export default router;
