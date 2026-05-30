function Products() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Products</h1>

      <button>Add Product</button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Rice</td>
            <td>₹50</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Products;