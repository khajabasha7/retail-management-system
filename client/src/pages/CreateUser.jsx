import { useState } from "react";
import API from "../api/api";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Cashier");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/auth/register",
        { name, email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User created successfully");

      // clear form after success
      setName("");
      setEmail("");
      setPassword("");
      setRole("Cashier");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create New User</h2>

        <form onSubmit={handleCreate}>

          {/* NAME */}
          <label>Name</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* EMAIL */}
          <label>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <label>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ROLE */}
          <label>Role</label>
          <select
            style={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Cashier">Cashier</option>
          </select>

          <button style={styles.button} type="submit">
            Create User
          </button>

        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: "350px",
    padding: "25px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    background: "#2a5298",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default CreateUser;