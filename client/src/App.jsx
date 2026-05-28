import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import CashierDashboard from "./pages/CashierDashboard";
import CreateUser from "./pages/CreateUser";
import ViewEmployees from "./pages/ViewEmployees";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={
        <ProtectedRoute role="Admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/manager" element={
        <ProtectedRoute role="Manager">
          <ManagerDashboard />
        </ProtectedRoute>
      } />

      <Route path="/cashier" element={
        <ProtectedRoute role="Cashier">
          <CashierDashboard />
        </ProtectedRoute>
      } />

      <Route path="/create-user" element={
        <ProtectedRoute role="Admin">
          <CreateUser />
        </ProtectedRoute>
      } />
      <Route path="/view-employees" element={<ViewEmployees />} />
    </Routes>
  );
}

export default App;