import React from 'react';
import { useParams, Link } from 'react-router-dom';
import postsData from '../data/postsData';
import categoriesData from '../data/categoriesData';

const PostsByCategory = () => {
  const { categoryAlias } = useParams();
  const category = categoriesData.find(cat => cat.url_alias === categoryAlias);

  if (!category) {
    return <div>Category not found</div>;
  }

  const filteredPosts = postsData.filter(post => post.categories.includes(category.id));

  return (
    <div>
      <h2>Posts in Category: {category.name}</h2>
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <Link to={`/categories/${categoryAlias}/posts/${post.url_alias}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsByCategory;
