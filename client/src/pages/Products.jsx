import { useState, useEffect } from "react";
import API from "../api/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [stockQty, setStockQty] = useState({});
  const [newPrice, setNewPrice] = useState({});

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = async () => {
    try {
      const res = await API.get(
        `/products?page=${page}&limit=5&search=${search}`
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
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

      alert("Product Added Successfully");

      setName("");
      setSku("");
      setPrice("");
      setStock("");

      fetchProducts();
    } catch (err) {
      alert(
        err.response?.data?.error ||
        "Failed to add product"
      );
    }
  };

  const addStock = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const qty = stockQty[id];

      if (!qty || qty <= 0) {
        alert("Enter valid stock quantity");
        return;
      }

      await API.put(
        `/products/add-stock/${id}`,
        {
          quantity: Number(qty),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Stock Updated Successfully");

      setStockQty({
        ...stockQty,
        [id]: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to update stock"
      );
    }
  };

  const updatePrice = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const price = newPrice[id];

      if (!price || price <= 0) {
        alert("Enter valid price");
        return;
      }

      await API.put(
        `/products/update-price/${id}`,
        {
          price: Number(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Price Updated Successfully");

      setNewPrice({
        ...newPrice,
        [id]: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to update price"
      );
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Deleted");

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Product Management</h1>

      <form onSubmit={addProduct}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Initial Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button type="submit">
          Add Product
        </button>
      </form>

      <br />

      <input
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Add Stock</th>
            <th>Change Price</th>
            <th>Delete</th>
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
                <input
                  type="number"
                  placeholder="Qty"
                  value={stockQty[product._id] || ""}
                  onChange={(e) =>
                    setStockQty({
                      ...stockQty,
                      [product._id]: e.target.value,
                    })
                  }
                  style={{ width: "70px" }}
                />

                <button
                  onClick={() =>
                    addStock(product._id)
                  }
                >
                  Add
                </button>
              </td>

              <td>
                <input
                  type="number"
                  placeholder="New Price"
                  value={newPrice[product._id] || ""}
                  onChange={(e) =>
                    setNewPrice({
                      ...newPrice,
                      [product._id]: e.target.value,
                    })
                  }
                  style={{ width: "80px" }}
                />

                <button
                  onClick={() =>
                    updatePrice(product._id)
                  }
                >
                  Update
                </button>
              </td>

              <td>
                <button
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span style={{ margin: "10px" }}>
        Page {page}
      </span>

      <button
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Products;