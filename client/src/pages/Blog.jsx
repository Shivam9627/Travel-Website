import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchBlogs } from '../api/blogs';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchBlogs()
      .then(setPosts)
      .catch((e) => setErr(e.message));
  }, []);

  if (err) {
    return (
      <div className="page">
        <p className="blog-err">{err}</p>
      </div>
    );
  }

  return (
    <div className="page blog-page">
      <header className="blog-page__head">
        <h1>Travel journal</h1>
        <p>Long-form stories, routing ideas, and transport notes from our editors.</p>
      </header>
      <div className="blog-grid">
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="blog-card"
          >
            <Link to={`/blog/${post.slug}`} className="blog-card__media">
              <img src={post.cover} alt="" loading="lazy" />
            </Link>
            <div className="blog-card__body">
              <p className="blog-card__meta">
                {post.date} · {post.readTime}
              </p>
              <h2>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <div className="blog-card__tags">
                {post.tags?.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
