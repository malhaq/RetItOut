import Item from './itemModel.js';
import Orders from '../../../../DB/models/Orders.model.js';

// middle ware for verifying the token and the user type
import userVerification from '../../../Middleware/userVerification.js';
import { request } from 'express';
const { verifyTokenAndOwner, verifyTokenAndRenter } = userVerification;

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
      const { startDate, endDate, userID, deliveryOption,deliveryAddress } = req.body;

      const item = await Item.findById(id);
      if (!item || !item.availability) {
        return res.status(404).json({ message: 'Item not available for rent' });
      }

      item.rentalDuration = { startDate, endDate };
      item.availability = false;
      const updatedItem = await item.save();
      let newOrder;
      let logistic;
      if (!deliveryOption) {
        logistic = {
          deliveryOption: 'pickup',
          deliveryAddress: null,
          pickupLocation: item.logistics.pickupLocation,
        };

        //create a new order in the Orders collection

        newOrder = new Orders({
          itemId: item._id,
          renterId: userID,
          ownerId: item.owner,
          rentalPeriod: {
            startDate,
            endDate,
          },
          logistics: logistic
        });
      } else {
        let address;
        if(!deliveryAddress) {
          address = null;
        }else {
          address = deliveryAddress;
        }
        logistic = {
          deliveryOption: deliveryOption,
          deliveryAddress: address,
          pickupLocation: item.logistics.pickupLocation,
        };

        //create a new order in the Orders collection

        newOrder = new Orders({
          itemId: item._id,
          renterId: userID,
          ownerId: item.owner,
          rentalPeriod: {
            startDate,
            endDate,
          },
          logistics: logistic
        });
      }
      newOrder = await newOrder.save();

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
    const { daily, weekly, monthly } = req.body;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update the pricing
    item.rentalPrice.daily = daily;
    item.rentalPrice.weekly = weekly;
    item.rentalPrice.monthly = monthly;

    await item.save();

    return res.status(200).json({ message: "Pricing updated successfully", item });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  });
};





export const updateRentalDuration = async (req, res) => {
  const { id } = req.params; 
  const { startDate, endDate } = req.body; 

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Start date and End date are required" });
  }

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.rentalDuration = { startDate, endDate };
    await item.save();
    return res.status(200).json({
      message: "Rental duration updated successfully",
      item,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

