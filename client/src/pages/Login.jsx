import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save role
      localStorage.setItem("role", res.data.user.role);

      // Save name
      localStorage.setItem("name", res.data.user.name);

      alert("Login Successful");

      // Redirect based on role
      const role = res.data.user.role;

      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Manager") {
        navigate("/manager");
      } else {
        navigate("/cashier");
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed. Check credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">
          Retail System Login
        </h2>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;