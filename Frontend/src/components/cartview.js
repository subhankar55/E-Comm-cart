import React from 'react';
export default function CartView({cart={items:[],total:0}, onRemove, onUpdateQty, onCheckout}){
return (
<div className="cart">
<h2>Cart</h2>
{cart.items.length === 0 ? <p>Cart is empty</p> : (
<div>
{cart.items.map(it => (
<div className="cart-row" key={it.productId}>
<div className="name">{it.name}</div>
<div className="qty">
<button onClick={()=>onUpdateQty(it.productId, Math.max(0, it.qty-1))}>-</button>
<span>{it.qty}</span>
<button onClick={()=>onUpdateQty(it.productId, it.qty+1)}>+</button>
</div>
<div className="line">${it.lineTotal.toFixed(2)}</div>
<button className="remove" onClick={()=>onRemove(it.productId)}>Remove</button>
</div>
))}
<div className="total">Total: ${cart.total.toFixed(2)}</div>
<button className="checkout" onClick={onCheckout}>Checkout</button>
</div>
)}
</div>
);
}