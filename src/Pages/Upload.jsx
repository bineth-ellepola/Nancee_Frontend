import { useState } from "react";
import axios from "axios";
import "./Upload.css";

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

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      setFormData({
        ...formData,
        images: files,
      });

      // preview selected images
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        if (key === "images") {
          formData.images.forEach((img) => formDataToSend.append("images", img));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      await axios.post("http://localhost:5000/products", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product added successfully!");

      // reset form
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        priceLKR: "",
        stock: "",
        images: [],
      });
      setPreviewImages([]);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />

          <label>Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Enter brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <div>
              <label>Price (LKR)</label>
              <input
                type="number"
                name="priceLKR"
                placeholder="e.g. 2500"
                value={formData.priceLKR}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="e.g. 50"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
          />

          {/* preview images */}
          {previewImages.length > 0 && (
            <div className="image-preview">
              {previewImages.map((src, index) => (
                <img key={index} src={src} alt="preview" />
              ))}
            </div>
          )}

          <button type="submit" className="submit-btn">
            ➕ Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
