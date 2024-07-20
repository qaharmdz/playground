export const filterByStatus = (data, status = 1) => {
  return data.filter(item => item.status === status);
};

export const sortData = (data, key = 'order', order = 'asc') => {
  return data.sort((a, b) => {
    if (order === 'asc') {
      return a[key] - b[key];
    } else {
      return b[key] - a[key];
    }
  });
};

/**
 * Removes duplicate objects from an array based on a specified key.
 *
 * @param {Array} arr - The array to remove duplicates from.
 * @param {string} key - The key to determine duplicates.
 * @returns {Array} - A new array with duplicates removed.
 */
export const removeDuplicates = (arr, key) => {
  const seen = new Set();
  return arr.filter(item => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    }
    seen.add(keyValue);
    return true;
  });
};

/**
 * Removes duplicate objects from an array of nested objects based on a specified key.
 *
 * @param {Array} arr - The array to remove duplicates from.
 * @param {string} key - The key within the nested object to determine duplicates.
 * @returns {Array} - A new array with duplicates removed.
 */
export const removeNestedDuplicates = (arr, key) => {
  const seen = new Set();
  return arr.filter((item) => {
    const value = item.item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};


export const paginateData = (data, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return data.slice(startIndex, endIndex);
};
