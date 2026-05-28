// function CashierDashboard() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🧾 Cashier Dashboard</h1>

//       <ul>
//         <li>New Sale (POS)</li>
//         <li>Scan Products</li>
//         <li>Generate Bill</li>
//       </ul>
//     </div>
//   );
// }

// export default CashierDashboard;
import "./CashierDashboard.css";
import { useNavigate } from "react-router-dom";

function CashierDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="cashier-container">

      {/* NAVBAR */}
      <div className="cashier-navbar">

        <h1>Cashier Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      {/* CARDS */}
      <div className="cashier-cards">

        <div className="cashier-card">
          <h2>New Sale</h2>
          <p>Create customer billing</p>
        </div>

        <div className="cashier-card">
          <h2>Transactions</h2>
          <p>View payment history</p>
        </div>

        <div className="cashier-card">
          <h2>Products</h2>
          <p>Check available inventory</p>
        </div>

      </div>

    </div>
  );
}

export default CashierDashboard;