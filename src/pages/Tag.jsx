import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { DataContext } from '../contexts/DataContext';

const Tag = () => {
  const { slug } = useParams();
  const { data, loading, error } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tag = data.tags.find(tag => tag.slug === slug);
  const posts = data.posts.filter(post => post.tags.includes(tag.id));

  return (
    <div className="tag">
      <h1>{tag.title}</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tag;
