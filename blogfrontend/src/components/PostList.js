import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!user || user.role !== "admin") {
      alert("Only admin can delete posts");
      return;
    }

    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== id));
      }
    }
  };

  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            backgroundColor: "white",
          }}
        >
          <Link
            to={`/post/${post._id}`}
            style={{ textDecoration: "none", color: "#111" }}
          >
            <h3>{post.title}</h3>
          </Link>
          <p>{post.content.substring(0, 100)}...</p>
          <small>✍️ {post.author}</small>
          {user?.role === "admin" && (
            <div style={{ marginTop: "8px" }}>
              <button
                onClick={() => handleDelete(post._id)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
