import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllData, STORE_NAMES } from '../services/indexedDB';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allCategories = await getAllData(STORE_NAMES.categories);
        const allPosts = await getAllData(STORE_NAMES.posts);
        setCategories(allCategories);
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching categories or posts:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      {categories.map(category => (
        <div key={category.id}>
          <h3>
            <Link to={`/categories/${category.url_alias}`}>{category.name}</Link>
          </h3>
          <p>{category.short_description}</p>
          <ul>
            {posts.filter(post => post.categories.includes(category.id)).slice(0, 6).map((post, index) => (
              <li key={post.id}>
                <Link to={`/posts/url/${post.url_alias}`}>
                  {post.title}
                </Link>
                {index < 2 && <p>{post.content.slice(0, 100)}...</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Categories;
