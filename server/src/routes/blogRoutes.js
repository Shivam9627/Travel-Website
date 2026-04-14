import express from "express";
import { listBlogs, getBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", listBlogs);
router.get("/:slug", getBlog);

export default router;
