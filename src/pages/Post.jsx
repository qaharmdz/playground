import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { DataContext } from '../contexts/DataContext';

const Post = () => {
  const { slug } = useParams();
  const { data, loading, error } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const post = data.posts.find(post => post.slug === slug);
  const category = data.categories.find(category => category.id === post.categoryId);
  const postTags = data.tags.filter(tag => post.tags.includes(tag.id));

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Category: <Link to={`/category/${category.slug}`}>{category.title}</Link></p>
      <p>Tags:</p>
      <ul>
        {postTags.map(tag => (
          <li key={tag.id}>
            <Link to={`/tag/${tag.slug}`}>{tag.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
