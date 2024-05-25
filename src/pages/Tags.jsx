import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllData, STORE_NAMES } from '../services/indexedDB';

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      const data = await getAllData(STORE_NAMES.tags);
      setTags(data);
    }

    fetchTags();
  }, []);

  return (
    <div>
      <h2>Tags</h2>
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

export default Tags;
