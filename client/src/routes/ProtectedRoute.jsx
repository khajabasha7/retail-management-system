// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children, role }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   // ❌ Not logged in
//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   // ❌ Wrong role
//   if (role && userRole !== role) {
//     return <h2>Access Denied ❌</h2>;
//   }

//   return children;
// }

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;

  if (role && userRole !== role) {
    return <h2>Access Denied</h2>;
  }

  return children;
}

export default ProtectedRoute;