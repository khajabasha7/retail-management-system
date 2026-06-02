import { useEffect, useState } from "react";
import API from "../api/api";

function SalesReports() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const res = await API.get("/sales");
    setSales(res.data);
  };

  const totalSales = sales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Sales Reports</h1>

      <h3>Total Revenue</h3>

      <p>₹{totalSales}</p>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>
                {sale.productId?.name}
              </td>

              <td>
                {sale.quantity}
              </td>

              <td>
                ₹{sale.totalAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesReports;