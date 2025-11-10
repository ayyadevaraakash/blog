import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role === "admin") {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      }
    };
    fetchUsers();
  }, [user]);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id));
      } else {
        alert("Failed to delete user");
      }
    }
  };

  if (!user || user.role !== "admin") {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Users</h3>
      {users.map((u) => (
        <div
          key={u._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <p>
            <strong>{u.name}</strong> ({u.email}) — {u.role}
          </p>
          {u.role !== "admin" && (
            <button
              onClick={() => deleteUser(u._id)}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete User
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
