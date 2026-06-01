import { useEffect, useState } from "react";
import API from "../api/api";

function StockManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Stock Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Current Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.stock}</td>
              <td>
                {product.stock <= 5
                  ? "Low Stock"
                  : "Available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockManagement;