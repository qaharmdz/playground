import React from 'react';
import { Link } from 'react-router-dom';
import postsData from '../data/postsData';

const Posts = () => {
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {postsData.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
