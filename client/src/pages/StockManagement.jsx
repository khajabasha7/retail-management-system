function StockManagement() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Stock Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Current Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Rice</td>
            <td>100</td>
            <td>Available</td>
          </tr>

          <tr>
            <td>Sugar</td>
            <td>5</td>
            <td>Low Stock</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StockManagement;