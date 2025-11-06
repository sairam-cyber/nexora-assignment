import React from 'react';

function CartView({ cart, onRemoveItem, onIncrement, onDecrement }) {
  return (
    <div className="cart-view">
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cart.items.map(item => (
              <div key={item.cartItemId} className="cart-item">
                
                <div className="item-info">
                  <strong>{item.name}</strong>
                  {/* We split up the quantity and price for the new controls */}
                  <span>${item.price}</span>
                </div>

                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => onDecrement(item.cartItemId, item.id, item.qty)} 
                      className="btn-qty"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button 
                      onClick={() => onIncrement(item.id)} 
                      className="btn-qty"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.cartItemId)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ${cart.total}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default CartView;