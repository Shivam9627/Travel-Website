import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBlogBySlug } from '../api/blogs';
import './Blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchBlogBySlug(slug)
      .then(setPost)
      .catch(() => setErr('Post not found'));
  }, [slug]);

  if (err) {
    return (
      <div className="page">
        <p>{err}</p>
        <Link to="/blog">← Back to journal</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <article className="page blog-article">
      <Link to="/blog" className="blog-back">
        ← Journal
      </Link>
      <div className="blog-article__cover">
        <img src={post.cover} alt="" />
      </div>
      <p className="blog-article__meta">
        {post.date} · {post.readTime} · {post.author}
      </p>
      <h1>{post.title}</h1>
      <div className="blog-article__body">{post.content}</div>
    </article>
  );
};

export default BlogPost;
