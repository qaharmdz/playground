import CONFIG from '../config';
import { dbGetData, dbSetData, clearStore } from './db';

const dataFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

const fetchAllPosts = async (categories) => {
  const posts = [];

  for (const category of categories) {
    const postsUrl = `${CONFIG.dataApi.baseUrl}${CONFIG.dataApi.posts}cat_${category.codename}_posts.json`;

    try {
      const categoryPosts = await dataFetch(postsUrl);

      // Add compositeId to each post
      categoryPosts.forEach(post => {
        post.compositeId = `${category.codename}-${post.id}`;
      });

      posts.push(...categoryPosts);
    } catch (error) {
      console.error(`Error fetching posts for category ${category.codename}:`, error);
      // Keep continue to the next category if there's an error
    }
  }

  return posts;
};

const updateIndexedDB = async () => {
  let status = '';

  try {
    const metaUrl = `${CONFIG.dataApi.baseUrl}${CONFIG.dataApi.meta}`;
    const meta = await dataFetch(metaUrl);
    const localMeta = await dbGetData('meta', 'appMeta');

    status = 'no-update';

    if (!localMeta || localMeta.dataVersion !== meta.dataVersion) {
      const categoriesUrl = `${CONFIG.dataApi.baseUrl}${CONFIG.dataApi.categories}`;
      const categories = await dataFetch(categoriesUrl);

      const posts = await fetchAllPosts(categories);

      const tagsUrl = `${CONFIG.dataApi.baseUrl}${CONFIG.dataApi.tags}`;
      const tags = await dataFetch(tagsUrl);

      // Clear old data
      await clearStore('posts');
      await clearStore('categories');
      await clearStore('tags');

      // Store new data
      await dbSetData('posts', posts);
      await dbSetData('categories', categories);
      await dbSetData('tags', tags);

      // Update local meta
      await dbSetData('meta', [{ name: 'appMeta', dataVersion: meta.dataVersion }]);

      status = 'data-updated';
    }
  } catch (error) {
    status = 'error';
    console.error('Error updating IndexedDB:', error);
  }

  return status;
};

export default updateIndexedDB;
