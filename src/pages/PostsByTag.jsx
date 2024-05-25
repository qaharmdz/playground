import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllData, STORE_NAMES } from '../services/indexedDB';

const PostsByTag = () => {
  const { tagAlias } = useParams();
  const [tag, setTag] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allTags = await getAllData(STORE_NAMES.tags);
      const foundTag = allTags.find(tag => tag.url_alias === tagAlias);
      setTag(foundTag);

      if (foundTag) {
        const allPosts = await getAllData(STORE_NAMES.posts);
        const tagPosts = allPosts.filter(post => post.tags.includes(foundTag.id));
        setPosts(tagPosts);
      }
    }

    fetchData();
  }, [tagAlias]);

  if (!tag) {
    return <div>Tag not found</div>;
  }

  return (
    <div>
      <h2>Posts tagged with {tag.name}</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsByTag;
