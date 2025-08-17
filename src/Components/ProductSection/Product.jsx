import React, { useEffect, useState } from 'react'
import '../ProductSection/Product.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
function Product() {

const [products , setProducts] = useState([]);

useEffect(() =>{

    axios.get("http://localhost:5008/products").then((res)=> setProducts(res.data.products)).catch((err)=> console.error(err));

}, []);







 return (
  <div className="product-list">
    {products.map((p) => (
      <Link key={p._id} to={`/Details/${p._id}`} className="product-card">
        <h3>{p.name}</h3>
        <p>{p.brand}</p>
        <p>LKR {p.priceLKR}</p>
      </Link>
    ))}
  </div>
);
}

export default Product
