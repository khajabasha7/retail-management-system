import { useEffect, useState } from "react";
import API from "../api/api";

function SalesReports() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await API.get("/sales");
      setSales(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load sales");
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sales Reports</h1>

      <div style={styles.summaryCard}>
        <h2>Total Revenue</h2>
        <h1>₹{totalRevenue}</h1>
      </div>

      {loading ? (
        <h3>Loading Sales...</h3>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Products Sold</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="3">No Sales Found</td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale._id}>
                  <td>
                    {sale.createdAt
                      ? new Date(
                          sale.createdAt
                        ).toLocaleString()
                      : "N/A"}
                  </td>

                  <td>
                    {sale.items?.map((item, index) => (
                      <div key={index}>
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td>₹{sale.totalAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "20px",
  },

  summaryCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
};

export default SalesReports;