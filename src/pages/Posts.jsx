import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllData, STORE_NAMES } from '../services/indexedDB';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getAllData(STORE_NAMES.posts);
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
