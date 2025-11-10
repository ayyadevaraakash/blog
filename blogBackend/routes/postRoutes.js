import express from "express";
import Post from "../models/postModel.js";

const router = express.Router();

// Create post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
