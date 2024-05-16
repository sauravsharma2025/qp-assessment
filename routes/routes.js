import express from 'express';
import Product from '../models/db.js';

const router = express.Router();

// GET all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/products/inquiry',async (req,res)=>{
    console.log('hello')
    try{
        const products = await Product.find({ quantityAvailable: { $gt: 100 } });
        console.log('wer',products)
        res.json(products);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})  

// GET a single product by ID
router.get('/products/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// POST a new product
router.post('/products', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a product
router.put('/products/:id', getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  // Update other fields as needed...

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a product
router.delete('/products/:id', getProduct, async (req, res) => {
    try {
      await res.product.deleteOne();
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


// Middleware function to retrieve a single product by ID
async function getProduct(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.product = product;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  

export default router;
