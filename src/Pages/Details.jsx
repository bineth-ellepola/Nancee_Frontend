// Product/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  axios
    .get(`http://localhost:5008/products/${id}`)
    .then((res) => {
      console.log("Full response:", res.data);  // 👀
      setProduct(res.data.product || res.data);
    })
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, [id]);


  if (loading) return <h2>Loading…</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-details-page">
    <Link to="/Products">← Back to products</Link>

    {product && (
      <div className="product-card product-card--lg">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        )}
        <div>
          <h1>{product.name || "No name"}</h1>
          <p>{product.brand || "No brand"}</p>
          <p>LKR {product.priceLKR ?? "N/A"}</p>
          <p>{product.description || "No description"}</p>
           
        <p>{product.category}</p>
        <p>{product.stocks}</p>
        <p>{product.createdAT}</p>
          
        </div>
      </div>
    )}
  </div>
  );
}
