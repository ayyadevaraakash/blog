import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/posts/${id}`,
          { method: "DELETE" }
        );
        if (res.ok) {
          setPosts(posts.filter((post) => post._id !== id));
        }
      } catch (err) {
        console.error("Error deleting post:", err);
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
            style={{
              textDecoration: "none",
              color: "#111",
            }}
          >
            <h3 style={{ marginBottom: "6px" }}>{post.title}</h3>
          </Link>
          <p>{post.content.substring(0, 100)}...</p>
          <small>✍️ {post.author}</small>
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
        </div>
      ))}
    </div>
  );
}

export default PostList;
