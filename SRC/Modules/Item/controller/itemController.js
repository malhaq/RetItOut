import Item from './itemModel.js';
import Orders from '../../../../DB/models/Orders.model.js';

// middle ware for verifying the token and the user type
import userVerification from '../../../Middleware/userVerification.js';
import { request } from 'express';
const {verifyTokenAndOwner, verifyTokenAndRenter } = userVerification;

export const createItem = async (req, res) => {
  verifyTokenAndOwner(req, res, async () => {
    try {
      req.body.owner = req.user.id;
      const item = new Item(req.body);
      const savedItem = await item.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};


export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateItem = async (req, res) => {
  verifyTokenAndOwner(req, res, async () => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};


export const deleteItem = async (req, res) => {
  verifyTokenAndOwner(req, res, async () => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};


export const rentItem = async (req, res) => {
  verifyTokenAndRenter(req, res, async () => {
    try {
      req.body.userID = req.user.id;
      const { id } = req.params;
      const { startDate, endDate, userID } = req.body;

      const item = await Item.findById(id);
      if (!item || !item.availability) {
        return res.status(404).json({ message: 'Item not available for rent' });
      }

      item.rentalDuration = { startDate, endDate };
      item.availability = false;
      const updatedItem = await item.save();

      //create a new order in the Orders collection
      const newOrder = new Orders({
        itemId: item._id,
        renterId: userID,
        ownerId: item.owner,
        rentalPeriod: {
          startDate,
          endDate,
        }
      });

      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};


export const returnItem = async (req, res) => {
  verifyTokenAndRenter(req, res, async () => {
    try {
      const { id } = req.params;

      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      item.rentalDuration = { startDate: null, endDate: null };
      item.availability = true;
      const updatedItem = await item.save();
      const updatedOrder = await Orders.findOneAndUpdate(
        { itemId: id, renterId: request.user.id },
        { status: 'completed' },
        { new: true }
      );

      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const updatePricing = async (req, res) => {
  verifyTokenAndOwner(req, res, async () => {
    try {
      const { id } = req.params;
      const { rentalPrice } = req.body;

      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { rentalPrice },
        { new: true, runValidators: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }

      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};
