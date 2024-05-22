import React from 'react';
import { useParams, Link } from 'react-router-dom';
import postsData from '../data/postsData';
import categoriesData from '../data/categoriesData';
import tagsData from '../data/tagsData';

const Post = () => {
  const { postId, urlAlias, categoryAlias } = useParams();
  let post;

  if (postId) {
    post = postsData.find(p => p.id === parseInt(postId, 10));
  } else if (urlAlias) {
    post = postsData.find(p => p.url_alias === urlAlias);
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const categories = categoriesData.filter(cat => post.categories.includes(cat.id));
  const tags = tagsData.filter(tag => post.tags.includes(tag.id));

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h3>Categories:</h3>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link to={`/categories/${category.url_alias}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <h3>Tags:</h3>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>
            <Link to={`/tags/${tag.url_alias}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
