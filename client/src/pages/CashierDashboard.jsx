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

      {/* Navbar */}
      <div className="cashier-navbar">
        <h1>Cashier Dashboard</h1>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Welcome */}
      <div className="welcome-section">
        <h2>
          Welcome, {localStorage.getItem("name")}
        </h2>

        <p>
          Manage sales and billing operations
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="cashier-cards">

        <div
          className="cashier-card"
          onClick={() => navigate("/new-sale")}
        >
          <h2>New Sale</h2>
          <p>Create customer billing and reduce stock</p>
        </div>

        <div
  className="cashier-card"
  onClick={() => navigate("/transactions")}
>
  <h2>Transactions</h2>
  <p>View completed sales</p>
</div>
        
        <div
          className="cashier-card"
          onClick={() => navigate("/inventory")}
        >
          <h2>Inventory</h2>
          <p>Check available inventory</p>
        </div>

      </div>
    </div>
  );
}

export default CashierDashboard;