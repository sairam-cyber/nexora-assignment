import Product from '../models/Product.js';
import CartItem from '../models/CartItem.js';

const getCartContents = async () => {
  const items = await CartItem.find();
  
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  
  const formattedItems = items.map(item => ({
    cartItemId: item._id,
    id: item.productId,
    name: item.name,
    price: item.price,
    qty: item.qty,
  }));

  return { items: formattedItems, total: total.toFixed(2) };
};

export const getCart = async (req, res) => {
  try {
    const { items, total } = await getCartContents();
    res.status(200).json({ items, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  // --- MODIFICATION 1 ---
  // We only check for qty === 0. We need to allow negative numbers (like -1)
  // for decrementing.
  if (!productId || qty === 0) {
    return res.status(400).json({ message: 'Invalid product ID or quantity' });
  }
  
  try {
    const product = await Product.findOne({ productId: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingItem = await CartItem.findOne({ productId: productId });

    if (existingItem) {
      existingItem.qty += qty; // This will handle both (e.g., 3 + 1) and (3 + -1)

      // --- MODIFICATION 2 ---
      // If the new quantity is 0 or less, remove the item from the cart
      // instead of saving it with a 0 or negative quantity.
      if (existingItem.qty <= 0) {
        await CartItem.findByIdAndDelete(existingItem._id);
      } else {
        await existingItem.save();
      }

    } else if (qty > 0) {
      // --- MODIFICATION 3 ---
      // Only create a new item if the quantity is positive.
      // This stops us from adding an item with -1 qty by accident.
      await CartItem.create({
        productId: product.productId,
        name: product.name,
        price: product.price,
        qty: qty,
      });
    }
    // Note: If the item doesn't exist and qty is negative, we do nothing.
    // This is correct. We can't subtract an item that isn't in the cart.

    const { items, total } = await getCartContents();
    res.status(201).json({ items, total });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;
  
  try {
    const item = await CartItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    await CartItem.findByIdAndDelete(id);

    const { items, total } = await getCartContents();
    res.status(200).json({ items, total });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart" });
  }
};

export const handleCheckout = async (req, res) => {
  try {
    const { items, total } = await getCartContents();

    if (items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    const receipt = {
      receiptId: `rec-${Date.now()}`,
      timestamp: new Date().toISOString(),
      items: items,
      total: total,
    };

    await CartItem.deleteMany({});

    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: "Checkout failed" });
  }
};