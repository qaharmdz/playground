import React from 'react';

const normalizeText = text => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
};

const tokenize = text => {
  return normalizeText(text).split(' ');
};

const matchTokens = (dataTokens, queryTokens) => {
  let matchScore = 0;
  queryTokens.forEach(queryToken => {
    if (dataTokens.some(dataToken => dataToken.includes(queryToken))) {
      matchScore += 1;
    }
  });
  return matchScore;
};

const fuzzySearch = (data, query) => {
  if (typeof data === 'string') {
    const dataTokens = tokenize(data);
    const queryTokens = tokenize(query);
    return matchTokens(dataTokens, queryTokens);
  } else if (Array.isArray(data)) {
    return data.reduce((maxScore, item) => Math.max(maxScore, fuzzySearch(item, query)), 0);
  } else if (typeof data === 'object' && data !== null) {
    return Object.values(data).reduce((maxScore, value) => Math.max(maxScore, fuzzySearch(value, query)), 0);
  }
  return 0;
};

export { fuzzySearch };
