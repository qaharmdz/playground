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
 * @param {Array} params - Parameters to pass to the fetchFunction.
 * @returns {Object} An object containing:
 *  - data: The fetched data or null if not yet fetched.
 *  - loading: Boolean indicating whether the data is currently being fetched.
 *  - error: An error object if an error occurred during fetching, otherwise null.
 */
const useGetData = (fetchFunction, params = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction(...params);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, ...params]);

  return { data, loading, error };
};

/**
 * Create HTML tags from a one-dimensional array of items.
 *
 * @param {Array} items - The array of items.
 * @returns {Array} - An array of React elements generated from the items.
 */
const tagFromArrObject = (items) => {
  const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span', 'a', 'ul', 'li', 'ol', 'b', 'i', 'u', 'strong', 'em'];

  return items.map((item, index) => {
    const Tag = validTags.includes(item.html) ? item.html : 'div'; // Ensure the tag is valid
    const attributes = item.attr ? item.attr.reduce((acc, attr) => ({ ...acc, ...attr }), {}) : {};

    return React.createElement(
      Tag,
      {
        key: index,
        className: item.class ? item.class : '',
        ...attributes,
        dangerouslySetInnerHTML: { __html: item.text },
      }
    );
  });
};

export { sortData, filterStatus, paginateData, useGetData, tagFromArrObject };
