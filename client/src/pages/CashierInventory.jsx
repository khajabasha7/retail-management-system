import { useEffect, useState } from "react";
import API from "../api/api";

function CashierInventory() {
  const [products, setProducts] = useState([]);

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
    <div style={{ padding: "30px" }}>
      <h1>Inventory</h1>

      <table border="1" cellPadding="10">
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

export default CashierInventory;