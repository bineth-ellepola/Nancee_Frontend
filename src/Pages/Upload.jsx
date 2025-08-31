import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    priceLKR: "",
    stock: "",
    images: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < formData.images.length; i++) {
          data.append("images", formData.images[i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post("http://localhost:5000/products/add", data);
      alert("Product uploaded successfully!");
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        priceLKR: "",
        stock: "",
        images: [],
      });
    } catch (err) {
      console.error(err);
      alert("Failed to upload product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
      <input type="text" name="description" placeholder="Description" onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
      <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
      <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
      <input type="number" name="priceLKR" placeholder="Price LKR" onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
      <input type="number" name="stock" placeholder="Stock" onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
      <input type="file" name="images" multiple accept="image/*" onChange={handleChange} required className="mb-4 w-full"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Product</button>
    </form>
  );
}
