import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="manager-container">

      <div className="manager-card"
           onClick={() => navigate("/products")}>
        <h2>Products</h2>
        <p>Manage product inventory</p>
      </div>

      <div className="manager-card"
           onClick={() => navigate("/stock")}>
        <h2>Stock Management</h2>
        <p>Update and monitor stock levels</p>
      </div>

      <div className="manager-card"
           onClick={() => navigate("/sales")}>
        <h2>Sales Reports</h2>
        <p>View daily and monthly sales</p>
      </div>

      <div className="manager-card"
           onClick={() => navigate("/view-employees")}>
        <h2>Employees</h2>
        <p>View employee information</p>
      </div>

    </div>
  );
}

export default ManagerDashboard;