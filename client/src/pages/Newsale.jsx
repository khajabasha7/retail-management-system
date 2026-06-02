import { useEffect, useState } from "react";
import API from "../api/api";

function NewSale() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load products");
    }
  };

  const addToCart = () => {
    if (!selectedProduct || !quantity) {
      alert("Select product and quantity");
      return;
    }

    const item = {
      productId: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: Number(quantity),
      total: selectedProduct.price * Number(quantity),
    };

    setCart([...cart, item]);

    setProductId("");
    setQuantity("");
    setSelectedProduct(null);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const completeSale = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      await API.post("/sales", {
        items: cart,
        totalAmount: grandTotal,
      });

      alert("Sale Completed Successfully");

      setCart([]);
      fetchProducts();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to complete sale"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>New Sale</h1>

        <select
          style={styles.input}
          value={productId}
          onChange={(e) => {
            const id = e.target.value;

            setProductId(id);

            const product = products.find(
              (p) => p._id === id
            );

            setSelectedProduct(product);
          }}
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option
              key={product._id}
              value={product._id}
            >
              {product.name}
            </option>
          ))}
        </select>

        <input
          style={styles.input}
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {selectedProduct && (
          <div style={styles.detailsBox}>
            <h3>Product Details</h3>

            <p>Name: {selectedProduct.name}</p>

            <p>Price: ₹{selectedProduct.price}</p>

            <p>
              Available Stock: {selectedProduct.stock}
            </p>

            <p>
              Amount: ₹
              {selectedProduct.price *
                (Number(quantity) || 0)}
            </p>
          </div>
        )}

        <button
          style={styles.addBtn}
          onClick={addToCart}
        >
          Add To Cart
        </button>

        <div style={styles.cart}>
          <h2>Cart</h2>

          {cart.length === 0 && (
            <p>No products added</p>
          )}

          {cart.map((item, index) => (
            <div
              key={index}
              style={styles.cartItem}
            >
              <div>
                <strong>{item.name}</strong>

                <p>
                  ₹{item.price} × {item.quantity}
                </p>

                <p>Total: ₹{item.total}</p>
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() =>
                  removeItem(index)
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <h2 style={styles.total}>
          Grand Total: ₹{grandTotal}
        </h2>

        <button
          style={styles.saleBtn}
          onClick={completeSale}
        >
          Complete Sale
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    padding: "30px",
  },

  card: {
    width: "700px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  detailsBox: {
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
  },

  addBtn: {
    width: "100%",
    padding: "12px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },

  cart: {
    marginTop: "20px",
  },

  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  total: {
    textAlign: "right",
    marginTop: "20px",
    color: "#2563eb",
  },

  saleBtn: {
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default NewSale;