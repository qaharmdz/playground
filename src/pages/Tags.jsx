import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { DataContext } from '../contexts/DataContext';

const Tags = () => {
  const { data, loading, error } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="tags">
      <h1>All Tags</h1>
      <ul>
        {data.tags.map(tag => (
          <li key={tag.id}>
            <Link to={`/tag/${tag.slug}`}>{tag.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
