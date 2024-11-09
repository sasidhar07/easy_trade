const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../authMiddleWare');

router.get('/', authMiddleware , async (req, res) => {
  try {
    const products = await Product.find(); 
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
