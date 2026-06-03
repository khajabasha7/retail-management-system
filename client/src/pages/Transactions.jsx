import { useEffect, useState } from "react";
import API from "../api/api";

function Transactions() {
  const [sales, setSales] = useState([]);
  const [searchDate, setSearchDate] = useState("");

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
    <div style={{ padding: "30px" }}>
      <h1>Transactions</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Search By Date:
        </label>

        <input
          type="date"
          value={searchDate}
          onChange={(e) =>
            setSearchDate(e.target.value)
          }
          style={{
            marginLeft: "10px",
            padding: "5px",
          }}
        />
      </div>

      <table border="1" cellPadding="10">
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
                {new Date(
                  sale.createdAt
                ).toLocaleString()}
              </td>

              <td>
                {sale.items?.map(
                  (item, index) => (
                    <div key={index}>
                      {item.name}
                    </div>
                  )
                )}
              </td>

              <td>
                {sale.items?.map(
                  (item, index) => (
                    <div key={index}>
                      {item.quantity}
                    </div>
                  )
                )}
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

export default Transactions;