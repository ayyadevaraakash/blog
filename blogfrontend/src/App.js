import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h1>📝 My Blog</h1>
      <CreatePost />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
