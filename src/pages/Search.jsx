import React, { useState, useContext, useEffect } from 'react';
import Fuse from 'fuse.js';
import { DataContext } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { removeDuplicates } from '../utils/dataHelper';

const Search = () => {
  const { data } = useContext(DataContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchMode, setSearchMode] = useState('OR'); // 'OR' or 'AND'

  const fuseOptions = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.3,
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'slug', weight: 0.5 },
      { name: 'description', weight: 0.3 },
      { name: 'content', weight: 0.2 },
      { name: 'tags', weight: 0.1 },
    ],
  };

  const fuse = new Fuse(data.posts, fuseOptions);

  const handleSearch = (query) => {
    if (query.length < 3) {
      setResults([]);
      return;
    };

    const terms = query.trim().split(/\s+/);

    const searchQuery = searchMode === 'OR'
      ? { $or: terms.map((term) => ({ $or: fuseOptions.keys.map((key) => ({ [key.name]: term })) })) }
      : { $and: terms.map((term) => ({ $or: fuseOptions.keys.map((key) => ({ [key.name]: term })) })) };

    const result = fuse.search(searchQuery);
    const uniqueResults = removeDuplicates(result.map(({ item }) => item), 'slug');
    setResults(uniqueResults);
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  };

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setSearchMode(newMode);
    handleSearch(query);
  };

  useEffect(() => {
    handleSearch(query);
  }, [searchMode]);

  return (
    <div className="search-page">
      <h1>Search</h1>
      <div className="input-group">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for posts..."
        />
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            setQuery('');
            setResults([]);
          }}
        >
          Clear
        </button>
      </div>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="search-mode"
            value="OR"
            checked={searchMode === 'OR'}
            onChange={handleModeChange}
          />
          Space as OR
        </label>
        <label>
          <input
            type="radio"
            name="search-mode"
            value="AND"
            checked={searchMode === 'AND'}
            onChange={handleModeChange}
          />
          Space as AND
        </label>
      </div>
      <p>Minimum character: 3</p>
      {results && <p>Results: {results.length}</p>}
      <ul>
        {results.map((post) => (
          <li key={post.slug}>
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
