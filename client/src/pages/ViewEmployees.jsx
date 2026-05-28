import { useEffect, useState } from "react";
import API from "../api/api";
import "./ViewEmployees.css";

function ViewEmployees() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {

    try {

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const res = await API.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      setEmployees(res.data);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch employees");
    }
  };

  return (
    <div className="employees-container">

      <h1>Employee Details</h1>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ViewEmployees;