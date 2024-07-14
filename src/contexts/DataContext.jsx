import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ConfigContext } from './ConfigContext';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { config } = useContext(ConfigContext);
  const [data, setData] = useState({
    posts: [],
    categories: [],
    tags: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await axios.get(`${config.dataApi.baseUrl}${config.dataApi.categories}`);
        if (categoriesResponse.status !== 200) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.statusText}`);
        }
        const categories = categoriesResponse.data;

        if (!Array.isArray(categories)) {
          throw new Error(`Expected categories to be an array but got ${typeof categories}`);
        }

        const tagsResponse = await axios.get(`${config.dataApi.baseUrl}${config.dataApi.tags}`);
        if (tagsResponse.status !== 200) {
          throw new Error(`Failed to fetch tags: ${tagsResponse.statusText}`);
        }
        const tags = tagsResponse.data;

        if (!Array.isArray(tags)) {
          throw new Error(`Expected tags to be an array but got ${typeof tags}`);
        }

        const postsPromises = categories.map(category =>
          axios.get(`${config.dataApi.baseUrl}${config.dataApi.posts}${category.slug}.json`)
            .then(response => {
              if (response.status !== 200) {
                throw new Error(`Failed to fetch posts for category ${category.slug}: ${response.statusText}`);
              }
              return response.data;
            })
        );

        const postsArray = await Promise.all(postsPromises);
        const posts = postsArray.flat();

        setData({
          categories,
          tags,
          posts,
        });
        setError(null);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config.dataApi]);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
