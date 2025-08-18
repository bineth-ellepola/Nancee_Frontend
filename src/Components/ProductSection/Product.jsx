import { useEffect, useState } from "react";
import axios from "axios";
import "../ProductSection/Product.css";

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/products")
      .then((res) => {
        console.log(res.data.products); // check structure
        setProducts(res.data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main">
      {products.map((p) => (
        <div key={p._id} className="card">
          {/* Image Rendering */}
          {p.images && p.images.length > 0 ? (
            p.images.length > 1 ? (
              <div className="slider">
                <div
                  className="slides"
                  style={{ width: `${p.images.length * 100}%` }}
                >
                  {p.images.map((img, index) => (
                    <img
                      key={index}
                      src={typeof img === "string" ? img : img.url}
                      alt={p.name}
                      style={{ width: `${100 / p.images.length}%` }}
                      className="product-image"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <img
                src={typeof p.images[0] === "string" ? p.images[0] : p.images[0].url}
                alt={p.name}
                className="single-image product-image"
              />
            )
          ) : (
            <div className="no-image">No Image Available</div>
          )}

          {/* Product Details */}
          <h3>{p.name}</h3>
          <p>{p.description}</p>

          <div className="details">
            <span>Brand: {p.brand}</span>
            <span>Category: {p.category}</span>
          </div>

          <div className="pricing-stock">
            <span className="price">LKR {p.priceLKR}</span>
            <span className={p.stock > 0 ? "instock" : "outstock"}>
              {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}
            </span>
          </div>

          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
