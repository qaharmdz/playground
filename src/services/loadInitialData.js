import { addData, clearStore, STORE_NAMES } from './indexedDB';
import { initialPosts, initialCategories, initialTags } from './initialData';

async function loadInitialData() {
  await clearStore(STORE_NAMES.posts);
  await clearStore(STORE_NAMES.categories);
  await clearStore(STORE_NAMES.tags);

  for (const post of initialPosts) {
    await addData(STORE_NAMES.posts, post);
  }

  for (const category of initialCategories) {
    await addData(STORE_NAMES.categories, category);
  }

  for (const tag of initialTags) {
    await addData(STORE_NAMES.tags, tag);
  }
}

export default loadInitialData;
