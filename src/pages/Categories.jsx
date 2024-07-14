import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { DataContext } from '../contexts/DataContext';

const Categories = () => {
  const { data, loading, error } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="categories">
      <h1>All Categories</h1>
      <ul>
        {data.categories.map(category => (
          <li key={category.id}>
            <Link to={`/category/${category.slug}`}>{category.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
