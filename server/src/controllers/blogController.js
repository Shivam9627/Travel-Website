import { blogs } from "../data/blogs.js";

export const listBlogs = async (req, res) => {
  res.json(blogs.map((b) => ({ ...b, content: undefined })));
};

export const getBlog = async (req, res) => {
  const post = blogs.find((b) => b.slug === req.params.slug);
  if (!post) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(post);
};
