import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllData, STORE_NAMES } from '../services/indexedDB';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const categoryData = await getAllData(STORE_NAMES.categories);
      const postData = await getAllData(STORE_NAMES.posts);
      setCategories(categoryData);
      setPosts(postData);
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
            {posts.filter(post => post.categories.includes(category.id)).map(post => (
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
