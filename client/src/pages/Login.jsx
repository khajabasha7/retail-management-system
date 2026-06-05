import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMsg("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      localStorage.setItem(
        "name",
        res.data.user.name
      );

      setMessage("✅ Login Successful");

      setTimeout(() => {
        const role = res.data.user.role;

        if (role === "Admin") {
          navigate("/admin");
        } else if (role === "Manager") {
          navigate("/manager");
        } else {
          navigate("/cashier");
        }
      }, 1000);

    } catch (error) {
      console.log(error);

      setErrorMsg(
        error.response?.data?.message ||
        "Invalid Email or Password"
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

        {message && (
          <p
            style={{
              color: "green",
              textAlign: "center",
              marginBottom: "15px",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        {errorMsg && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "15px",
              fontWeight: "bold",
            }}
          >
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;