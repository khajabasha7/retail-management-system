import { useState } from "react";
import API from "../api/api";

function Products() {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      const res = await API.post(
        "/products",
        {
          name,
          sku,
          price: Number(price),
          stock: Number(stock),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Product Added Successfully");

      setName("");
      setSku("");
      setPrice("");
      setStock("");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add product"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Product Management</h1>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
  },

  card: {
    width: "400px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 5px 20px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2563eb",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Products;