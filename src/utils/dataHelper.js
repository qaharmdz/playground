/**
 * Sort an array of objects by a specified key.
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
 * Slice an array of data for pagination.
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

export { sortData, paginateData };
