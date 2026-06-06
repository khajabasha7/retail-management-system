import { useEffect, useState } from "react";
import API from "../api/api";
import "./CashierInventory.css";
import {useNavigate} from "react-router-dom";

function CashierInventory() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="inventory-container">

    {/* Navbar */}
    <div className="inventory-navbar">

      {/* <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button> */}

      <h2>Inventory Management</h2>

      <button
        className="home-btn"
        onClick={() => navigate("/cashier")}
      >
        Back
      </button>

    </div>

    <div className="inventory-content">

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <span
                  className={
                    product.stock <= 5
                      ? "low-stock"
                      : "available"
                  }
                >
                  {product.stock <= 5
                    ? "Low Stock"
                    : "Available"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
);
}

export default CashierInventory;