import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Newsale.css";

function NewSale() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load products");
    }
  };

  const filteredProducts = (products || []).filter((product) =>
    (product?.name || "")
      .toLowerCase()
      .startsWith(search.toLowerCase())
  );

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

    setSearch("");
    setQuantity("");
    setSelectedProduct(null);
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const grandTotal = (cart || []).reduce(
    (sum, item) => sum + (item?.total || 0),
    0
  );

  const discount = grandTotal > 1000 ? grandTotal * 0.1 : 0;
  const taxableAmount = grandTotal - discount;
  const gst = taxableAmount * 0.18;
  const finalAmount = taxableAmount + gst;

  const completeSale = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      await API.post("/sales", {
        items: cart,
        subtotal: grandTotal,
        discount,
        gst,
        totalAmount: finalAmount,
      });

      alert("Sale Completed Successfully");

      setCart([]);
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to complete sale");
    }
  };

  return (
    <div className="container">
      <div className="newsale-card">

        {/* HEADER */}
        <div className="newsale-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            ⬅ Back
          </button>

          <h1>New Sale</h1>
        </div>

        {/* SEARCH */}
        <input
          className="newsale-input"
          placeholder="Search Product"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedProduct(null);
          }}
        />

        {/* SUGGESTIONS */}
        {search && !selectedProduct && (
          <div className="suggestion-box">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="suggestion-item"
                  onClick={() => {
                    setSelectedProduct(product);
                    setSearch(product.name);
                  }}
                >
                  {product.name}
                </div>
              ))
            ) : (
              <div className="no-data">No products found</div>
            )}
          </div>
        )}

        {/* QUANTITY */}
        <input
          className="newsale-input"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {/* PRODUCT DETAILS */}
        {selectedProduct && (
          <div className="details-box">
            <h3>Product Details</h3>

            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
            <p><strong>Stock:</strong> {selectedProduct.stock}</p>

            <p>
              <strong>Amount:</strong> ₹
              {selectedProduct.price * (Number(quantity) || 0)}
            </p>
          </div>
        )}

        {/* ADD BUTTON */}
        <button className="add-btn" onClick={addToCart}>
          Add To Cart
        </button>

        {/* CART */}
        <div className="cart-section">
          <h2>Cart</h2>

          {cart.length === 0 && <p>No products added</p>}

          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <p>₹{item.price} × {item.quantity}</p>
                <p>Total: ₹{item.total}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* BILL */}
        <div className="bill-box">
          <h3>Bill Summary</h3>

          <p>Subtotal: ₹{grandTotal.toFixed(2)}</p>
          <p>Discount: ₹{discount.toFixed(2)}</p>
          <p>GST (18%): ₹{gst.toFixed(2)}</p>

          <hr />

          <h2>Final Amount: ₹{finalAmount.toFixed(2)}</h2>
        </div>

        {/* COMPLETE SALE */}
        <button className="sale-btn" onClick={completeSale}>
          Complete Sale
        </button>

      </div>
    </div>
  );
}

export default NewSale;