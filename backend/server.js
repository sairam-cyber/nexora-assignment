import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import Product from './models/Product.js';
import { getProducts } from './api/products.js';
import { getCart, addToCart, removeFromCart, handleCheckout } from './api/cart.js';

// Define the 10 mock products
const mockProducts = [
  // The original 5
  { productId: '1', name: 'Vibe T-Shirt', price: 25.99 },
  { productId: '2', name: 'Eco Vibe Hoodie', price: 49.99 },
  { productId: '3', name: 'Commerce Cap', price: 19.50 },
  { productId: '4', name: 'Dev Duffle Bag', price: 35.00 },
  { productId: '5', name: 'StackSocks (Pair)', price: 12.00 },
  // 5 new products
  { productId: '6', name: 'Vibe Water Bottle', price: 15.00 },
  { productId: '7', name: 'Developer Notebook', price: 18.00 },
  { productId: '8', name: '"Code" Beanie', price: 22.50 },
  { productId: '9', name: 'Syntax Sunglasses', price: 28.00 },
  { productId: '10', name: 'API-First Backpack', price: 55.00 }
];

const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('No products found, seeding database with 10 mock products...');
      
      // Insert the 10 products into the database
      await Product.insertMany(mockProducts);
      console.log('Database seeded successfully with 10 mock products.');
    
    } else {
      console.log('Database already contains products. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

connectDB().then(() => {
  seedDatabase();
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Vibe Commerce Backend API is running...');
});

app.get('/api/products', getProducts);
app.get('/api/cart', getCart);
app.post('/api/cart', addToCart);
app.delete('/api/cart/:id', removeFromCart);
app.post('/api/checkout', handleCheckout);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});