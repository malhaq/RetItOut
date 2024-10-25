import express from 'express';
import {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
} from './controller/itemController.js';

const router = express.Router();

// Define routes for CRUD operations
router.post('/', createItem);       // Create a new item
router.get('/', getItems);          // Get all items
router.get('/:id', getItemById);    // Get a specific item by ID
router.put('/:id', updateItem);     // Update an item
router.delete('/:id', deleteItem);  // Delete an item

export default router;
