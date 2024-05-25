import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getData, getAllData, STORE_NAMES } from '../services/indexedDB';

const Post = () => {
  const { postId, urlAlias, categoryAlias } = useParams();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let postData;
      if (postId) {
        postData = await getData(STORE_NAMES.posts, parseInt(postId, 10));
      } else if (urlAlias) {
        const allPosts = await getAllData(STORE_NAMES.posts);
        postData = allPosts.find(p => p.url_alias === urlAlias);
      }

      if (postData) {
        setPost(postData);
        const allCategories = await getAllData(STORE_NAMES.categories);
        const postCategories = allCategories.filter(cat => postData.categories.includes(cat.id));
        setCategories(postCategories);

        const allTags = await getAllData(STORE_NAMES.tags);
        const postTags = allTags.filter(tag => postData.tags.includes(tag.id));
        setTags(postTags);
      }
    }

    fetchData();
  }, [postId, urlAlias]);

  if (!post) {
    return <div>Post not found</div>;
  }

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
