import { useEffect, useState } from "react";
import axios from "axios";
import '../ProductSection/Product.css'

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/products")
      .then(res => setProducts(res.data.products))
      .catch(err => console.error(err));
  }, []);

  return (
 <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {products.map((p) => (
    <div
      key={p._id}
      className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center p-6"
    >
      {/* Images Carousel */}
      <div className="flex gap-3 overflow-x-auto mb-4">
        {p.images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={p.name}
            className="w-32 h-32 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* Product Details */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{p.name}</h3>
      <p className="text-gray-500 text-sm mb-2 text-center">{p.description}</p>

      <div className="w-full flex justify-between text-gray-600 text-sm mb-1">
        <span>Brand: {p.brand}</span>
        <span>Category: {p.category}</span>
      </div>

      <div className="w-full flex justify-between items-center mt-2">
        <span className="text-lg font-bold text-gray-900">LKR {p.priceLKR}</span>
        <span className={`text-sm font-medium ${p.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
        </span>
      </div>

      <button className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-300">
        Add to Cart
      </button>
    </div>
  ))}
</div>

  );
}
