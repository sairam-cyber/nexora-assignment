import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    const formattedProducts = products.map(p => ({
      id: p.productId,
      name: p.name,
      price: p.price,
    }));
    
    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};