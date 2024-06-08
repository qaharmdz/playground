import CONFIG from '../config';
import { dbGetAllData, dbGetAllDataByIndex, dbGetData } from './db';
import { sortData, paginateData } from './dataHelper';

const getAllCategories = async () => {
  let categories = await dbGetAllData('categories');
  return sortData(categories, 'priority', 'desc');
};

const getAllPostsByCategory = async (categoryId) => {
  let posts = await dbGetAllDataByIndex('posts', 'category', categoryId);
  return sortData(posts, 'priority', 'desc');
};

const getAllPostsByTag = async (tagId) => {
  let posts = await dbGetAllDataByIndex('posts', 'tags', tagId);
  return sortData(posts, 'priority', 'desc');
};

const getPostsByCategoryForPage = async (categoryId, page) => {
  let allPosts = await getAllPostsByCategory(categoryId);
  return paginateData(allPosts, page, CONFIG.settings.limitPerPage);
};

const getPostByCompositeId = async (compositeId) => {
  const post = await dbGetData('posts', compositeId);
  if (!post) return null;

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

export { getAllCategories, getAllPostsByCategory, getAllPostsByTag, getPostsByCategoryForPage, getPostByCompositeId };
