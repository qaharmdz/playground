import React from 'react';
import { Link } from 'react-router-dom';
import postsData from '../data/postsData';
import categoriesData from '../data/categoriesData';

const Categories = () => {
  return (
    <div>
      <h2>Categories</h2>
      {categoriesData.map(category => (
        <div key={category.id}>
          <h3>
            <Link to={`/categories/${category.url_alias}`}>{category.name}</Link>
          </h3>
          <p>{category.short_description}</p>
          <ul>
            {postsData.filter(post => post.categories.includes(category.id)).map(post => (
              <li key={post.id}>
                <Link to={`/categories/${category.url_alias}/posts/${post.url_alias}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Categories;
