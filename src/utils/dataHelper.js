import React, { useState, useEffect } from 'react';

/**
 * Sort an array of objects by a specified key.
 *
 * @param {Array} data - The array of objects to sort.
 * @param {string} key - The key to sort by.
 * @param {string} order - The sort order ('asc' for ascending, 'desc' for descending).
 * @returns {Array} - The sorted array.
 */
const sortData = (data, key, order = 'asc') => {
  return data.sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

/**
 * Filters an array of objects based on a specified status value.
 *
 * @param {Array} data - The array of objects to filter.
 * @param {number} statusValue - The status value to filter by.
 * @returns {Array} The filtered array of objects.
 */
const filterStatus = (data, statusValue) => {
  return data.filter(item => item.status === statusValue);
};

/**
 * Slice an array of data for pagination.
 *
 * @param {Array} data - The array of objects to paginate.
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items per page.
 * @returns {Array} - The paginated array.
 */
const paginateData = (data, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
};

/**
 * Custom hook to fetch data with loading and error states.
 *
 * @param {Function} fetchFunction - The async function to fetch data. Must return a Promise.
 * @returns {Object} An object containing:
 *  - data: The fetched data or null if not yet fetched.
 *  - loading: Boolean indicating whether the data is currently being fetched.
 *  - error: An error object if an error occurred during fetching, otherwise null.
 */
const useGetData = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
};

export { sortData, filterStatus, paginateData, useGetData };
