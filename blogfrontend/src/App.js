import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <Router>
      <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "600",
            color: "#111",
            cursor: "pointer",
          }}
        >
          📝 My Blog
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CreatePost />
                <hr />
                <PostList />
              </>
            }
          />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
