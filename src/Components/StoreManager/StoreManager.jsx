import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./StoreManager.css";

function StoreManager() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
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

  // New state for Add Order modal
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    items: [],
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error("Fetch Products Error:", err);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Fetch Orders Error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle Add Order form input changes
  const handleOrderChange = (e, index) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index][e.target.name] = e.target.value;
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  // Add new item row in modal
  const addOrderItem = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { productId: "", quantity: 1 }],
    });
  };

  // Remove item row
  const removeOrderItem = (index) => {
    const updatedItems = [...newOrder.items];
    updatedItems.splice(index, 1);
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  // Submit new order
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        customerName: newOrder.customerName,
        products: newOrder.items.map((item) => ({
          _id: item.productId,
          quantity: parseInt(item.quantity),
        })),
      };

      await axios.post("http://localhost:5000/orders/add", orderData);
      alert("✅ Order added successfully!");
      setNewOrder({ customerName: "", items: [] });
      setShowOrderModal(false);
      fetchOrders();
      fetchProducts();
    } catch (err) {
      console.error("Add Order Error:", err);
      alert("❌ Failed to add order.");
    }
  };

  // Submit add/update product
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
        alert("✅ Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/products/add", data);
        alert("✅ Product added successfully!");
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
      alert("❌ Operation failed.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/products/delete/${id}`);
      alert("🗑️ Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete product.");
    }
  };

  // Load product into form for update
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

  // Process an order
  const handleProcessOrder = async (order) => {
    try {
      await axios.put(`http://localhost:5000/orders/update/${order._id}`, {
        status: "Processed",
      });

      alert("✅ Order processed and stock updated!");
      fetchProducts();
      fetchOrders();
    } catch (err) {
      console.error("Process Order Error:", err);
      alert("❌ Failed to process order");
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <img src="/profile_pic.jpeg" alt="User Profile" className="profile-pic" />
          <h3 className="profile-name">Bineth</h3>
        </div>

        <h2>🛍 Store Manager</h2>
        <ul>
          <li>
            <button
              className={`sidebar-btn ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              🏠 Home
            </button>
          </li>
          <li>
            <button
              className={`sidebar-btn ${activeTab === "upload" ? "active" : ""}`}
              onClick={() => setActiveTab("upload")}
            >
              ➕ Add Item
            </button>
          </li>
          <li>
            <button
              className={`sidebar-btn ${activeTab === "inventory" ? "active" : ""}`}
              onClick={() => setActiveTab("inventory")}
            >
              📦 Inventory
            </button>
          </li>
          <li>
            <button
              className={`sidebar-btn ${activeTab === "returns" ? "active" : ""}`}
              onClick={() => setActiveTab("returns")}
            >
              ↩️ Returns
            </button>
          </li>
          <li>
            <button
              className={`sidebar-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              📝 Orders
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="manager-main">
        {/* Home Tab */}
        {activeTab === "home" && (
          <div className="welcome-card">
            <h2>Welcome back, Bineth 👋</h2>
            <p>Manage your store efficiently with quick shortcuts below.</p>
            <div className="shortcut-cards">
              <div className="shortcut-card" onClick={() => setActiveTab("upload")}>
                <h3>➕ Add Product</h3>
                <p>Create and upload new products.</p>
              </div>
              <div className="shortcut-card" onClick={() => setActiveTab("inventory")}>
                <h3>📦 View Inventory</h3>
                <p>Check, update, or delete products.</p>
              </div>
              <div className="shortcut-card" onClick={() => setActiveTab("returns")}>
                <h3>↩️ Manage Returns</h3>
                <p>Handle product returns easily.</p>
              </div>
              <div className="shortcut-card" onClick={() => setActiveTab("orders")}>
                <h3>📝 View Orders</h3>
                <p>Track all store orders.</p>
              </div>
            </div>
            <Link to="/" className="home-btn">
              ⬅ Go to Home Page
            </Link>
          </div>
        )}

        {/* Upload Form */}
        {activeTab === "upload" && (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
            <h2>{formData._id ? "✏️ Update Product" : "➕ Add Product"}</h2>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                name="brand"
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="priceLKR">Price (LKR)</label>
              <input
                id="priceLKR"
                type="number"
                name="priceLKR"
                placeholder="Enter price in LKR"
                value={formData.priceLKR}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                id="stock"
                type="number"
                name="stock"
                placeholder="Enter available stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="images">Upload Images</label>
              <input
                id="images"
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="submit-btn">
              {formData._id ? "Update ✅" : "Add 🚀"}
            </button>
          </form>
        )}

        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <div className="inventory-container">
            <h2>📦 Inventory</h2>
            {products.length === 0 ? (
              <p>No products found.</p>
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
                        {p.images?.length > 0 ? (
                          <img
                            src={typeof p.images[0] === "string" ? p.images[0] : p.images[0].url}
                            alt={p.name}
                            className="thumbnail"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{p.name}</td>
                      <td>{p.description}</td>
                      <td>{p.brand}</td>
                      <td>{p.category}</td>
                      <td>{p.priceLKR}</td>
                      <td className={p.stock > 0 ? "instock" : "outstock"}>
                        {p.stock > 0 ? p.stock : "Out of Stock"}
                      </td>
                      <td>
                        <button className="action-btn update-btn" onClick={() => handleUpdate(p)}>✏️ Update</button>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(p._id)}>🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Returns Tab */}
        {activeTab === "returns" && (
          <div className="returns-container">
            <h2>↩️ Returns</h2>
            <p>Manage returned products here.</p>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="orders-container">
            <h2>📝 Orders</h2>
            <button className="submit-btn add-order-btn" onClick={() => {
              setNewOrder({ customerName: "", items: [{ productId: "", quantity: 1 }] }); // initialize first row
              setShowOrderModal(true);
            }}>
              ➕ Add Order
            </button>

            {/* Add Order Modal */}
            {showOrderModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>➕ Add New Order</h3>
                  <form onSubmit={handleSubmitOrder}>
                    <div className="form-group">
                      <label>Customer Name</label>
                      <input
                        type="text"
                        value={newOrder.customerName}
                        onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                        required
                      />
                    </div>

                    {newOrder.items.map((item, index) => (
                      <div key={index} className="order-item-row">
                        <select
                          name="productId"
                          value={item.productId}
                          onChange={(e) => handleOrderChange(e, index)}
                          required
                        >
                          <option value="">Select Product</option>
                          {products.map((p) => (
                            <option key={p._id} value={p._id}>
                              {p.name} ({p.stock} in stock)
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleOrderChange(e, index)}
                          required
                        />
                        <button type="button" onClick={() => removeOrderItem(index)}>❌</button>
                      </div>
                    ))}

                    <button type="button" onClick={addOrderItem}>
                      ➕ Add Item
                    </button>

                    <div className="modal-actions">
                      <button type="submit" className="submit-btn">Submit Order</button>
                      <button type="button" className="delete-btn" onClick={() => setShowOrderModal(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Total (LKR)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const orderTotal = order.total || order.products.reduce((sum, p) => {
                      const price = p.price || (p._id && p._id.priceLKR) || 0;
                      return sum + price * p.quantity;
                    }, 0);

                    return (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.customerName}</td>
                        <td>
                          {order.products.map((p, i) => (
                            <div key={i}>
                              {p.name || (p._id && p._id.name) || "Unknown Product"} x {p.quantity}
                            </div>
                          ))}
                        </td>
                        <td>{orderTotal}</td>
                        <td>{order.status}</td>
                        <td>
                          {order.status !== "Processed" ? (
                            <button
                              className="action-btn update-btn"
                              onClick={() => handleProcessOrder(order)}
                            >
                              ✅ Process
                            </button>
                          ) : (
                            <span>✔️ Processed</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreManager;
