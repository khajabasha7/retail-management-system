import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const [sales, setSales] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await API.get("/sales");
      setSales(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load transactions");
    }
  };

  const filteredSales = sales.filter((sale) => {
    if (!searchDate) return true;

    const saleDate = new Date(sale.createdAt)
      .toISOString()
      .split("T")[0];

    return saleDate === searchDate;
  });

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            Back
          </button>

          <h1 style={styles.title}>Transactions</h1>
        </div>

        {/* DATE FILTER */}
        <div style={{ marginBottom: "20px" }}>
          <label>Search By Date: </label>

          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Bill Number</th>
              <th>Date & Time</th>
              <th>Items Purchased</th>
              <th>Quantity</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.billNumber}</td>

                <td>
                  {new Date(sale.createdAt).toLocaleString()}
                </td>

                <td>
                  {sale.items?.map((item, index) => (
                    <div key={index}>{item.name}</div>
                  ))}
                </td>

                <td>
                  {sale.items?.map((item, index) => (
                    <div key={index}>{item.quantity}</div>
                  ))}
                </td>

                <td>₹{sale.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "900px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  title: {
    color: "#2563eb",
    flex: 1,
    textAlign: "center",
  },

  backBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  input: {
    marginLeft: "10px",
    padding: "6px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default Transactions;