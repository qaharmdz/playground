import CONFIG from '../config';
import { dbGetAllData, dbGetAllDataByIndex, dbGetData, searchData } from './db';
import { sortData, filterStatus, paginateData } from './dataHelper';

const getAllCategories = async () => {
  let categories = await dbGetAllData('categories');
  categories = filterStatus(categories, 1);
  return sortData(categories, 'priority', 'desc');
};

const getCategoryById = async (categoryId) => {
  const intCategoryId = parseInt(categoryId, 10);
  return await dbGetData('categories', intCategoryId);
};

const getAllPostsByCategory = async (categoryId) => {
  const intCategoryId = parseInt(categoryId, 10);
  let posts = await dbGetAllDataByIndex('posts', 'categories', intCategoryId);
  posts = filterStatus(posts, 1);
  return sortData(posts, 'priority', 'desc');
};

const getPostsByCategoryForPage = async (categoryId, page) => {
  const intCategoryId = parseInt(categoryId, 10);
  const intPage = parseInt(page, 10);
  let allPosts = await getAllPostsByCategory(intCategoryId);
  return paginateData(allPosts, intPage, CONFIG.settings.limitPerPage);
};


const getAllTags = async () => {
  let tags = await dbGetAllData('tags');
  tags = filterStatus(tags, 1);
  return sortData(tags, 'priority', 'desc');
};

const getTagById = async (tagId) => {
  const intTagId = parseInt(tagId, 10);
  return await dbGetData('tags', intTagId);
};

const getAllPostsByTag = async (tagId) => {
  const intTagId = parseInt(tagId, 10);
  let posts = await dbGetAllDataByIndex('posts', 'tags', intTagId);
  posts = filterStatus(posts, 1);
  return sortData(posts, 'priority', 'desc');
};


const getPostByCompositeId = async (compositeId) => {
  const post = await dbGetData('posts', compositeId);
  if (!post || !post.status) return null;

  const categories = await Promise.all(post.categories.map(catId => dbGetData('categories', catId)));
  const tags = await Promise.all(post.tags.map(tagId => dbGetData('tags', tagId)));

  // Filter out undefined categories and tags
  const filteredCategories = categories.filter(category => category !== undefined);
  const filteredTags = tags.filter(tag => tag !== undefined);

  const sortedCategories = sortData(filteredCategories, 'priority', 'desc');
  const sortedTags = sortData(filteredTags, 'priority', 'desc');

  return { post, categories: sortedCategories, tags: sortedTags };
};

const searchInStores = async (query) => {
  const storeMap = {
    posts: ['title', 'description', 'content'],
    categories: ['title', 'description'],
    tags: ['title', 'description'],
  };

  const results = {
    posts: [],
    categories: [],
    tags: [],
  };

  const searchResults = await searchData(query, storeMap);

  for (const { storeName, record } of searchResults) {
    if (record.status === 1) {
      results[storeName].push(record);
    }
  }

  return results;
};

export {
  getCategoryById, getAllCategories, getAllPostsByCategory, getPostsByCategoryForPage,
  getTagById, getAllTags, getAllPostsByTag,
  getPostByCompositeId,
  searchInStores
};
