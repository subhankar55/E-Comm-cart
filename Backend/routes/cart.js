const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// simple in-memory cart: id -> { productId, qty }
let CART = {}; // for production, use a DB

// helper to calculate cart total
const calcTotal = () => {
  let items = Object.values(CART).map(it => {
    const p = products.find(pp => pp.id === it.productId);
    return { 
      ...it, 
      name: p.name, 
      price: p.price, 
      lineTotal: +(p.price * it.qty).toFixed(2) 
    };
  });
  const total = items.reduce((s, it) => s + it.lineTotal, 0);
  return { items, total: +total.toFixed(2) };
};

// GET /api/cart
router.get('/', (req, res) => {
  res.json(calcTotal());
});

// POST /api/cart { productId, qty }
router.post('/', (req, res) => {
  const { productId, qty = 1 } = req.body;
  const prod = products.find(p => p.id === productId);
  if (!prod) return res.status(400).json({ error: 'Invalid productId' });
  
  if (CART[productId]) CART[productId].qty += qty;
  else CART[productId] = { productId, qty };

  res.json(calcTotal());
});

// DELETE /api/cart/:id (id = productId)
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  delete CART[id];
  res.json(calcTotal());
});

// POST /api/cart/:id - update qty
router.post('/:id', (req, res) => {
  const id = req.params.id;
  const { qty } = req.body;
  if (!CART[id]) return res.status(404).json({ error: 'Not in cart' });

  CART[id].qty = Math.max(0, Number(qty));
  if (CART[id].qty === 0) delete CART[id];

  res.json(calcTotal());
});

// POST /api/checkout { cartItems }
router.post('/checkout', (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const receipt = {
    total: +total.toFixed(2),
    timestamp: new Date().toISOString(),
    message: 'Mock checkout successful'
  };
  // Optionally clear cart
  CART = {};
  res.json(receipt);
});

// ✅ export router properly
module.exports = router;
