import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import CashierDashboard from "./pages/CashierDashboard";

import CreateUser from "./pages/CreateUser";
import ViewEmployees from "./pages/ViewEmployees";

import Products from "./pages/Products";
import StockManagement from "./pages/StockManagement";
import SalesReports from "./pages/SalesReports";

import NewSale from "./pages/NewSale";
import CashierInventory from "./pages/CashierInventory";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-user"
        element={
          <ProtectedRoute role="Admin">
            <CreateUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/view-employees"
        element={
          <ProtectedRoute role="Admin">
            <ViewEmployees />
          </ProtectedRoute>
        }
      />

      {/* Manager Routes */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute role="Manager">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute role="Manager">
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stock"
        element={
          <ProtectedRoute role="Manager">
            <StockManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sales"
        element={
          <ProtectedRoute role="Manager">
            <SalesReports />
          </ProtectedRoute>
        }
      />

      {/* Cashier Routes */}
      <Route
        path="/cashier"
        element={
          <ProtectedRoute role="Cashier">
            <CashierDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/inventory"
  element={
    <ProtectedRoute role="Cashier">
      <CashierInventory />
    </ProtectedRoute>
  }
/>

      <Route
        path="/new-sale"
        element={
          <ProtectedRoute role="Cashier">
            <NewSale />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;