import React from 'react';

function ProductItem({ product, onAddToCart }) {
  
  const handleAdd = () => {
    onAddToCart(product.id, 1);
  };

  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAdd} className="btn-add">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;