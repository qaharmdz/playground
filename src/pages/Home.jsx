import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { ConfigContext } from '../contexts/ConfigContext';

const Home = () => {
  const { config } = useContext(ConfigContext);
  const { data, loading, error } = useContext(DataContext);

  console.log(config);
  console.log(data, loading, error);

  return (
    <div className="homepage">
      <h1>Home Page</h1>
      <h2>{config.name}</h2>
      <p>{config.tagline}</p>

      {data.categories.map(category => (
        <div key={category.id}>
          <h3>{category.title}</h3>
          <ul>
            {data.posts
              .filter(post => post.categoryId === category.id)
              .map(post => (
                <li key={post.id}>{post.title}</li>
              ))}
          </ul>
        </div>
      ))}

      <h3>Tags</h3>
      <ul>
        {data.tags.map(tag => (
          <li key={tag.slug}>{tag.title}</li>
        ))}
      </ul>

      <h3>All Posts</h3>
      <ul>
        {data.posts.map(post => (
          <li key={post.slug}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
