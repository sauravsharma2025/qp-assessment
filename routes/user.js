// Import necessary modules
import express from 'express';
import Product from '../models/db.js';
import Order from '../models/order.js'; 

const orderRouter = express.Router();

// Route for booking products
// Route for booking products
orderRouter.post('/bookings', async (req, res) => {
    const { userId, products } = req.body;
  
    // Validate request
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: 'Invalid request. Please provide userId and products to book.' });
    }
  
    try {
      // Check if all products are available
      const availableProducts = await Product.find({ _id: { $in: products } });
      if (availableProducts.length !== products.length) {
        return res.status(400).json({ message: 'One or more products are not available.' });
      }
  
    //   const totalPrice = availableProducts.reduce((total, product) => total + product.price, 0);
  
      // Create order object
      const order = new Order({
        userId,
        products,
      });
  
      // Save order to database
      const savedOrder = await order.save();
  
      // Reduce quantity of booked products
      await Product.updateMany({ _id: { $in: products } }, { $inc: { quantityAvailable: -1 } });
  
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

export default orderRouter;
