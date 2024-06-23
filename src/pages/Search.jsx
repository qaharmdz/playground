import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchInStores } from '../utils/dbContent';

const Search = () => {
  const baseResults = { posts: [], categories: [], tags: [] };

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(baseResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!query) {
      setResults(baseResults);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchInStores(query);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ui-flex-column">
      <h1>Search</h1>

      <form className="ui-flex-row ui-gap-sm" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {results.categories.length > 0 && (
        <>
          <h2>Categories</h2>
          <ul>
            {results.categories.map((category) => (
              <li key={category.id}>
                <Link to={`/category/${category.id}`}>{category.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {results.tags.length > 0 && (
        <>
          <h2>Tags</h2>
          <ul>
            {results.tags.map((tag) => (
              <li key={tag.id}>
                <Link to={`/tag/${tag.id}`}>{tag.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {results.posts.length > 0 && (
        <>
          <h2>Posts</h2>
          <ul>
            {results.posts.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.compositeId}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Search;
