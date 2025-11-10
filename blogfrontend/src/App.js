import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div style={{ maxWidth: "700px", margin: "auto", padding: "1.5rem" }}>
        {/* HEADER */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#111",
            }}
          >
            <h1 style={{ fontWeight: "600" }}>📝 My Blog</h1>
          </Link>

          <nav>
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link to="/admin" style={{ marginRight: "10px" }}>
                    Admin
                  </Link>
                )}
                <span style={{ marginRight: "10px" }}>Hi, {user.name}</span>
                <button
                  onClick={logout}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ marginRight: "10px" }}>
                  Login
                </Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>

        <hr />

        {/* ROUTES */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {user ? (
                  <CreatePost />
                ) : (
                  <p style={{ color: "#555" }}>Login to add a post</p>
                )}
                <PostList />
              </>
            }
          />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
