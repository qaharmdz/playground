import React from 'react';
import { Link } from 'react-router-dom';
import postsData from '../data/postsData';

const Tags = () => {
  const tags = [...new Set(postsData.flatMap(post => post.tags))];

  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <Link to={`/tags/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
