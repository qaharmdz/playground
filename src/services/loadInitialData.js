import { addData, getAllData, STORE_NAMES } from './indexedDB';
import { initialPosts, initialCategories, initialTags } from './initialData';

async function loadInitialData() {
  const existingPosts = await getAllData(STORE_NAMES.posts);
  const existingCategories = await getAllData(STORE_NAMES.categories);
  const existingTags = await getAllData(STORE_NAMES.tags);

  if (existingPosts.length === 0) {
    for (const post of initialPosts) {
      await addData(STORE_NAMES.posts, post);
    }
  }

  if (existingCategories.length === 0) {
    for (const category of initialCategories) {
      await addData(STORE_NAMES.categories, category);
    }
  }

  if (existingTags.length === 0) {
    for (const tag of initialTags) {
      await addData(STORE_NAMES.tags, tag);
    }
  }
}

export default loadInitialData;
