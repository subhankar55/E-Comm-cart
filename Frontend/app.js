import React, {useEffect, useState} from 'react';
import { fetchProducts, fetchCart, addToCart, removeFromCart, updateQty, checkout } from './api';
import ProductsGrid from './components/productsgrid';
import CartView from './components/cartview';
import CheckoutModal from './components/checkoutmodel';


export default function App(){
const [products, setProducts] = useState([]);
const [cart, setCart] = useState({items:[], total:0});
const [showCheckout, setShowCheckout] = useState(false);
const [receipt, setReceipt] = useState(null);


useEffect(()=>{ loadProducts(); loadCart(); }, []);
const loadProducts = async ()=> setProducts(await fetchProducts());
const loadCart = async ()=> setCart(await fetchCart());


const handleAdd = async (id)=> { const res = await addToCart(id,1); setCart(res); }
const handleRemove = async (id)=> { const res = await removeFromCart(id); setCart(res); }
const handleQty = async (id, qty)=> { const res = await updateQty(id, qty); setCart(res); }


const handleCheckout = async (payload) => {
const res = await checkout({ ...payload });
setReceipt(res.receipt);
setShowCheckout(false);
setCart({items:[], total:0});
}


return (
<div className="container">
<h1>Vibe Commerce — Mock Cart</h1>
<div className="main">
<ProductsGrid products={products} onAdd={handleAdd} />
<CartView cart={cart} onRemove={handleRemove} onUpdateQty={handleQty} onCheckout={()=>setShowCheckout(true)} />
</div>
{showCheckout && <CheckoutModal onClose={()=>setShowCheckout(false)} onSubmit={handleCheckout} />}
{receipt && (
<div className="receipt">
<h3>Receipt</h3>
<pre>{JSON.stringify(receipt, null, 2)}</pre>
</div>
)}
</div>
);
}