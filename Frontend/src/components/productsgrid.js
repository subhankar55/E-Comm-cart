import React from 'react';
export default function ProductsGrid({products=[], onAdd}){
return (
<div className="products">
<h2>Products</h2>
<div className="grid">
{products.map(p => (
<div className="card" key={p.id}>
<div className="title">{p.name}</div>
<div className="price">${p.price.toFixed(2)}</div>
<button onClick={()=>onAdd(p.id)}>Add to cart</button>
</div>
))}
</div>
</div>
);
}