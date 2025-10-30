import React, { useState } from 'react';

export default function CheckoutModal({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Checkout</h3>

        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="modal-actions">
          <button onClick={() => onSubmit({ name, email })}>
            Pay (mock)
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
