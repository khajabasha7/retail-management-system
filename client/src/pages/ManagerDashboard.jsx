import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="manager-container">
      {/* Navbar */}
      <div className="manager-navbar">
        <h1>Manager Dashboard</h1>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Welcome */}
      <div className="welcome-section">
        <h2>Welcome, {localStorage.getItem("name")}</h2>
      </div>

      {/* Cards */}
      <div className="manager-cards">
        <div
          className="manager-card"
          onClick={() => navigate("/products")}
        >
          <h2>Products</h2>
          <p>Manage product inventory</p>
        </div>

        <div
          className="manager-card"
          onClick={() => navigate("/stock")}
        >
          <h2>Stock Management</h2>
          <p>Update and monitor stock levels</p>
        </div>

        <div
          className="manager-card"
          onClick={() => navigate("/sales")}
        >
          <h2>Sales Reports</h2>
          <p>View daily and monthly sales</p>
        </div>

        <div
          className="manager-card"
          onClick={() => navigate("/view-employees")}
        >
          <h2>Employees</h2>
          <p>View employee information</p>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;