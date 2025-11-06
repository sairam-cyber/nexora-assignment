import React, { useState, useEffect } from 'react';
import { getProducts, getCart, addToCart, removeFromCart, checkout } from './services/apiService';
import ProductItem from './components/ProductItem';
import CartView from './components/CartView';
import CheckoutForm from './components/CheckoutForm';
import ReceiptModal from './components/ReceiptModal';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: '0.00' });
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, qty) => {
    try {
      const response = await addToCart(productId, qty);
      setCart(response.data);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("Error adding item. Please try again.");
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const response = await removeFromCart(cartItemId);
      setCart(response.data);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      alert("Error removing item. Please try again.");
    }
  };

  // NEW: Handler for the "+" button
  const handleIncrementItem = (productId) => {
    // This just re-uses your existing addToCart function
    handleAddToCart(productId, 1);
  };

  // NEW: Handler for the "-" button
  const handleDecrementItem = (cartItemId, productId, currentQty) => {
    if (currentQty > 1) {
      // If qty > 1, just subtract 1
      // Your backend will add -1 to the quantity
      handleAddToCart(productId, -1);
    } else {
      // If qty is 1, remove the item completely
      handleRemoveFromCart(cartItemId);
    }
  };

  const handleCheckout = async (customerDetails) => {
    try {
      const response = await checkout();
      setReceipt(response.data);
      setShowModal(true);
      setCart({ items: [], total: '0.00' });
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReceipt(null);
  };

  return (
    <>
      <header>
        <h1>Vibe Commerce</h1>
      </header>
      <div className="container">
        <main>
          <section className="content-area">
            <h2>Products</h2>
            <div className="product-grid">
              {products.map(product => (
                <ProductItem 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>

          <aside className="sidebar-area">
            <h2>Your Cart</h2>
            <CartView 
              cart={cart} 
              onRemoveItem={handleRemoveFromCart}
              onIncrement={handleIncrementItem}
              onDecrement={handleDecrementItem}
            />
            <CheckoutForm 
              onCheckout={handleCheckout} 
              isCartEmpty={cart.items.length === 0} 
            />
          </aside>
        </main>
      </div>

      {showModal && receipt && (
        <ReceiptModal receipt={receipt} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;