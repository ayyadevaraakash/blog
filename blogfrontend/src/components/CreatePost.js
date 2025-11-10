import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "", author: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Post added!");
        window.location.reload();
      } else {
        alert("Failed to add post");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: "8px", margin: "4px 0" }}
      />
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: "8px", margin: "4px 0" }}
      />
      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", margin: "4px 0" }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "8px 16px",
          border: "none",
          cursor: "pointer",
          marginTop: "4px",
        }}
      >
        Add Post
      </button>
    </form>
  );
}

export default CreatePost;
