import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './StoreManager.css';

function StoreManager() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("home"); // "home", "upload", "inventory", "returns"
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    priceLKR: "",
    stock: "",
    images: [],
    _id: null,
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      if (formData._id) {
        await axios.put(`http://localhost:5000/products/update/${formData._id}`, data);
        alert("Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/products/add", data);
        alert("Product added successfully!");
      }
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        priceLKR: "",
        stock: "",
        images: [],
        _id: null,
      });
      setActiveTab("inventory");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Operation failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/products/delete/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const handleUpdate = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      priceLKR: product.priceLKR,
      stock: product.stock,
      images: [],
      _id: product._id,
    });
    setActiveTab("upload");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Store Manager</h2>
        <ul>
          <li>
            <button className="sidebar-btn" onClick={() => setActiveTab("home")}>Home</button>
          </li>
          <li>
            <button className="sidebar-btn" onClick={() => setActiveTab("upload")}>Add Item</button>
          </li>
          <li>
            <button className="sidebar-btn" onClick={() => setActiveTab("inventory")}>Item Lists</button>
          </li>
          <li>
            <button className="sidebar-btn" onClick={() => setActiveTab("returns")}>Returns</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="manager-main">
        {/* Home Tab */}
        {activeTab === "home" && (
          <div>
            <h2>Welcome to the Store Manager Dashboard</h2>
            <p>Use the sidebar to navigate between Home, Add Item, Item Lists, and Returns.</p>
            <Link to="/" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Go to Home Page
            </Link>
          </div>
        )}

        {/* Upload Form */}
        {activeTab === "upload" && (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
            <h2 className="text-xl font-bold mb-4">{formData._id ? "Update Product" : "Add Product"}</h2>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
            <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
            <input type="number" name="priceLKR" placeholder="Price LKR" value={formData.priceLKR} onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="mb-2 w-full p-2 border rounded"/>
            <input type="file" name="images" multiple accept="image/*" onChange={handleChange} className="mb-4 w-full"/>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {formData._id ? "Update Product" : "Add Product"}
            </button>
          </form>
        )}

        {/* Inventory Table */}
        {activeTab === "inventory" && (
          <>
            <h2>Inventory</h2>
            {products.length === 0 ? (
              <p>No products in inventory.</p>
            ) : (
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price (LKR)</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>
                        {p.images && p.images.length > 0 ? (
                          <img src={typeof p.images[0] === "string" ? p.images[0] : p.images[0].url} alt={p.name} className="thumbnail"/>
                        ) : "No Image"}
                      </td>
                      <td>{p.name}</td>
                      <td>{p.description}</td>
                      <td>{p.brand}</td>
                      <td>{p.category}</td>
                      <td>{p.priceLKR}</td>
                      <td className={p.stock > 0 ? "instock" : "outstock"}>{p.stock > 0 ? p.stock : "Out of Stock"}</td>
                      <td>
                        <button className="action-btn update-btn" onClick={() => handleUpdate(p)}>Update</button>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {/* Returns Tab */}
        {activeTab === "returns" && (
          <div>
            <h2>Returns</h2>
            <p>Here you can manage returned products.</p>
            {/* You can add a table of returned products here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreManager;
