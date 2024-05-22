import React from 'react';
import { useParams, Link } from 'react-router-dom';
import postsData from '../data/postsData';
import tagsData from '../data/tagsData';

const PostsByTag = () => {
  const { tagAlias } = useParams();
  const tag = tagsData.find(tag => tag.url_alias === tagAlias);

  if (!tag) {
    return <div>Tag not found</div>;
  }

  const filteredPosts = postsData.filter(post => post.tags.includes(tag.id));

  return (
    <div>
      <h2>Posts with Tag: {tag.name}</h2>
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/url/${post.url_alias}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsByTag;
