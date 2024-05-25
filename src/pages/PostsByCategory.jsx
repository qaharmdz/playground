import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllData, STORE_NAMES } from '../services/indexedDB';

const PostsByCategory = () => {
  const { categoryAlias } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allCategories = await getAllData(STORE_NAMES.categories);
      const foundCategory = allCategories.find(cat => cat.url_alias === categoryAlias);
      setCategory(foundCategory);

      if (foundCategory) {
        const allPosts = await getAllData(STORE_NAMES.posts);
        const categoryPosts = allPosts.filter(post => post.categories.includes(foundCategory.id));
        setPosts(categoryPosts);
      }
    }

    fetchData();
  }, [categoryAlias]);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <h2>Posts in {category.name}</h2>
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

export default PostsByCategory;
