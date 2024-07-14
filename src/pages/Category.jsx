import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { DataContext } from '../contexts/DataContext';

const Category = () => {
  const { slug } = useParams();
  const { data, loading, error } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const category = data.categories.find(category => category.slug === slug);
  const posts = data.posts.filter(post => post.categoryId === category.id);

  return (
    <div className="category">
      <h1>{category.title}</h1>
      <p>{category.description}</p>
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

export default Category;
