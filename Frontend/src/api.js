const BASE = process.env.REACT_APP_API || 'http://localhost:5000/api';
export const fetchProducts = () => fetch(`${BASE}/products`).then(r=>r.json());
export const fetchCart = () => fetch(`${BASE}/cart`).then(r=>r.json());
export const addToCart = (productId, qty=1) => fetch(`${BASE}/cart`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productId,qty})}).then(r=>r.json());
export const removeFromCart = (productId) => fetch(`${BASE}/cart/${productId}`, {method:'DELETE'}).then(r=>r.json());
export const updateQty = (productId, qty) => fetch(`${BASE}/cart/${productId}`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({qty})}).then(r=>r.json());
export const checkout = (payload) => fetch(`${BASE}/cart/checkout`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).then(r=>r.json());