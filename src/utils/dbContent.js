import CONFIG from '../config';
import { dbGetAllData, dbGetAllDataByIndex, dbGetData } from './db';
import { sortData, filterStatus, paginateData } from './dataHelper';

const getAllCategories = async () => {
  let categories = await dbGetAllData('categories');
  categories = filterStatus(categories, 1);
  return sortData(categories, 'priority', 'desc');
};

const getAllPostsByCategory = async (categoryId) => {
  let posts = await dbGetAllDataByIndex('posts', 'category', categoryId);
  posts = filterStatus(posts, 1);
  return sortData(posts, 'priority', 'desc');
};

const getPostsByCategoryForPage = async (categoryId, page) => {
  let allPosts = await getAllPostsByCategory(categoryId);
  return paginateData(allPosts, page, CONFIG.settings.limitPerPage);
};

const getAllTags = async () => {
  let tags = await dbGetAllData('tags');
  tags = filterStatus(tags, 1);
  return sortData(tags, 'priority', 'desc');
};

const getAllPostsByTag = async (tagId) => {
  let posts = await dbGetAllDataByIndex('posts', 'tags', tagId);
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
  // return { post, categories, tags };
};

export {
  getAllCategories, getAllPostsByCategory, getPostsByCategoryForPage,
  getAllTags, getAllPostsByTag,
  getPostByCompositeId
};
