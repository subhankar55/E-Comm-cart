const mongoose = require('mongoose');
const CartItemSchema = new mongoose.Schema({
productId: String,
qty: { type: Number, default: 1 },
// mock userId support
userId: { type: String, default: 'mockUser' }
}, { timestamps: true });
module.exports = mongoose.model('cartitem', CartItemSchema);