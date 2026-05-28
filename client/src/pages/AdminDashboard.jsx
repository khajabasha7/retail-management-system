
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="admin-container">

      <div className="admin-navbar">
        <h1>Admin Dashboard</h1>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <div className="dashboard-cards">

        {/* CREATE USER */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/create-user")}
        >
          <h2>Create Users</h2>
          <p>Create Manager and Cashier accounts</p>
        </div>

        {/* VIEW STORES */}
        <div className="dashboard-card">
          <h2>View All Stores</h2>
          <p>Manage retail store branches</p>
        </div>

        {/* SETTINGS */}
        <div className="dashboard-card">
          <h2>System Settings</h2>
          <p>Configure system preferences</p>
        </div>

          <div className="dashboard-card" onClick={() => navigate("/view-employees")}>
            <h2>View Employees</h2>
            <p>Manage employee records</p>
          </div>
        </div>
      </div>

    
  );
}

export default AdminDashboard;