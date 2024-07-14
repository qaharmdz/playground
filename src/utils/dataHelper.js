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

export const paginateData = (data, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return data.slice(startIndex, endIndex);
};
