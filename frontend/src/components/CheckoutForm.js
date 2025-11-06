import React, { useState } from 'react';

function CheckoutForm({ onCheckout, isCartEmpty }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCartEmpty) {
      alert("Your cart is empty.");
      return;
    }
    if (!name || !email) {
      alert("Please fill in both name and email.");
      return;
    }
    
    onCheckout({ name, email });
    
    setName('');
    setEmail('');
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3 className="checkout-title">Checkout</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
        />
      </div>
      <button 
        type="submit" 
        className="btn-checkout" 
        disabled={isCartEmpty}
      >
        Place Order
      </button>
    </form>
  );
}

export default CheckoutForm;