import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Link to="/" style={{ textDecoration: "none", color: "#2563eb" }}>
        ← Back to Home
      </Link>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "10px",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>{post.title}</h2>
        <p style={{ marginBottom: "10px" }}>{post.content}</p>
        <small>✍️ {post.author}</small>
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#555" }}>
          🕒 Created at: {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
