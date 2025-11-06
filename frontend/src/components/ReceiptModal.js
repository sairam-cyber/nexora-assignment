import React from 'react';

function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Checkout Successful!</h2>
        <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
        <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
        
        <div className="receipt-items">
          <h4>Items Purchased:</h4>
          {receipt.items.map(item => (
            <div key={item.cartItemId} className="receipt-item">
              <span>{item.name} (Qty: {item.qty})</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="receipt-total">
          <strong>Total Paid: ${receipt.total}</strong>
        </div>
        
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ReceiptModal;